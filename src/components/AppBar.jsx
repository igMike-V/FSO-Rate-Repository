import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";
import AppBarUserTab from "./AppBarUserTab";
import AppBarSignUpTab from "./AppBarSignUpTab";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab label="Repositories" link="/" />
        <AppBarTab label="Create a review" link="/review" />
        <AppBarUserTab />
        <AppBarSignUpTab />
      </ScrollView>
    </View>
  );
};

export default AppBar;
