import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import useMe from "../hooks/useMe";
import Text from "./Text";
import Review from "./Review";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.bgLight,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    flexShrink: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  buttonLeft: {
    backgroundColor: theme.colors.primary,
    padding: 30,
    borderRadius: theme.borders.buttonRadius,
    marginTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  buttonRight: {
    backgroundColor: theme.colors.error,
    padding: 30,
    borderRadius: theme.borders.buttonRadius,
    marginTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewContainer = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const deleteAlert = async () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Delete pressed");
            try {
              const deleteSuccess = deleteReview(review.id);
              if (deleteSuccess) {
                refetch();
                //navigate("/my-reviews");
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  const handleLinkPress = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  return (
    <View style={styles.container}>
      <Review review={review} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonLeft} onPress={handleLinkPress}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.buttonRight} onPress={deleteAlert}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const me = useMe(true);
  const user = me.me;
  const refetch = me.refetch;
  console.log(me);
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
        renderItem={({ item }) => (
          <ReviewContainer review={item} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyReviews;
