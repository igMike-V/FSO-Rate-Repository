import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 30,
    borderRadius: theme.borders.buttonRadius,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },
  input: {
    borderColor: theme.borders.color,
    borderRadius: theme.borders.buttonRadius,
    borderWidth: theme.borders.weight,
    padding: 30,
    marginBottom: 20,
    fontSize: theme.fontSizes.heading,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const [userField, userMeta, userHelpers] = useField('username');
  const [passField, passMeta, passHelpers] = useField('password');

  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="username" />
      <FormikTextInput style={styles.input} name="password" placeholder="password" secureTextEntry={true} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )

}

const SignIn = () => {
  const onSubmit = values => {
   console.log(values);
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;