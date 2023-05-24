import { LOGIN } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
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
      const token = data.data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
      return token;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return [signIn, result];
};
export default useSignIn;
