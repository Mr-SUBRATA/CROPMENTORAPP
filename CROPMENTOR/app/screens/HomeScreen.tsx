import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FeatureCard from '../../components/FeatureCard';
import { translations } from '../../constants/translations';

const HomeScreen = (): React.JSX.Element => {
  const [lang, setLang] = useState('en');
  const router = useRouter();

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
              <TouchableOpacity style={styles.inputOption}>
                <Text style={styles.inputIcon}>✏️</Text>
                <Text style={styles.inputOptionText}>{t.writtenInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption}>
                <Text style={styles.inputIcon}>🎤</Text>
                <Text style={styles.inputOptionText}>{t.voiceInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption}>
                <Text style={styles.inputIcon}>📷</Text>
                <Text style={styles.inputOptionText}>{t.imageInput}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            <FeatureCard icon="🌿" title={t.cropDoctor} color="#ff8c42" />
            <FeatureCard icon="🚜" title={t.govtSchemes} color="#4CAF50" />
            <FeatureCard icon="☁️" title={t.weather} color="#64b5f6" />
            <FeatureCard icon="🍃" title={t.localRemedies} color="#ffa726" />
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#5cb85c',
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    header: {
        backgroundColor: '#5cb85c',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    settingsIcon: {
        fontSize: 26,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    querySection: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#5cb85c'
    },
    queryPrompt: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 25,
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
        fontSize: 30,
        color: '#5cb85c',
    },
    inputOptionText: {
        marginTop: 8,
        color: '#555',
        fontSize: 14,
        fontWeight: '600',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#ffffff',
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navIcon: {
        fontSize: 26,
        color: '#888',
    },
    navText: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    activeNavText: {
        color: '#5cb85c',
        fontWeight: '600'
    }
});

export default HomeScreen;

