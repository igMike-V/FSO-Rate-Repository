import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { orderBy, orderDirection, searchKeyword, first } = variables || {};
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderBy || "CREATED_AT",
      orderDirection: orderDirection || "DESC",
      searchKeyword: searchKeyword || "",
      first,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetcheMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetcheMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
