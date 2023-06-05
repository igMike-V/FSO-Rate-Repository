import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return [signOut];
};

export default useSignOut;
