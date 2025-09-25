import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FeatureCard from '../../components/FeatureCard';
import { translations } from '../../constants/translations';
import FeatureModal from '../../components/FeatureModal';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Feature {
  iconName: string;
  iconSet: 'Ionicons' | 'MaterialCommunityIcons';
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
      const savedLang = await AsyncStorage.getItem('selectedLang');
      if (savedLang) { setLang(savedLang); }
    };
    getLang();
  }, []);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const handleFeaturePress = (feature: Feature) => {
    setModalTitle(feature.title);
    setModalContent(feature.content);
    setModalVisible(true);
  };

  const handleOpenDrawer = () => {
    router.push('/screens/DrawerScreen');
  };

  const featureData: Feature[] = [
    { iconSet: 'Ionicons', iconName: 'leaf-outline', title: t.cropDoctor, color: '#ff8c42', content: 'Upload a clear picture of the affected leaf...' },
    { iconSet: 'MaterialCommunityIcons', iconName: 'tractor', title: t.govtSchemes, color: '#4CAF50', content: 'Find government schemes...' },
    { iconSet: 'Ionicons', iconName: 'partly-sunny-outline', title: t.weather, color: '#64b5f6', content: 'Today\'s forecast...' },
    { iconSet: 'Ionicons', iconName: 'flask-outline', title: t.localRemedies, color: '#ffa726', content: 'Discover effective, low-cost remedies...' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Notification Icon */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenDrawer} style={styles.headerButton}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Image source={require('../../assets/images/logo.png')} style={styles.headerLogo} />
          {/* ADDED: Wrapper for right-side icons */}
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
          <View style={styles.querySection}>
            <Image source={require('../../assets/images/farmer_avater.png')} style={styles.avatar} />
            <Text style={styles.queryPrompt}>{t.enterYourQuery}</Text>
            <View style={styles.inputOptions}>
              <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/WrittenInputScreen')}>
                <Ionicons name="pencil-outline" size={24} color="#555" />
                <Text style={styles.inputOptionText}>{t.writtenInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/VoiceInputScreen')}>
                <Ionicons name="mic-outline" size={24} color="#555" />
                <Text style={styles.inputOptionText}>{t.voiceInput}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputOption} onPress={() => router.push('/screens/ImageInputScreen')}>
                <Ionicons name="camera-outline" size={24} color="#555" />
                <Text style={styles.inputOptionText}>{t.imageInput}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {featureData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.featureCardContainer} onPress={() => handleFeaturePress(item)}>
                <FeatureCard iconSet={item.iconSet} iconName={item.iconName} title={item.title} color={item.color} />
              </TouchableOpacity>
            ))}
          </View>
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
  // ADDED: Style for the new icon wrapper
  rightHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  scrollViewContent: { padding: 15 },
  querySection: { backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  queryPrompt: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputOptions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  inputOption: { alignItems: 'center', gap: 5 },
  inputOptionText: { fontSize: 12, color: '#666' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCardContainer: { width: '48%', marginBottom: 15 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#666' },
  activeNavText: { color: '#5cb85c', fontWeight: 'bold' },
});

export default HomeScreen;