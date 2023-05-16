import Text from './Text'
import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  text: {
    fontSize: "24px",
    color: theme.colors.appBarText,
    paddingRight: 20,
  }  
})

const AppBarTab = ({ label, link }) => {
  return (
    <Pressable>
      <Link to={link} >
        <Text style={styles.text}>
         {label}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab