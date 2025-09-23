import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const LanguageScreen = (): React.JSX.Element => {
  const router = useRouter(); // Use the useRouter hook for navigation

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
  ];

  const selectLanguage = async (langCode: string) => {
    try {
      await AsyncStorage.setItem('selectedLang', langCode);
      // Navigate using the file path of the screen
      router.push('/screens/LoginScreen');
    } catch (e) {
      console.error('Failed to save language.', e);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg_farm.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Your Farm Assistant</Text>
        <View style={styles.languageBox}>
          <Text style={styles.title}>Select your Language</Text>
          <View style={styles.languageOptions}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.langButton}
                onPress={() => selectLanguage(lang.code)}
              >
                <Text style={styles.langButtonText}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 40,
  },
  languageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  languageOptions: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  langButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '48%', 
    alignItems: 'center',
  },
  langButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LanguageScreen;

