import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Edges(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query Reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includesReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includesReviews) {
        edges {
          node {
            id
            repositoryId
            text
            repository {
              id
              name
              ownerName
            }
            rating
            createdAt
          }
        }
      }
    }
  }
`;
