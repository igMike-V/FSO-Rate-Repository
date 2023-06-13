import Text from "./Text";
import { Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.appBarText,
    paddingRight: 20,
  },
});

const AppBarUserTab = () => {
  const { loading, error, data } = useQuery(ME);
  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error(error);
    return <Text>user error</Text>;
  }
  const me = data.me;

  return (
    <Pressable>
      {me ? (
        <Link to="/signout">
          <Text style={styles.text}>Sign Out</Text>
        </Link>
      ) : (
        <Link to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      )}
    </Pressable>
  );
};

export default AppBarUserTab;
