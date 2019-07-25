import { prisma } from '../../../../generated/prisma-client';
export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const newPost = await prisma.post({ id });
      return newPost;
    }
  }
};
