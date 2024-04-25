// import { StatusBar } from 'expo-status-bar';
// import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
//
// export default function StudentsScreen({navigation, route}) {
//      // let lang = route.params.language;
//     return (
//         <View style={styles.container}>
//             <TouchableHighlight style={{height:50, backgroundColor:'dodgerblue', margin:5,borderRadius:10}} onPress={()=>navigation.push('subjects')}>
//                 <View style={{flexDirection: 'row'}}>
//                 <Text style={{marginVertical:10, width:'80%',marginStart:5,color:'white'}}>Chipo Moyo</Text>
//                 <Text style={{marginVertical:10, width:'20%'}}>View</Text>
//                 </View>
//             </TouchableHighlight>
//             <TouchableHighlight style={{height:50, backgroundColor:'dodgerblue',margin:5,borderRadius:10}} onPress={()=>console.log("clicked 2")}>
//                 <View style={{flexDirection: 'row'}}>
//                     <Text style={{marginVertical:10, width:'80%',marginStart:5,color:'white'}}>Farai Moyo</Text>
//                     <Text style={{marginVertical:10, width:'20%'}}>View</Text>
//                 </View>
//             </TouchableHighlight>
//
//             <StatusBar style="auto" />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         margin: 5,
//     },
// });
import { Text, Card, Title,Paragraph, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentsScreen({ navigation, route }) {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [myToken, setMyToken] = useState('');


    const getData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem('token');
            setMyToken(token);
            const response = await axios.get('https://c800-197-221-244-246.ngrok-free.app/api/students', {
                headers: { Authorization: 'Bearer ' + token }
            });
            setStudents(response.data.data);
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
        <ScrollView style={styles.container}>
            {students[0].relationships.map((rel, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <Title>{rel.student.first_name} {rel.student.last_name} </Title>
                        <Text style={{marginVertical:10, marginLeft:10}}>{rel.student.id_number}</Text>
                        <Button icon="chevron-right"
                                mode="outlined"
                                onPress={() => navigation.push('subjects', {subjects:rel.student, data:rel.student, token:myToken })} >
                            Open
                        </Button>
                    </Card.Content>
                </Card>
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
    card: {
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
});
