import { Card, Title, Paragraph, IconButton, Button, Chip } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    FlatList,
    TextInput,
    ScrollView,
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
    const [selectedChip, setSelectedChip] = useState('All');

    // Get unique item types
    const uniqueItemTypes = [
        ...new Set(activities.map((activity) => activity.type.name)),
    ];

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

        // Apply additional filtering based on selected chip
        if (selectedChip !== 'All') {
            setFilteredActivities(
                filtered.filter((activity) => activity.type.name === selectedChip)
            );
        } else {
            setFilteredActivities(filtered);
        }
    }, [searchQuery, selectedChip]);

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

            {/* Filter chips */}
            <ScrollView horizontal style={[
                styles.chipsContainer,
                { height: 80 } // add this
            ]}>
                <Chip
                    key="All"
                    selected={selectedChip === 'All'}
                    onPress={() => setSelectedChip('All')}
                    style={[styles.chip, selectedChip === 'All' && styles.chipSelected]}
                >
                    All
                </Chip>
                {uniqueItemTypes.map((itemType) => (
                    <Chip
                        key={itemType}
                        selected={selectedChip === itemType}
                        onPress={() => setSelectedChip(itemType)}
                        style={[styles.chip, selectedChip === itemType && styles.chipSelected]}
                    >
                        {itemType}
                    </Chip>
                ))}
            </ScrollView>

            <FlatList
                data={filteredActivities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Card key={index} style={styles.card}>
                        <Card.Content>
                            <View style={styles.cardHeader}>
                                <Image
                                    source={{ uri: host + item.type.image }}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </View>
                            <Paragraph>
                                <Text style={styles.cardType}>{item.type.name} </Text>
                                {item.due_date ? (
                                    <Text style={styles.cardDueDate}>
                                        Due date: {item.due_date}
                                    </Text>
                                ) : (
                                    ''
                                )}
                            </Paragraph>
                            <Button
                                onPress={() =>
                                    navigation.push('activity', { activity: item, data: classes })
                                }
                                style={{ margin: 5 }}
                                mode="outlined"
                            >
                                View Details
                            </Button>
                        </Card.Content>
                    </Card>
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardType: {
        fontSize: 14,
        color: '#888',
    },
    cardDueDate: {
        fontSize: 14,
        color: '#555',
    },
    // Filter chip styles
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        // marginBottom: 15,
    },
    chip: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 2,
        marginHorizontal: 5,
    },
    chipSelected: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
});