import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, Touchable, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native';

export default function ActivitiesScreen({navigation, route}) {

    return (
        <View style={styles.container}>
            <View style={{height:'50%',width:'100%',flexDirection: 'row'}}>
                <View style={{flexDirection: 'column',width:'50%',alignItems: 'center',
                    justifyContent: 'center',marginHorizontal:2}}>
                    <Image resizeMode='cover' style={{width:'100%',height:'80%',borderRadius:10}} source={require('../assets/homework.jpeg')} />
                    <Text>Homework</Text>
                </View>
                <View style={{flexDirection: 'column',width:'50%',alignItems: 'center',
                    justifyContent: 'center',marginHorizontal:2}}>
                    <Image resizeMode='cover' style={{width:'100%',height:'80%',borderRadius:10}} source={require('../assets/classwork.jpg')} />
                    <Text>Classwork</Text>
                </View></View>
            <View style={{height:'50%',width:'100%',flexDirection: 'row'}}>
                <View style={{flexDirection: 'column',width:'50%',alignItems: 'center',
                    justifyContent: 'center',marginHorizontal:2}}>
                    <Image resizeMode='cover' style={{width:'100%',height:'80%',borderRadius:10}} source={require('../assets/attendance.jpg')} />
                    <Text>Attendance</Text>
                </View>
                <View style={{flexDirection: 'column',width:'50%',alignItems: 'center',
                    justifyContent: 'center',marginHorizontal:2}}>
                    <Image resizeMode='cover' style={{width:'100%',height:'80%',borderRadius:10}} source={require('../assets/tests.webp')} />
                    <Text>Tests</Text>
                </View></View>


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:'5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
