import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState('');

    const login = async (credentials) => {
        console.log(credentials,"her");
        if (await axios.post('https://90a5-197-221-244-246.ngrok-free.app/api/login', {credentials})
            .then((res) => {
                console.log(res.data.message, res.data.token);
                const token = res.data.token;
                setUserToken(token);
                if(getUser(token)) {
                    return true;
                }
                else{
                    return false;
                }

            })
            .catch((e) => {
                console.log(e);
            })){
            return true;
        }
        else
        {
            return false;
        }

    };

    const getUser = async (token) => {
        // const token = await SecureStore.getItemAsync('userToken');
        // setUserToken(token);
        // print(token,"here5");
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
           console.log(e);
        }
        console.log(userToken+' here6')
        axios.get('https://90a5-197-221-244-246.ngrok-free.app/api/user', {headers: {Authorization: 'Bearer '+token}})
            .then((res) => {
                console.log(res.data);
                return true;})
            .catch((e)=>{
                console.log(e);
                return false;
            })
    }
    const logout = async () => {
        setUserToken(null);
        await SecureStore.deleteItemAsync('userToken');
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
