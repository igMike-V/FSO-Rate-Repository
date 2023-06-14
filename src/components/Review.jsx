import React from "react";
import { View, StyleSheet, Text } from "react-native";
import theme from "../theme";
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

const Review = ({ review }) => {
  let reviewHeading = "";
  if ("repository" in review) {
    reviewHeading = review.repository.fullName;
  } else {
    reviewHeading = review.user.username;
  }

  console.log("theReview:", review);
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingValueContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.ratingInfo}>
        <Text style={styles.reviewUser}>{reviewHeading}</Text>
        <Text style={styles.reviewDate}>{convertDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default Review;
