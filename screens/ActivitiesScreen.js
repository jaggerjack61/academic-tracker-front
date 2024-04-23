import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    Button,
    FlatList,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActivitiesScreen({ navigation, route }) {
    const activities = route.params.activities;
    const classes = route.params.data;
    const host = 'https://90a5-197-221-244-246.ngrok-free.app/';
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredActivities, setFilteredActivities] = useState(activities);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        const filtered = activities.filter((activity) => {
            return (
                activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (activity.type &&
                    activity.type.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (activity.due_date &&
                    activity.due_date.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
        setFilteredActivities(filtered);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Activities</Text>
                <TouchableHighlight
                    style={styles.searchIcon}
                    onPress={() => setIsSearchVisible(!isSearchVisible)}
                >
                    <Image
                        source={require('../assets/search.png')}
                        style={styles.searchIconImage}
                    />
                </TouchableHighlight>
            </View>
            {isSearchVisible && (
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search activities..."
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
            )}
            <FlatList
                data={filteredActivities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Image
                                source={{ uri: host + item.type.image }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardType}>[{item.type.name}]</Text>
                            <Text style={styles.cardDueDate}>
                                Due date: {item.due_date ?? 'None'}
                            </Text>
                            <Button
                                onPress={() =>
                                    navigation.push('activity', { activity: item, data: classes })
                                }
                                style={styles.cardButton}
                                title="View Details"
                            />
                        </View>
                    </View>
                )}
            />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchIcon: {
        padding: 10,
    },
    searchIconImage: {
        width: 24,
        height: 24,
    },
    searchBar: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    searchInput: {
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        padding: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
        marginTop: 10,
    },
    cardType: {
        fontSize: 14,
        color: '#888',
    },
    cardDueDate: {
        fontSize: 14,
        color: '#555',
    },
    cardButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    },
});