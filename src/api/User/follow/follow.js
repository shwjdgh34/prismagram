import { prisma } from '../../../../generated/prisma-client';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { targetUserId } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            followings: {
              connect: {
                id: targetUserId
              }
            }
          }
        });

        // 아래처럼 followers에 대한 정보를 update하지 않아도 자동으로 된다.. connect의 힘인가? connect를 제대로 이해하지 못하고 있는 것 같다.
        /*
        await prisma.updateUser({
          where: { id: targetUserId },
          data: {
            followers: {
              connect: {
                id: user.id
              }
            }
          }
        });
*/
        return true;
      } catch {
        return false;
      }
    }
  }
};
