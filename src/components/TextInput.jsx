import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && styles.error,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;