import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: async parent => {
      return `${parent.lastName} ${parent.firstName}`;
    },
    isFollowing: async (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [{ id: user.id }, { following_some: { id: parentId } }]
      });
    },
    isSelf: async (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
