import { Text, Card, Title,Paragraph, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SubjectsScreen({ navigation, route }) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [myToken, setMyToken] = useState('');
    const data = route.params.data;
    const subjects1 = route.params.subjects;


    const getData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem('token');
            setMyToken(token);
            const response = await axios.get('https://c800-197-221-244-246.ngrok-free.app/api/classes', {
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
        return <Paragraph>Loading...</Paragraph>;
    }

    if (error) {
        return <Paragraph>Error: {error.message}</Paragraph>;
    }

    return (
        <>
        {subjects1 !== null ?

                    <ScrollView style={styles.container}>
                        {subjects1.courses.map((subject, index) => (
                            <Card key={index} style={styles.card}>
                                <Card.Content>
                                    <Title>{subject.course.grade.name} {subject.course.name} {subject.course.subject.name}</Title>
                                    <Button icon="chevron-right"
                                            mode="outlined"
                                            onPress={() => navigation.push('activities', {activities:subject.course.activities, data:[subjects1], token:myToken })} >
                                        Open
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))}
                        <StatusBar style="auto" />
                    </ScrollView>

                :

                    <ScrollView style={styles.container}>
                        {classes?.[0]?.courses.map((subject, index) => (
                            <Card key={index} style={styles.card}>
                                <Card.Content>
                                    <Title>{subject.course.grade.name} {subject.course.name} {subject.course.subject.name}</Title>
                                    <Button icon="chevron-right"
                                            mode="outlined"
                                            onPress={() => navigation.push('activities', {activities:subject.course.activities, data:classes, token:myToken })} >
                                        Open
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))}
                        <StatusBar style="auto" />
                    </ScrollView>
                }
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
    },
    card: {
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
});