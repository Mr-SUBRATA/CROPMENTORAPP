import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, Switch, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../../constants/translations';

const SettingsScreen = (): React.JSX.Element => {
    const router = useRouter();

    // States for settings
    const [notificationsExpanded, setNotificationsExpanded] = useState(false);
    const [disasterAlert, setDisasterAlert] = useState(true);
    const [weatherAlert, setWeatherAlert] = useState(true);
    const [marketAlert, setMarketAlert] = useState(false);
    
    // States for language selection
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        const getLang = async () => {
            const savedLang = await AsyncStorage.getItem('selectedLang') || 'en';
            setCurrentLang(savedLang);
        };
        getLang();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            router.replace('/screens/LoginScreen');
        } catch (error) {
            console.error('Failed to clear AsyncStorage:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    const handleSelectLanguage = async (langCode: string) => {
        try {
            await AsyncStorage.setItem('selectedLang', langCode);
            setCurrentLang(langCode);
            setLanguageModalVisible(false);
            Alert.alert('Language Updated', `The app language has been set to ${languageOptions.find(l => l.code === langCode)?.name}. Please restart the app to see changes.`);
        } catch (error) {
            console.error('Failed to save language:', error);
        }
    };
    
    const languageOptions = [
      { name: 'English', code: 'en' },
      { name: 'हिन्दी (Hindi)', code: 'hi' },
      { name: 'বাংলা (Bengali)', code: 'bn' },
      { name: 'తెలుగు (Telugu)', code: 'te' },
      { name: 'मराठी (Marathi)', code: 'mr' },
      { name: 'தமிழ் (Tamil)', code: 'ta' },
      { name: 'ગુજરાતી (Gujarati)', code: 'gu' },
      { name: 'ಕನ್ನಡ (Kannada)', code: 'kn' },
      { name: 'മലയാളം (Malayalam)', code: 'ml' },
      { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'pa' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Account Section */}
                <Text style={styles.sectionTitle}>Account</Text>
                <View style={styles.section}>
                    {/* FIXED: Using full path for navigation */}
                    <TouchableOpacity style={styles.row} onPress={() => router.push('/screens/ProfileScreen')}>
                        <Text style={styles.rowIcon}>👤</Text>
                        <Text style={styles.rowLabel}>Edit Profile</Text>
                        <Text style={styles.rowChevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* App Settings Section */}
                <Text style={styles.sectionTitle}>App Settings</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => setLanguageModalVisible(true)}>
                        <Text style={styles.rowIcon}>🌐</Text>
                        <Text style={styles.rowLabel}>Language</Text>
                        <View style={styles.languageIndicator}>
                            <Text style={styles.currentLangText}>{languageOptions.find(l => l.code === currentLang)?.name}</Text>
                            <Text style={styles.rowChevron}>›</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row} onPress={() => setNotificationsExpanded(!notificationsExpanded)}>
                        <Text style={styles.rowIcon}>🔔</Text>
                        <Text style={styles.rowLabel}>Notifications</Text>
                        <Text style={styles.rowChevron}>{notificationsExpanded ? 'ˆ' : '›'}</Text>
                    </TouchableOpacity>
                    {notificationsExpanded && (
                        <View style={styles.subSection}>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>Disaster Alert</Text><Switch value={disasterAlert} onValueChange={setDisasterAlert} /></View>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>Weather Alert</Text><Switch value={weatherAlert} onValueChange={setWeatherAlert} /></View>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>Market Alert</Text><Switch value={marketAlert} onValueChange={setMarketAlert} /></View>
                        </View>
                    )}
                </View>

                {/* Support Section */}
                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.section}>
                    {/* FIXED: Using full path for navigation */}
                    <TouchableOpacity style={styles.row} onPress={() => router.push('/screens/SupportHelpScreen')}>
                        <Text style={styles.rowIcon}>❓</Text>
                        <Text style={styles.rowLabel}>Support & Help</Text>
                        <Text style={styles.rowChevron}>›</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Report a Problem', 'Feature coming soon!')}>
                        <Text style={styles.rowIcon}>⚠️</Text>
                        <Text style={styles.rowLabel}>Report a Problem</Text>
                        <Text style={styles.rowChevron}>›</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Language Selection Modal */}
            <Modal
                transparent={true}
                visible={languageModalVisible}
                animationType="fade"
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setLanguageModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        <FlatList
                            data={languageOptions}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.langOption} onPress={() => handleSelectLanguage(item.code)}>
                                    <Text style={[styles.langText, item.code === currentLang && styles.selectedLangText]}>
                                        {item.name}
                                    </Text>
                                    {item.code === currentLang && <Text style={styles.checkMark}>✓</Text>}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e5ea' },
    backButton: { marginRight: 15 },
    backButtonText: { fontSize: 24, color: '#007aff' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    content: { paddingVertical: 20, paddingBottom: 50 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#6d6d72', marginLeft: 20, marginBottom: 8, textTransform: 'uppercase' },
    section: { backgroundColor: '#fff', marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c6c6c8' },
    row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    rowIcon: { fontSize: 20, marginRight: 15 },
    rowLabel: { flex: 1, fontSize: 16 },
    rowChevron: { fontSize: 20, color: '#c7c7cc' },
    languageIndicator: { flexDirection: 'row', alignItems: 'center' },
    currentLangText: { fontSize: 16, color: '#8e8e93', marginRight: 5 },
    divider: { height: 1, backgroundColor: '#c6c6c8', marginLeft: 55 },
    subSection: { paddingLeft: 55, backgroundColor: '#fff' },
    subRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingRight: 20 },
    subRowLabel: { fontSize: 16 },
    logoutButton: { backgroundColor: '#d9534f', padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 20, marginTop: 20 },
    logoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', borderRadius: 15, padding: 20, width: '80%', maxHeight: '60%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    langText: { fontSize: 16 },
    selectedLangText: { color: '#007aff', fontWeight: 'bold' },
    checkMark: { fontSize: 18, color: '#007aff' },
});

export default SettingsScreen;