import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Image, ActivityIndicator, Modal, Alert } from 'react-native';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Text, Button } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, getUser, role } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for modal

    const handleLogin = async () => {
        setIsLoading(true);
        setShowModal(true); // Show modal before making API call
        try {
            if (await login({ email, password })) {
                const role2 = await AsyncStorage.getItem('role');
                console.log(role2);
                if(role2 === "student"){
                    navigation.navigate("subjects",{subjects:null, data:null });
                }
                else if(role2 === "parent"){
                    navigation.navigate("students");
                }
                else{
                    Alert.alert('Error', 'The app is only for students and parents');
                }
            } else {
                setError("Failed to login. Please check your credentials.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
            setShowModal(false); // Hide modal after API call
        }
    };

    const handleForgotPassword = async () => {
        // await getUser({});
        // navigation.navigate("students");
        Alert.alert(
            'Forgot Password','Please contact the school administrator to have your password reset.',
        )
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={{ width: 150, height: 150, marginBottom: 50 }}
                    resizeMode="contain"
                    source={require('../assets/ico.jpg')}
                />

                <Text style={{ fontSize: 30, marginBottom: 10 }}>Savant</Text>
                {error && (
                    <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(username) => setUsername(username)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={handleLogin}
                            style={{ margin: 10 }}
                            icon='login'
                            mode='contained'>Login</Button>
                    {/*{isLoading && <ActivityIndicator size="large" color="#0000ff" />}*/}

                    <Button onPress={handleForgotPassword}
                            style={{ margin: 10 }}
                            icon='help'
                            mode='outlined'>Forgot Password</Button>
                </View>

                <StatusBar style="auto" />
            </View>
            <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ margin: 15 }}>Swole Devs &copy; {currentYear}</Text>
            </View>

            {/* Modal for loading indicator */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        {/*<Text style={{ marginTop: 10 }}>Loading...</Text>*/}
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: "80%",
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'column',
        width: "80%",
        justifyContent: 'space-between',
        marginVertical: 10, // added this line
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        opacity:1
    },
});