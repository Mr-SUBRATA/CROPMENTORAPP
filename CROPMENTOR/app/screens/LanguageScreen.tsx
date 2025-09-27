import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import i18n from '@/lib/i18n';

const { width, height } = Dimensions.get('window');

const LanguageScreen = (): React.JSX.Element => {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('');

  const languages = [
    { code: 'en', name: 'English', prompt: 'For english tap here' },
    { code: 'bn', name: 'বাংলা', prompt: 'বাংলার জন্য এখানে টিপুন' },
    { code: 'hi', name: 'हिंदी', prompt: 'हिंदी के लिए यहां टैप करें' },
    { code: 'ml', name: 'മലയാളം', prompt: 'മലയാളത്തിന് ഇവിടെ ടാപ്പുചെയ്യുക' },
    { code: 'te', name: 'తెలుగు', prompt: 'తెలుగు కోసం ഇక్కడ നొక్కండి' },
    { code: 'ta', name: 'தமிழ்', prompt: 'தமிழ் தேர்ந்தெடுக்க இங்கே தட்டவும்' },
    { code: 'mr', name: 'मराठी', prompt: 'मराठीसाठी येथे टॅप करा' },
    { code: 'gu', name: 'ગુજરાતી', prompt: 'ગુજરાતી માટે અહીં ટેપ કરો' },
    { code: 'kn', name: 'ಕನ್ನಡ', prompt: 'ಕನ್ನಡಕ್ಕೆ ಇಲ್ಲಿ ಟ್ಯಾಪ್ ಮಾಡಿ' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', prompt: 'ਪੰਜਾਬੀ ਲਈ ਇੱਥੇ ਟੈਪ ਕਰੋ' },
  ];

  useEffect(() => {
    const getSavedLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLang');
      if (savedLang) {
        setSelectedLang(savedLang);
      }
    };
    getSavedLanguage();
  }, []);

  const selectLanguage = async (langCode: string) => {
    setSelectedLang(langCode);
  };

  const handleContinue = async () => {
    if (selectedLang) {
      await AsyncStorage.setItem('selectedLang', selectedLang);
      i18n.locale = selectedLang;
      router.push('/screens/LoginScreen');
    }
  };

  const renderLanguageItem = ({ item }: { item: typeof languages[0] }) => (
    <TouchableOpacity
      style={[
        styles.langButton,
        item.code === selectedLang && styles.selectedLangButton,
      ]}
      onPress={() => selectLanguage(item.code)}
    >
      <Text style={[
        styles.langButtonText,
        item.code === selectedLang && styles.selectedLangButtonText,
      ]}>
        {item.prompt}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topLeftGreenBlob} />
      <View style={styles.bottomRightGreenBlob} />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.instructionText}>Please Select Your Language</Text>
        </View>

        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.code}
          style={styles.languageList}
          contentContainerStyle={styles.languageListContent}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity
          style={[styles.continueButton, !selectedLang && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedLang}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topLeftGreenBlob: {
    position: 'absolute',
    top: -height * 0.3,
    left: -width * 0.7,
    width: width,
    height: height * 0.7,
    backgroundColor: '#5cb85c',
    borderRadius: 200,
    transform: [{ rotate: '60deg' }],
  },
  bottomRightGreenBlob: {
    position: 'absolute',
    bottom: -height * 0.3,
    right: -width * 0.7,
    width: width,
    height: height * 0.7,
    backgroundColor: '#5cb85c',
    borderRadius: 500,
    transform: [{ rotate: '60deg' }],
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  logo: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
  },
  languageList: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  languageListContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  langButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
  },
  selectedLangButton: {
    backgroundColor: '#5cb85c',
  },
  langButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedLangButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageScreen;