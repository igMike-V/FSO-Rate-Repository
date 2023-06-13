import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

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

const intialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={intialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const response = await signUp({ username, password });
      if (response) {
        const signInResponse = await signIn({ username, password });
        if (signInResponse) {
          navigate("/");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
