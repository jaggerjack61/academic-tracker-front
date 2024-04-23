import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TouchableHighlight, View, Image, Button, Linking} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ViewActivityScreen({navigation, route}) {

    const activity = route.params.activity;
    const classes = route.params.data;
    console.log(activity);
    const host = "https://90a5-197-221-244-246.ngrok-free.app/";

        const handleOpenInBrowser = async () => {
            try {
                const supported = await Linking.canOpenURL(host+activity.file);
                if (supported) {
                    await Linking.openURL(host+activity.file);
                } else {
                    console.error(`Don't know how to open this URL: ${host+activity.file}`);
                }
            } catch (error) {
                console.error('Error opening URL:', error);
            }
        };



    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <Image source={{uri: host + activity.type.image}} style={styles.cardImage} resizeMode="cover"/>
                {console.log(host + activity.type.image)}
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{activity.name}</Text>
                    <Text>[{activity.type.name}]</Text>
                    <Text>Due date: {activity.due_date ?? 'None'}</Text>
                    <Text style={styles.cardDescription}>Description:{activity.note ?? 'None'}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {activity.type.type === 'score'?
                        <><Text>Total:</Text>
                            {activity.logs.filter(log => log.activity_id === activity.id && log.student_id === classes[0].id).map(log =>
                                <Text>{log.score}</Text>)}
                            <Text>{'/' + activity.total ?? 'None'}</Text></>:''}
                        {activity.type.type === 'boolean'?
                            <><Text>Status:</Text>
                                {activity.logs.filter(log => log.activity_id === activity.id && log.student_id === classes[0].id).map(log =>
                                    <Text>{log.score ===2 ? activity.type.true_value:''}{log.score ===1 ? activity.type.false_value:''}</Text>)}
                              </>:''}

                    </View>
                    {activity.file !== null?<Button onPress={handleOpenInBrowser}
                                                    color='lightgreen' title="Download File"/>:null}

                </View>
            </View>


            <StatusBar style="auto"/>
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
    },
});