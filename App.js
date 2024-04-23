import LoginScreen from "./screens/LoginScreen";
import StudentsScreen from "./screens/StudentsScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SubjectsScreen from "./screens/SubjectsScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext, useState} from "react";
import ViewActivityScreen from "./screens/ViewActivityScreen";

const Stack = createNativeStackNavigator();



export default function App() {


    return (
        <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{title:"Login",headerShown:false}}
                />
                <Stack.Screen
                    name="students"
                    component={StudentsScreen}
                    options={{title:"Students",headerBackVisible:false}}
                />
                <Stack.Screen
                    name="subjects"
                    component={SubjectsScreen}
                    options={{title:"Subjects",headerBackVisible:false}}
                />
                <Stack.Screen
                    name="activities"
                    component={ActivitiesScreen}
                    options={{title:"Activities",headerBackVisible:false,  headerShown: false}}
                />
                <Stack.Screen
                    name="activity"
                    component={ViewActivityScreen}
                    options={{title:"Activity",headerBackVisible:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    );
}


