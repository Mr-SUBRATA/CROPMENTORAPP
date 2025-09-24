import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FeatureCard from '../../components/FeatureCard';
import { translations } from '../../constants/translations';
import FeatureModal from '../../components/FeatureModal';

// Define a type for the feature objects to fix the 'any' type error
interface Feature {
  icon: string;
  title: string;
  color: string;
  content: string;
}

const HomeScreen = (): React.JSX.Element => {
  const [lang, setLang] = useState('en');
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const getLang = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('selectedLang');
        if (savedLang) {
          setLang(savedLang);
        }
      } catch (e) {
        console.error("Failed to fetch language from storage", e);
      }
    };
    getLang();
  }, []);

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Now the 'feature' parameter is correctly typed with the 'Feature' interface
  const handleFeaturePress = (feature: Feature) => {
    setModalTitle(feature.title);
    setModalContent(feature.content);
    setModalVisible(true);
  };

  const featureData: Feature[] = [
    { icon: '🌿', title: t.cropDoctor, color: '#ff8c42', content: 'Upload a clear picture of the affected leaf. Our AI will analyze it and provide a diagnosis.' },
    { icon: '🚜', title: t.govtSchemes, color: '#4CAF50', content: 'Here you will find a list of government schemes applicable to your region and crops. This feature is coming soon!' },
    { icon: '☁️', title: t.weather, color: '#64b5f6', content: 'Today\'s forecast: Sunny with a high of 32°C.' },
    { icon: '🍃', title: t.localRemedies, color: '#ffa726', content: 'Discover effective, low-cost remedies using locally available materials. This feature is coming soon!' },
  ];

  // Handler functions for the new input pages
  const handleWrittenInput = () => {
    router.push('/screens/WrittenInputScreen');
  };

  const handleVoiceInput = () => {
    router.push('/screens/VoiceInputScreen');
  };

  const handleImageInput = () => {
    router.push('/screens/ImageInputScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CropMentor</Text>
          <TouchableOpacity onPress={() => router.push('/screens/SettingsScreen')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.querySection}>
            <Image source={require('../../assets/images/farmer_avater.png')} style={styles.avatar} />
            <Text style={styles.queryPrompt}>{t.enterYourQuery}</Text>
            <View style={styles.inputOptions}>
              <TouchableOpacity style={styles.inputOption} onPress={handleWrittenInput}>
                <Text style={styles.inputIcon}>✏️</Text>
                <Text style={styles.inputOptionText}>{t.writtenInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption} onPress={handleVoiceInput}>
                <Text style={styles.inputIcon}>🎤</Text>
                <Text style={styles.inputOptionText}>{t.voiceInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption} onPress={handleImageInput}>
                <Text style={styles.inputIcon}>📷</Text>
                <Text style={styles.inputOptionText}>{t.imageInput}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {featureData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.featureCardContainer} onPress={() => handleFeaturePress(item)}>
                <FeatureCard icon={item.icon} title={item.title} color={item.color} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={[styles.navText, styles.activeNavText]}>{t.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🎤</Text>
            <Text style={styles.navText}>{t.voiceAssistant}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>{t.myProfile}</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Component */}
        <FeatureModal
          title={modalTitle}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          content={modalContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollViewContent: {
    padding: 15,
  },
  querySection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  queryPrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputOption: {
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  inputOptionText: {
    fontSize: 12,
    color: '#666',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCardContainer: {
    width: '48%',
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: '#666',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#5cb85c',
    fontWeight: 'bold',
  },
});

export default HomeScreen;