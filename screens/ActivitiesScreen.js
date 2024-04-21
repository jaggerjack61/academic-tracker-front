import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivitiesScreen({ navigation, route }) {
    // const [classes, setClasses] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    let activities = route.params.activities;

    // const getData = async () => {
    //     setIsLoading(true);
    //     setError(null);
    //
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await axios.get('https://4eda-197-221-253-23.ngrok-free.app/api/classes', {
    //             headers: { Authorization: 'Bearer ' + token }
    //         });
    //         setClasses(response.data);
    //     } catch (e) {
    //         setError(e);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     getData();
    // }, []);
    //
    // if (isLoading) {
    //     return <Text>Loading...</Text>;
    // }
    //
    // if (error) {
    //     return <Text>Error: {error.message}</Text>;
    // }

    return (
        <View style={styles.container}>
            {activities.map((data, index) => (
                <TouchableHighlight
                    key={index}
                    style={{ height: 50, backgroundColor: 'dodgerblue', margin: 5, borderRadius: 10 }}
                    onPress={() => navigation.push('activities')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginVertical: 10, width: '80%', marginStart: 5, color: 'white' }}>
                            {data.name}
                        </Text>
                        <Text style={{ marginVertical: 10, width: '20%' }}>View</Text>
                    </View>
                </TouchableHighlight>
            ))}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
    },
});