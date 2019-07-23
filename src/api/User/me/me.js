import { prisma } from '../../../../generated/prisma-client';

/*
import gql from 'graphql-tag';

const USER_FRAGMENT = gql`
  fragment UserWithPosts on User {
    id
    userName
    email
    lastName
    firstName
    bio
    posts {
      id
      caption
    }
  }
`;
//여기에 얘를 추가해도 schema.js에서 통합할때 문제 안생기나?
*/
export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = prisma.user({ id: user.id });
      const posts = prisma.user({ id: user.id }).posts();
      return {
        user: userProfile,
        posts
      };
    }
  },
  User: {
    fullName: parent => {
      console.log(parent);
      return `${parent.lastName} ${parent.firstName}`;
    }
  }
};
