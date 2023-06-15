import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
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
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
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
              fullName
            }
            rating
            createdAt
          }
        }
      }
    }
  }
`;
