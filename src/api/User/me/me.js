import { prisma } from '../../../../generated/prisma-client';
import { USERPROFILE_FRAGMENT } from '../../../fragment';
export default {
  Query: {
    me: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).$fragment(USERPROFILE_FRAGMENT);
    }
  }
};
