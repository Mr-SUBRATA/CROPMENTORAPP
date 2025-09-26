import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FeatureCard from '../../components/FeatureCard';
import { translations } from '../../constants/translations';
import FeatureModal from '../../components/FeatureModal';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ModalFeature {
  iconName: string;
  iconSet: 'Ionicons' | 'MaterialCommunityIcons';
  title: string;
  color: string;
  content: string;
  description?: string;
  path?: never;
}

interface NavFeature {
  iconName: string;
  iconSet: 'Ionicons' | 'MaterialCommunityIcons';
  title: string;
  color: string;
  path: string;
  description?: string;
  content?: never;
}

type Feature = ModalFeature | NavFeature;

const isNavFeature = (feature: Feature): feature is NavFeature => {
  return 'path' in feature && feature.path !== undefined;
};

const HomeScreen = (): React.JSX.Element => {
  const [lang, setLang] = useState('en');
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [prominentWeather, setProminentWeather] = useState({
    location: 'North Glasgow, Montana',
    temperature: '30°C',
    condition: 'Good Day For Irrigation',
    date: 'Sat, 4 Dec',
    icon: 'partly-sunny-outline',
  });

  useEffect(() => {
    const getLang = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLang');
      if (savedLang) { setLang(savedLang); }
    };
    getLang();
  }, []);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const handleFeaturePress = (feature: Feature) => {
    if (isNavFeature(feature)) {
      router.push('/screens/DiagnosisHistoryScreen');
    } else {
      setModalTitle(feature.title);
      setModalContent(feature.content);
      setModalVisible(true);
    }
  };

  const handleOpenDrawer = () => {
    router.push('/screens/DrawerScreen');
  };

  const featureData: Feature[] = [
    { iconSet: 'Ionicons', iconName: 'leaf-outline', title: t.cropDoctor, color: '#ff8c42', content: 'Upload a clear picture of the affected leaf...', description: 'Identify diseases and get solutions.' },
    { iconSet: 'MaterialCommunityIcons', iconName: 'tractor', title: t.govtSchemes, color: '#4CAF50', content: 'Find government schemes...', description: 'Discover relevant agricultural schemes.' },
    { iconSet: 'Ionicons', iconName: 'partly-sunny-outline', title: t.weather, color: '#64b5f6', content: 'Today\'s forecast...', description: 'Get real-time weather updates.' },
    { iconSet: 'Ionicons', iconName: 'document-text-outline', title: t.yourDiagnosis, color: '#f0ad4e', path: '/screens/DiagnosisHistoryScreen', description: 'View your previous crop diagnosis results.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenDrawer} style={styles.headerButton}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
          <View style={styles.rightHeaderIcons}>
            <TouchableOpacity onPress={() => router.push('/screens/NotificationsScreen')} style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/screens/SettingsScreen')} style={styles.headerButton}>
              <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Query Section with Gradient Background and Circle Inputs */}
          <LinearGradient
            colors={['#5bff7eff', '#d93dadff']}
            style={styles.gradientQuerySection}
          >
            <View style={styles.querySectionInner}>
              <Image source={require('../../assets/images/farmer_avater.png')} style={styles.avatar} />
              <Text style={styles.queryPrompt}>{t.enterYourQuery}</Text>
              <View style={styles.inputOptions}>
                <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/WrittenInputScreen')}>
                  <View style={styles.inputCircle}>
                    <Ionicons name="pencil-outline" size={28} color="#fff" />
                  </View>
                  <Text style={styles.inputOptionText}>{t.writtenInput}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/VoiceInputScreen')}>
                  <View style={styles.inputCircle}>
                    <Ionicons name="mic-outline" size={28} color="#fff" />
                  </View>
                  <Text style={styles.inputOptionText}>{t.voiceInput}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/ImageOptionsScreen')}>
                  <View style={styles.inputCircle}>
                    <Ionicons name="camera-outline" size={28} color="#fff" />
                  </View>
                  <Text style={styles.inputOptionText}>{t.imageInput}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Manage Your Farm Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Manage Your Farm</Text>
            <TouchableOpacity onPress={() => { /* Navigation for "Sell all" */ }}>
              <Text style={styles.seeAllText}>Sell all</Text>
            </TouchableOpacity>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {featureData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.featureCardContainer} onPress={() => handleFeaturePress(item)}>
                <FeatureCard iconSet={item.iconSet} iconName={item.iconName} title={item.title} color={item.color} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Prominent Weather Card */}
          <TouchableOpacity
            onPress={() => handleFeaturePress({
              iconSet: 'Ionicons',
              iconName: 'partly-sunny-outline',
              title: t.weather,
              color: '#64b5f6',
              content: 'Detailed weather forecast for the coming days, humidity, wind speed, and more.',
            })}
            style={styles.prominentWeatherCardTouchable}
          >
            <LinearGradient
              colors={['#a7ddf6ff', '#1d8ec2ff']}
              style={styles.prominentWeatherCard}
            >
              <View style={styles.weatherHeader}>
                <Text style={styles.weatherTitle}>Today's Weather</Text>
                <Text style={styles.weatherDate}>{prominentWeather.date}</Text>
              </View>
              <View style={styles.weatherDetails}>
                <View>
                  <Text style={styles.weatherLocation}>
                    <Ionicons name="location-outline" size={16} color="#fff" /> {prominentWeather.location}
                  </Text>
                  <Text style={styles.weatherTemperature}>{prominentWeather.temperature}</Text>
                  <Text style={styles.weatherCondition}>{prominentWeather.condition}</Text>
                </View>
                <Ionicons name={prominentWeather.icon as any} size={60} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#5cb85c" />
            <Text style={[styles.navText, styles.activeNavText]}>{t.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="mic-circle-outline" size={24} color="#666" />
            <Text style={styles.navText}>{t.voiceAssistant}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/ProfileScreen')}>
            <Ionicons name="person-circle-outline" size={24} color="#666" />
            <Text style={styles.navText}>{t.myProfile}</Text>
          </TouchableOpacity>
        </View>

        <FeatureModal visible={modalVisible} onClose={() => setModalVisible(false)} title={modalTitle} content={modalContent} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 40, paddingHorizontal: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerButton: { padding: 5 },
  headerLogo: { width: 150, height: 40, resizeMode: 'contain' },
  rightHeaderIcons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  scrollViewContent: { padding: 15 },

  // Gradient Query Section
  gradientQuerySection: {
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  querySectionInner: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  queryPrompt: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  inputOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  inputOption: {
    alignItems: 'center',
    width: 80,
  },
  inputCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#42b4e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    elevation: 3,
  },
  inputOptionText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },

  // Weather Card Styling
  prominentWeatherCardTouchable: { marginTop: 20, marginBottom: 20 },
  prominentWeatherCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weatherTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  weatherDate: { fontSize: 14, color: '#fff' },
  weatherDetails: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weatherLocation: { fontSize: 14, color: '#fff', marginBottom: 5 },
  weatherTemperature: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
  weatherCondition: { fontSize: 16, color: '#fff' },

  // Manage Your Farm Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAllText: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },

  // Features Grid
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCardContainer: { width: '48%', marginBottom: 15 },

  // Bottom Nav
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#666' },
  activeNavText: { color: '#5cb85c', fontWeight: 'bold' },
});

export default HomeScreen;
