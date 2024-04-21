import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default function StudentsScreen({navigation, route}) {
     // let lang = route.params.language;
    return (
        <View style={styles.container}>
            <TouchableHighlight style={{height:50, backgroundColor:'dodgerblue', margin:5,borderRadius:10}} onPress={()=>navigation.push('subjects')}>
                <View style={{flexDirection: 'row'}}>
                <Text style={{marginVertical:10, width:'80%',marginStart:5,color:'white'}}>Chipo Moyo</Text>
                <Text style={{marginVertical:10, width:'20%'}}>View</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{height:50, backgroundColor:'dodgerblue',margin:5,borderRadius:10}} onPress={()=>console.log("clicked 2")}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginVertical:10, width:'80%',marginStart:5,color:'white'}}>Farai Moyo</Text>
                    <Text style={{marginVertical:10, width:'20%'}}>View</Text>
                </View>
            </TouchableHighlight>

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
