import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { repositoryId, first } = variables || {};
  const { loading, error, data, fetchMore, ...result } = useQuery(
    GET_REPOSITORY,
    {
      variables: { repositoryId, first },
      fetchPolicy: "cache-and-network",
    }
  );

  if (error) return { error };

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
