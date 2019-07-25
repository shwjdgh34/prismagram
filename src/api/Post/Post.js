import { prisma } from '../../../generated/prisma-client';
export default {
  Post: {
    isLiked: (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: postId } = parent;
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id: postId } }]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        //.likesConnection({ where: { post: id } })  => error Variable '$where' expected value of type 'LikeWhereInput' but got: {"post":"cjy8sgqgi8po40b53i6i26ho6"}. Reason: 'post' Expected 'PostWhereInput', found not an object. (line 1, column 8): query ($where: LikeWhereInput)
        .aggregate()
        .count(),
    files: parent => prisma.post({ id: parent.id }).files(),
    comments: parent => prisma.post({ id: parent.id }).comments(),
    user: parent => prisma.post({ id: parent.id }).user()
  }
};
