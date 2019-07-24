import gql from 'graphql-tag';

export const USER_FRAGMENT = `
    id
    userName
`;
export const COMMENT_FRAGMENT = `
    id
    text
    user {
      ${USER_FRAGMENT}
    }
`;

export const FILES_FRAGMENT = `
    id
    url
`;

export const FULLPOST_FRAGMENT = gql`
  fragment PostPart on Post {
    id
    location
    caption
    files {
      ${FILES_FRAGMENT}
    }
    user {
      ${USER_FRAGMENT}
    }
    comments {
      ${COMMENT_FRAGMENT}
    }
  }
`;

export const CHAT_FRAGMENT = gql`
  fragment ChatPart on Chat {
    id
    participants {
      id
    }
  }
`;
