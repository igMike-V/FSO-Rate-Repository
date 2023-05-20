import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return { loading };

  console.log("data:", data.repositories);

  return {
    repositories: data ? data.repositories : [],
    loading,
  };
};

export default useRepositories;
