import { prisma } from '../../../../generated/prisma-client';
import { FULLPOST_FRAGMENT } from '../../../fragment';
export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const newPost = await prisma.post({ id }).$fragment(FULLPOST_FRAGMENT);
      return newPost;
    }
  }
};
