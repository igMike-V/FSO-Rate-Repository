import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useNewReview from "../hooks/useNewReview";

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

const initialValues = {
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  repoOwner: yup.string().required("Repository owner name is required"),
  repoName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number between 0 and 100")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
});

const NewReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="repoOwner" placeholder="Repository owner name" />
      <FormikTextInput name="repoName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline={true} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const NewReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const [newReview, result] = useNewReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;
    try {
      const data = await newReview({
        review: review,
        rating: Number(rating),
        repositoryName: repoName,
        ownerName: repoOwner,
      });
      navigate(`/repository/${data.data.createReview.repositoryId}`);
    } catch (e) {
      console.error(e);
      console.error("result", result);
    }
  };
  return <NewReviewContainer onSubmit={onSubmit} />;
};

export default NewReview;
