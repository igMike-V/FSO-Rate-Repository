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

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      name
      createdAt
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      id
    }
  }
`;
