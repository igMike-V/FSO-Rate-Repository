import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgDark,
    padding: Constants.statusBarHeight,
    paddingTop: "20%",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab
        label="Repositories"
      />
    </View>
  )
}

export default AppBar;