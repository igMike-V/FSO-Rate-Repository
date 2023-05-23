import { LOGIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error);
    },
  });

  const signIn = async ({ username, password }) => {
    try {
      const data = await mutate({
        variables: { username, password },
      });
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return [signIn, result];
};
export default useSignIn;
