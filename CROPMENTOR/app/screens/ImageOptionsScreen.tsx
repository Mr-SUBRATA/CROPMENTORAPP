import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ImageOptionsScreen = (): React.JSX.Element => {
    const router = useRouter();

    const handleImageOnly = () => {
        router.push({
            pathname: '/screens/ImageInputScreen',
            params: { mode: 'imageOnly' }
        });
    };

    const handleImageAndQuery = () => {
        router.push({
            pathname: '/screens/ImageInputScreen',
            params: { mode: 'imageAndQuery' }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Image Input</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.promptText}>Select an input mode:</Text>
                <TouchableOpacity style={styles.optionButton} onPress={handleImageOnly}>
                    <Ionicons name="image-outline" size={30} color="#fff" />
                    <Text style={styles.optionText}>Image Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={handleImageAndQuery}>
                    <Ionicons name="text-outline" size={30} color="#fff" />
                    <Text style={styles.optionText}>Image + Query</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#5cb85c',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    backButton: {
        position: 'absolute',
        left: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    promptText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5cb85c',
        width: '80%',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
    },
});

export default ImageOptionsScreen;