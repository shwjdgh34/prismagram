import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    //createUser: async (_, args, {context}) => {
    createUser: async (_, args) => {
      // 여기서 prisma를 import 하지 않고 3번째 인자로 prisma를 가져와도 된다. 하지만 vscode가 자동완성 기능을 수행하지 못하기 때문에 import 하는 것이다.
      const {
        userName,
        email,
        avatar = '',
        firstName = '',
        lastName = '',
        bio = ''
      } = args;
      //console.log(await prisma.user({ email: 'nonono@gmail.com' })); // await를 안쓰면 안된다 왜그러지?? async await에 대해서 제대로 공부해보기

      const user = await prisma.createUser({
        userName,
        email,
        avatar,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};
