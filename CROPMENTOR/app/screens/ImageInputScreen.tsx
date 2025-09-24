import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { translations } from '../../constants/translations';

const ImageInputScreen = (): React.JSX.Element => {
  const router = useRouter();
  const t = translations.en;
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant access to your photo library to upload an image.'
      );
      return;
    }

    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.imageInput}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.promptText}>Upload a clear image of a crop leaf for diagnosis.</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>📷 Upload Image</Text>
        </TouchableOpacity>
        {image && (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.previewText}>Image Preview:</Text>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        )}
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
  backButtonText: {
    fontSize: 24,
    color: '#333',
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
    marginBottom: 30,
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
  hintText: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default ImageInputScreen;