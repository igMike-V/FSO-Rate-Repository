import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Edges {
    repositories {
      edges {
        cursor
        node {
          fullName
          description
          forksCount
          id
          language
          watchersCount
          reviewCount
          ratingAverage
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

// other queries...
