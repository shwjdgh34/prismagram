import { prisma } from '../../../../generated/prisma-client';
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { bio, firstName, lastName } = args;
      const { user } = request;

      // await를 사용할 필요가 없다. 왜냐면 return이 마지막 statement이기 때문에
      //서버가 자동으로 이 promise가 resolve 되서 브라우저에게 결과를 전달하길 기다려 주기 때문이다.
      return prisma.updateUser({
        where: { id: user.id },
        data: { bio, firstName, lastName }
      });

      /*   이런식으로 return을 했더니 update가 작동이 되지 않았다.
      prisma.updateUser({
        where: { id: user.id },
        data: { bio, firstName, lastName }
      });
      return user;
      */
      /* 원한다면 이런방식으로 해도되는데, 
     const user = await prisma.updateUser({
        where: { id: user.id },
        data: { bio, firstName, lastName }
      });
      return user;
     */
    }
  }
};
