import './env';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../generated/prisma-client';
import logger from 'morgan';
import gql from 'graphql-tag';
import schema from './schema';
import { sendSecretMail } from './util';
import passport from 'passport';
import './passport'; // passport에서 무슨일이 일어나는지도 모르고 그냥 import 해주면 된다. 따라서 따로 무언가 받아서 사용할 필요가 없다.
import { authenticateJwt } from './passport';
import { isAutheticated } from './middlewares';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAutheticated })
}); //context는 resolver 사이에서 정보를 공유할 때 사용한다, prisma를 resolver에서 import하지 않고 server.js에서 import 했다.
server.express.use(logger('dev'));
server.express.use(authenticateJwt); // 서버에 전달되는 모든 요청은 이 authenticateJwt함수를 통과한다.
server.start({ port: PORT }, () =>
  console.log('Server is running on localhost:4000')
);
