import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { targetUserId } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: targetUserId
          },
          data: {
            followers: {
              disconnect: {
                id: user.id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
