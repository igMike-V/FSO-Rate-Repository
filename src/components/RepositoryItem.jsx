import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const convertToK = (input) => {
  const number = parseFloat(input);
  if (number >= 1000) {
    return Math.floor(number / 1000) + "k";
  }
  return input;
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  container: {
    padding: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
  devInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "flex-start",
    flexShrink: 1,
    paddingLeft: 20,
  },
  statContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 5,
  },
  subHeading: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    paddingBottom: 5,
  },
  headingCenter: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  subHeadingCenter: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  language: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexShrink: 0,
    textAlign: "center",
    alignSelf: "flex-start",
    borderRadius: 4,
  },
  languageText: {
    color: theme.colors.lightText,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 30,
    borderRadius: theme.borders.buttonRadius,
    marginTop: 20,
  },
});
const RepositoryItem = (props) => {
  const navigate = useNavigate();
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    id,
  } = props.item;

  const openSingleRepo = () => {
    navigate(`/repository/${id}`);
  };

  return (
    <Pressable onPress={openSingleRepo}>
      <View testID="repositoryItem" style={styles.container}>
        <View style={styles.rowContainer}>
          <Image
            testID="repositoryAvatar"
            style={styles.avatar}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
          <View style={styles.devInfoContainer}>
            <Text testID="repositoryName" style={styles.heading}>
              {fullName}
            </Text>
            <Text testID="repositoryDescription" style={styles.subHeading}>
              {description}
            </Text>
            <View style={styles.language}>
              <Text testID="repositoryLanguage" style={styles.languageText}>
                {language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.stat}>
            <Text testID="repositoryStarCount" style={styles.headingCenter}>
              {convertToK(stargazersCount)}
            </Text>
            <Text style={styles.subHeadingCenter}>Stars</Text>
          </View>
          <View style={styles.stat}>
            <Text testID="repositoryForks" style={styles.headingCenter}>
              {convertToK(forksCount)}
            </Text>
            <Text style={styles.subHeadingCenter}>Forks</Text>
          </View>
          <View style={styles.stat}>
            <Text testID="repositoryReviews" style={styles.headingCenter}>
              {convertToK(reviewCount)}
            </Text>
            <Text style={styles.subHeadingCenter}>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text testID="repositoryRatingAverage" style={styles.headingCenter}>
              {convertToK(ratingAverage)}
            </Text>
            <Text style={styles.subHeadingCenter}>Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
