import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import SquirtleScreen from '../screens/SquirtleScreen'
import PokemonScreen from '../screens/PokemonScreen'
import TodoListScreen from '../screens/TodoListScreen'
import { userLoginTodoListKey } from '../utils/constants'
import LoginScreen from '../screens/LoginScreen'
import { useAsyncStorage } from '../hooks/useAsyncStorage';

// Tipagem para as rotas do Squirtle e Pokemon, com parmâmetros

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Getting token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export type PokemonStackParamList = {
  Squirtle: undefined
  Pokemon: {
    pokemon?: string
  }
}

const PokemonStack = createNativeStackNavigator<PokemonStackParamList>()

const pokemonScreenOptionStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#007bff',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
}

// Main stack, rotas do Squirtle e Pokemon

const MainStackNavigator = () => {
  return (
    <PokemonStack.Navigator screenOptions={pokemonScreenOptionStyle}>
      <PokemonStack.Screen
        name="Squirtle"
        component={SquirtleScreen}
        options={{ title: 'Squirtle' }}
      />
      <PokemonStack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={({ route }) => ({ title: route.params.pokemon })}
      />
    </PokemonStack.Navigator>
  )
}

export type ToDoStackParamList = {
  TodoList: undefined;
  Login: { setUserToken: (v: string) => void; };
  
};

const TodoStack = createNativeStackNavigator<ToDoStackParamList>()

const todoScreenOptionStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'dimgrey',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
}

const ToDoListStackNavigator = () => {
  const [userToken, setUserToken] = useAsyncStorage(userLoginTodoListKey, ''); //chave e valor inicial do asyncstorage


  return (
    <TodoStack.Navigator screenOptions={todoScreenOptionStyle}>
      {userToken == '' ? (
        <TodoStack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setUserToken }}
        />
      ) : (
        <TodoStack.Screen
          name="TodoList"
          options={{ title: 'Todo List' }}
          component={TodoListScreen}
        />
      )}
    </TodoStack.Navigator>
  )
}

export { MainStackNavigator, ToDoListStackNavigator }
