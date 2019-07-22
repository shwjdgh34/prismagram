import gql from 'graphql-tag';
export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on Comment {
    id
    text
    user {
      userName
    }
  }
`;
