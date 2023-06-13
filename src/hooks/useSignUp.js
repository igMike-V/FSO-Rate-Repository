import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.error(error);
    },
  });

  const newUser = async ({ username, password }) => {
    try {
      const data = await mutate({
        variables: {
          user: { username, password },
        },
      });
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return [newUser, result];
};

export default useSignUp;
