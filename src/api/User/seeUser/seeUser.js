import { prisma } from '../../../../generated/prisma-client';
import { USERPROFILE_FRAGMENT } from '../../../fragment';

export default {
  Query: {
    seeUser: (_, args) => {
      const { id } = args;
      return prisma.user({ id }).$fragment(USERPROFILE_FRAGMENT);
    }
  }
};
