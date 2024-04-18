import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsyncStorage =  (key, initialValue) =>{
    const [localStorageState, setlocalStorageState] = React.useState()
    //console.log("Teste 1")
    
    const getItem = async (key) => {
        //console.log("Teste 2")
        try {
            const items = await AsyncStorage.getItem(key)
            //console.log(items)
            if (items != null) {
                const parsedItem = JSON.parse(items) || []
                setlocalStorageState(parsedItem)
            }
        } catch(error){
            console.log('Erro:', error)
        }
    }

    React.useEffect(() => {
        getItem(key)
      },[key])

    const setItem = async (value) => {
        try{
            await AsyncStorage.setItem(key,JSON.stringify(value))
            setlocalStorageState(value)
        } catch(error){
            console.log('Erro:', error)
        }
    }

    return [localStorageState || initialValue, setItem];
}
export default useAsyncStorage