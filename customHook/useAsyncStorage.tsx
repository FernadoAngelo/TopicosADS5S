import { useState } from "react"
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsyncStorage =  (key, initialvalue) =>{
    const [localStorageState, setlocalStorageState] = useState(initialvalue)
    console.log("sda");
    
    const getItem = async () => {
        const items = await AsyncStorage.getItem(key)
        if (items != null) {
            const parsedItem = JSON.parse(items) || []
            setlocalStorageState(parsedItem)
          }
    }

    React.useEffect(() => {
        getItem()
      },[key, initialvalue])

    const setItem = async (key,arrTodo) => {
        await AsyncStorage.setItem(key,JSON.stringify(arrTodo))
        setlocalStorageState(arrTodo)
    }


    return [localStorageState, setItem];
}
export default useAsyncStorage