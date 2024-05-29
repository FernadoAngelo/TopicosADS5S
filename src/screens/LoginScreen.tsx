import * as React from 'react';

import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'

type loginProps = NativeStackScreenProps<ToDoStackParamList, 'Login'>

const LoginScreen = ({ navigation, route }: loginProps) => {
  const { setUserToken } = route.params; //passado como paramentro para baixo usando o  initialParams={{ setUserToken }}
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
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
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
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
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  input: {
    width: '50%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});

export default LoginScreen