import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPosts: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { caption_contains: args.term },
            { location_contains: args.term }
          ]
        }
      })
  }
};
