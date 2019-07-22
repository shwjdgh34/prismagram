import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragment';
export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comment()
        .$fragment(COMMENT_FRAGMENT);
      const likesCount = await prisma
        .likesConnection({ where: { post: { id } } })
        //.likesConnection({ where: { post: id } })  => error Variable '$where' expected value of type 'LikeWhereInput' but got: {"post":"cjy8sgqgi8po40b53i6i26ho6"}. Reason: 'post' Expected 'PostWhereInput', found not an object. (line 1, column 8): query ($where: LikeWhereInput)
        .aggregate()
        .count();
      return { post, comments, likesCount };
    }
  }
};
