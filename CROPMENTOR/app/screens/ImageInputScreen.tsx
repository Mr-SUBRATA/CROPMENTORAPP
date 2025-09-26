import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { translations } from '../../constants/translations';
import { Ionicons } from '@expo/vector-icons';

type InputMode = 'imageOnly' | 'imageAndQuery';

const ImageInputScreen = (): React.JSX.Element => {
    const router = useRouter();
    const t = translations.en;
    const [image, setImage] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const params = useLocalSearchParams();
    const mode = params.mode as InputMode || 'imageOnly';

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please grant access to your photo library to upload an image.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSend = () => {
        if (mode === 'imageAndQuery' && !query) {
            Alert.alert('Query Required', 'Please enter your query.');
            return;
        }
        // Logic to send image and/or query goes here
        Alert.alert('Submission', 'Image and query submitted successfully!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{mode === 'imageOnly' ? 'Image Only' : 'Image & Query'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.promptText}>
                    {mode === 'imageOnly'
                        ? 'Upload a clear image of a crop leaf for diagnosis.'
                        : 'Upload an image and type your query for combined analysis.'}
                </Text>
                
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>📷 Upload Image</Text>
                </TouchableOpacity>

                {image && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.previewText}>Image Preview:</Text>
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                    </View>
                )}

                {mode === 'imageAndQuery' && (
                    <TextInput
                        style={styles.queryInput}
                        placeholder="Type your query here..."
                        placeholderTextColor="#888"
                        multiline
                        value={query}
                        onChangeText={setQuery}
                    />
                )}
                
                <TouchableOpacity
                    style={[styles.sendButton, !image && styles.disabledButton, mode === 'imageAndQuery' && !query && styles.disabledButton]}
                    onPress={handleSend}
                    disabled={!image || (mode === 'imageAndQuery' && !query)}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>

                <Text style={styles.hintText}>Image recognition feature is coming soon!</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        padding: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    promptText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    uploadButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imagePreviewContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    previewText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    queryInput: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sendButton: {
        width: '100%',
        backgroundColor: '#5cb85c',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.5,
    },
    hintText: {
        color: '#888',
        fontStyle: 'italic',
        marginTop: 20,
    },
});

export default ImageInputScreen;