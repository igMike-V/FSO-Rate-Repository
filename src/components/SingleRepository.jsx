import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";
import Review from "./Review";

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
  separator: {
    height: 10,
    backgroundColor: theme.colors.bgLight,
  },
});

const RepositoryInfo = ({ repository }) => {
  const openLink = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItem item={repository} />
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={openLink}>
          <Text style={styles.buttonText}>Open on GitHub</Text>
        </Pressable>
      </View>
      <ItemSeparator />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    repositoryId: id,
    first: 2,
  });

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  const reviews = repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Review review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
