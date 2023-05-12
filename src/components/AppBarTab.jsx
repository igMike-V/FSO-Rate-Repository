import Text from './Text'
import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    fontSize: "24px",
    color: theme.colors.appBarText,
  }  
})

const AppBarTab = ({label}) => {
  return (
    <Pressable>
      <Text style={styles.text}>
        {label}
      </Text>
    </Pressable>
  )
}

export default AppBarTab