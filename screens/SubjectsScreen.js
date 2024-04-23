import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SubjectsScreen({ navigation, route }) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://90a5-197-221-244-246.ngrok-free.app/api/classes', {
                headers: { Authorization: 'Bearer ' + token }
            });
            setClasses(response.data.data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {classes[0].courses.map((subject, index) => (
                <TouchableHighlight
                    key={index}
                    style={{ height: 50, backgroundColor: 'dodgerblue', margin: 5, borderRadius: 10 }}
                    onPress={() => navigation.push('activities', {activities:subject.course.activities, data:classes })}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{fontWeight:'bold', marginVertical: 10, width: '100%', marginStart: 5, color: 'white' }}>
                            {subject.course.grade.name}    {subject.course.name}     {subject.course.subject.name}
                        </Text>
                        {/*<Text style={{ marginVertical: 10, width: '20%' }}>View</Text>*/}
                    </View>
                </TouchableHighlight>
            ))}
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
    },
});