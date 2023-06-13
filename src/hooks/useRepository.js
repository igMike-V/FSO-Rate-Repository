import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
  });
  console.log("data", data);
  if (loading) return { loading };
  if (error) return { error };

  return {
    repository: data ? data.repository : [],
    loading,
  };
};

export default useRepository;
