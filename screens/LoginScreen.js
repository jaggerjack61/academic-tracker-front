import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ActivityIndicator } from 'react-native';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, getUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            if (await login({ email, password })) {
                navigation.navigate("subjects");
            } else {
                setError("Failed to login. Please check your credentials.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        await getUser({});
        navigation.navigate("students");
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
                    <Button title="Login" onPress={handleLogin} />
                    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    <Text></Text>
                    <Button onPress={handleForgotPassword} title="Forgot Password" />
                </View>
                {error && (
                    <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
                )}
                <StatusBar style="auto" />
            </View>
            <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ margin: 15 }}>Swole Devs &copy; {currentYear}</Text>
            </View>
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
});