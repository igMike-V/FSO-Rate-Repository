import { View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 30,
    borderRadius: theme.borders.buttonRadius,
    marginTop: 20,
  },
});

const RepositorySingle = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  console.log("Repository", repository);

  const openLink = () => {
    Linking.openURL(repository.url);
  };

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <RepositoryItem item={repository} />
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={openLink}>
          <Text style={styles.buttonText}>Open on GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RepositorySingle;
