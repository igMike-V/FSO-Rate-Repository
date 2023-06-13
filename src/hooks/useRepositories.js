import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy || "CREATED_AT",
      orderDirection: orderDirection || "DESC",
    },
  });

  if (loading) return { loading };

  return {
    repositories: data ? data.repositories : [],
    loading,
  };
};

export default useRepositories;
