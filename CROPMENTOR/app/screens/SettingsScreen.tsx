import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = (): React.JSX.Element => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Clear all data from AsyncStorage to log the user out
            await AsyncStorage.clear();
            
            // Navigate to the Login screen and replace the navigation history
            // so the user can't go back to the home screen.
            router.replace('/screens/LoginScreen');
        } catch (error) {
            console.error('Failed to clear AsyncStorage:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <View style={styles.content}>
                {/* You can add other settings options here in the future */}
                
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end', // Aligns the logout button to the bottom
        padding: 20,
    },
    logoutButton: {
        backgroundColor: '#d9534f', // A red color for logout/destructive actions
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;