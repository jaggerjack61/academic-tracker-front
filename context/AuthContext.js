import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState('');
    const [role ,setRole] = useState('');

    const login = async (credentials) => {
        console.log(credentials,"her");
        if (await axios.post('https://c800-197-221-244-246.ngrok-free.app/api/login', {credentials})
            .then((res) => {
                console.log(res.data.message, res.data.token);
                const token = res.data.token;
                setUserToken(token);
                setRole(res.data.message);
                if(getUser(token, res.data.message)) {
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

    const getUser = async (token, role2) => {
        // const token = await SecureStore.getItemAsync('userToken');
        // setUserToken(token);
        // print(token,"here5");
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
           console.log(e);
        }
        try {
            await AsyncStorage.setItem('role', role2);
        } catch (e) {
            console.log(e);
        }
        console.log(userToken+' here6')
        axios.get('https://c800-197-221-244-246.ngrok-free.app/api/user', {headers: {Authorization: 'Bearer '+token}})
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
        <AuthContext.Provider value={{ userToken, login, logout, role}}>
            {children}
        </AuthContext.Provider>
    );
};
