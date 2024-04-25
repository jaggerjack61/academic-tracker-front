import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TouchableHighlight, View, Image, Linking, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function ViewActivityScreen({navigation, route}) {
    const activity = route.params.activity;
    const classes = route.params.data;
    const token = route.params.token;
    const [uri, setUri] = useState("");
    const host = "https://c800-197-221-244-246.ngrok-free.app/";
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [role, setRole] = useState('');// Add state for loading

    const getFilename = uri => uri.split('/').pop().split('#')[0].split('?')[0];

    function shortenName(name) {
        name = getFilename(name)
        if (name.length > 20) {
            return "..." + name.slice(-20);
        } else {
            return name;
        }
    }

    const handleOpenInBrowser = async (filepath) => {
        try {
            const supported = await Linking.canOpenURL(host + filepath);
            if (supported) {
                await Linking.openURL(host + filepath);
            } else {
                console.error(`Don't know how to open this URL: ${host + filepath}`);
            }
        } catch (error) {
            console.error('Error opening URL:', error);
        }
    };

    const handleUploadFile = async (log) => {
        setUploading(true); // Show loading indicator
        try {
            // console.log(token)
            const result = await DocumentPicker.getDocumentAsync({type: '*/*'});
            console.log(result,111)
            if (result.canceled === false) {


                const formData = new FormData();
                formData.append('file', {
                    name: result.assets[0].name,
                    type: result.assets[0].mimeType,
                    uri: result.assets[0].uri,
                });
                // console.log(formData);
                formData.append('student_id', classes[0].id);
                formData.append('log_id', log);
                const response = await axios.post(host + 'api/student-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token
                    },
                })
                    .then((res) => {
                        setUri(res.data.uri);
                        Alert.alert('Success', 'File uploaded successfully');
                        setUploading(false); // Hide loading indicator
                    });
                // console.log(response.data);
            } else {
                console.log('Document picker cancelled');
                setUploading(false); // Hide loading indicator
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false); // Hide loading indicator
        }
    };

    const getRole = async () => {
        setRole(await AsyncStorage.getItem('role'));
    }

    useEffect(async () => {
        getRole();


    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{uri: host + activity.type.image}} style={styles.cardImage} resizeMode="cover"/>
                {/*{console.log(host + activity.type.image)}*/}
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{activity.name}</Text>
                    <Text style={{fontSize: 14, color: '#888', marginBottom: 5}}>{activity.type.name}</Text>
                    <Text style={{fontWeight:'500', marginBottom: 5}}>Due date: {activity.due_date ?? 'None'}</Text>
                    <Text style={styles.cardDescription}>Description:{activity.note ?? 'None'}</Text>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                        {activity.type.type === 'value' ?
                            <><Text>Total:</Text>
                                {activity.logs.filter(log => log.activity_id === activity.id && log.student_id === classes[0].id).map(log =>
                                    <Text key={log.id}>{log.score}</Text>)}
                                <Text>{'/' + activity.total ?? 'None'}</Text></> : ''}

                        {activity.type.type === 'boolean' ?
                            <><Text>Status:</Text>
                                {activity.logs.filter(log => log.activity_id === activity.id && log.student_id === classes[0].id).map(log =>
                                    <Text key={log.id}>{log.score === 2 ? activity.type.true_value : ''}{log.score === 1 ? activity.type.false_value : ''}</Text>)}
                            </> : ''}


                    </View>
                    <>{activity.logs
                        .filter(log => log.activity_id === activity.id && log.student_id === classes[0].id)
                        .map(log => (
                            <View style={{flexDirection: 'row', marginBottom: 15}} key={log.id}>
                                <Text>My Work:</Text>
                                {uri ? (
                                    <Text onPress={() => handleOpenInBrowser(uri)} style={{color: 'lightblue'}}>
                                        {shortenName(uri)}
                                    </Text>
                                ) : (
                                    log.file ? (
                                            <Text onPress={() => handleOpenInBrowser(log.file)} style={{color: 'lightblue'}}>
                                                {shortenName(log.file)}
                                            </Text>
                                        ) :
                                        null // Placeholder if neither uri nor log.file exists

                                )}
                            </View>
                        ))}
                    </>


                    {activity.file !== null ? <Button onPress={() => handleOpenInBrowser(activity.file)}
                                                      icon="download"
                                                      style={{margin: 10}}
                                                      mode="outlined">Download File</Button> : null}
                    {role ==='student' ? <>{activity.logs.filter(log => log.activity_id === activity.id && log.student_id === classes[0].id).map(log =>
                        <Button key={log.id} onPress={() => handleUploadFile(log.id)} icon="upload" style={{margin: 10}}
                                mode="outlined">Upload a File</Button>)}</> : null}
                </View>
            </View>
            <StatusBar style="auto"/>
            {uploading && ( // Show loading indicator while uploading
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating={true} color={'#0000ff'} size="large" />
                </View>
            )}
        </View>
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
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        // width:200,
    },
    cardImage: {
        width: '100%',
        height: 100,
        // margin:5,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        marginBottom:5
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});