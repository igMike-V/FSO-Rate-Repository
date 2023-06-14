import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = (getReviews) => {
  let includesReviews = false;
  if (getReviews) {
    includesReviews = getReviews;
  }
  const { loading, error, data, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includesReviews },
  });
  console.log("data", data);
  if (loading) return { loading };
  if (error) return { error };

  return {
    me: data ? data.me : [],
    loading,
    refetch,
  };
};

export default useMe;
