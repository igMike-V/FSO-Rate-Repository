import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useNewReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.error(error);
    },
  });

  const newReview = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const data = await mutate({
        variables: {
          review: { repositoryName, ownerName, rating, text },
        },
      });
      //const repositoryId = data.data.createReview.repositoryId;
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return [newReview, result];
};

export default useNewReview;
