import useSignOut from "../hooks/useSignOut";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import Text from "./Text";

const SignOut = () => {
  const [signOut] = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    const doSignOut = async () => {
      try {
        await signOut();
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
    doSignOut();
  }, [navigate, signOut]);
  //if signed out navigate to '/'
  return <Text>Signing Out...</Text>;
};

export default SignOut;
