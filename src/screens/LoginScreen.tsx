import * as React from 'react';

import { View, TextInput, Pressable, StyleSheet , Text} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'

type loginProps = NativeStackScreenProps<ToDoStackParamList>

const LoginScreen = ({ navigation, route }: loginProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUserToken } = route.params;

  React.useEffect(() => {
  }, [])

  const handleLogin = () => {
    const tokenCred = username + password
    setUserToken(tokenCred)
    navigation.navigate('TodoList')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={handleLogin}
        
      >
        <Text >{'Entrar'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen