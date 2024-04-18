import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'
import Modal from '../components/Modal'
import FlatListTask from '../components/FlatListTask'
import TodoItemType from '../types/TodoItem'
import TodoItem from '../components/TodoItem'
import useAsyncStorage from '../customHook/useAsyncStorage'

const storageTodoListKey = '@todo-list-key'

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList'
>

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const arrEmpty = []
  const [modalVisible, setModalVisible] = React.useState(false)
  const [todoItemList, setTodoItemList] = useAsyncStorage(storageTodoListKey, arrEmpty)
  const [todoItemDesc, settodoItemDesc] = React.useState('')
  const [todoItemTitle, settodoItemTitle] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ padding: 15 }}
        >
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const handleAddItem = async () => {
    if (!todoItemDesc || !todoItemTitle) {
      alert('Um ou mais Campos vazios!')
      return
    }

    if (!todoItemList.length) {
      const arrTodo = [
        {
          id: 1,
          title: todoItemTitle,
          description: todoItemDesc,
        },
      ]
      //await AsyncStorage.setItem(storageTodoListKey, JSON.stringify(arrTodo))

      setTodoItemList(arrTodo)
      settodoItemDesc('')
      settodoItemTitle('')
      return
    }

    const todoItemListCopy = [...todoItemList]

    const lastItemIdPlusOne = todoItemList[todoItemList.length - 1].id + 1

    const newItem: TodoItemType = {
      id: lastItemIdPlusOne,
      title: todoItemTitle,
      description: todoItemDesc,
    }

    todoItemListCopy.push(newItem)

    /*await AsyncStorage.setItem(
      storageTodoListKey,
      JSON.stringify(todoItemListCopy)
    )*/

    setTodoItemList(todoItemListCopy)
    settodoItemDesc('')
      settodoItemTitle('')
  }

  const handleDeleteItem = (item: TodoItemType) => {
    const index = todoItemList.findIndex((todo) => todo.id === item.id)

    const todoItemListCopy = todoItemList.toSpliced(index, 1)

    setTodoItemList(todoItemListCopy)
    //AsyncStorage.setItem(storageTodoListKey, JSON.stringify(todoItemListCopy))
  }



  return (
    <View style={styles.container}>
      {/* Modal do nosso projeto */}
      <Modal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(!modalVisible)}
        title="Descreva a tarefa"
      >


        {/* Input para guardar o title */}
        <TextInput
          style={[styles.input, { minHeight: 10 }]}
          placeholder="Título"
          value={todoItemTitle}
          onChangeText={(textTitle) => settodoItemTitle(textTitle)}
          multiline={false}
          numberOfLines={1}
        />

        {/* Input para guardar a descrição */}
        <TextInput
          style={[styles.input, { minHeight: 80 }]}
          placeholder="Descrição"
          value={todoItemDesc}
          onChangeText={(textDesc) => settodoItemDesc(textDesc)}
          multiline={true}
          numberOfLines={4}
        />



        {/* Botões da modal */}
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleAddItem}
          >
            <Text style={styles.textStyle}>Adicionar</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Lista de tarefas salvas */}
      <FlatListTask
        data={todoItemList}
        renderItem={({ item }) => (
          <TodoItem todoItem={item} onDelete={handleDeleteItem} />
        )}
        keyExtractor={(item, i) => (item.id ?? i).toString()}
      >
      </FlatListTask>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    minWidth: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginLeft: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default TodoListScreen