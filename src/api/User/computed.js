import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => {
      return `${parent.lastName} ${parent.firstName}`;
    },
    isFollowing: (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [{ id: user.id }, { following_some: { id: parentId } }]
      });
    },
    isSelf: (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    posts: parent => prisma.user({ id: parent.id }).post()
  }
};
