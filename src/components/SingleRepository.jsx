import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";
import { convertDate } from "../utils/dateHelpers";

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
  ratingValueContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  ratingContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  ratingInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 1,
  },
  reviewUser: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 2,
  },
  reviewDate: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    paddingBottom: 5,
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

const ReviewItem = ({ review }) => {
  console.log("theReview:", review);
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingValueContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.ratingInfo}>
        <Text style={styles.reviewUser}>{review.user.username}</Text>
        <Text style={styles.reviewDate}>{convertDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  const reviews = repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
