import './env';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOprions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// done은 사용자를 찾았을때 호출하는 함수다
const verifyUser = async (jwt_payload, done) => {
  try {
    const user = await prisma.user({ id: jwt_payload.id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// 이건 미들웨어 함수이다.
export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
// passport는 쿠키 세션작업을 하기에 좋다. 쿠키를 가져오고 만들어주고 모든일을 한다. 이함수에서는 passport에 어떤 것도 입력되지 않기를 원한다.그래서 session: false옵션을 추가한거다.

passport.use(new Strategy(jwtOprions, verifyUser));
passport.initialize();
