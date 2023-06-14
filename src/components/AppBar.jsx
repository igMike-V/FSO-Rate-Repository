import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";
import AppBarUserTab from "./AppBarUserTab";
import AppBarSignUpTab from "./AppBarSignUpTab";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgDark,
    padding: Constants.statusBarHeight,
    paddingTop: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const AppBar = () => {
  const { loading, error, data } = useQuery(ME);
  if (loading) console.log("loading");
  if (error) console.error(error);
  const me = data ? data.me : null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab label="Repositories" link="/" />
        <AppBarTab label="Create a review" link="/review" />
        {me && <AppBarTab label="My Reviews" link="/my-reviews" />}
        <AppBarUserTab />
        <AppBarSignUpTab />
      </ScrollView>
    </View>
  );
};

export default AppBar;
