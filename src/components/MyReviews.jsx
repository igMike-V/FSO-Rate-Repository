import { View, StyleSheet, FlatList } from "react-native";
import useMe from "../hooks/useMe";
import Text from "./Text";
import Review from "./Review";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.bgLight,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const user = useMe(true).me;
  if (!user)
    return (
      <View style={styles.container}>
        <Text>No Reviews yet!</Text>
      </View>
    );
  let reviews = [];
  if ("reviews" in user) {
    reviews = user.reviews.edges.map((edge) => edge.node);
  }

  console.log(reviews);
  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyReviews;
