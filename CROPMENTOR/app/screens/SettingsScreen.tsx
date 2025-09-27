import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView, Switch, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext'; // Import the new hook
import { translations } from '../../constants/translations';

const SettingsScreen = (): React.JSX.Element => {
    const router = useRouter();
    const { language, setLanguage } = useLanguage(); // Use the new hook
    const [notificationsExpanded, setNotificationsExpanded] = useState(false);
    const [disasterAlert, setDisasterAlert] = useState(true);
    const [weatherAlert, setWeatherAlert] = useState(true);
    const [marketAlert, setMarketAlert] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

    const t = translations[language as keyof typeof translations] || translations.en;

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            router.replace('/screens/LoginScreen');
        } catch (error) { console.error('Failed to logout:', error); }
    };

    const handleSelectLanguage = async (langCode: string) => {
        try {
            await setLanguage(langCode);
            setLanguageModalVisible(false);
            Alert.alert('Language Updated', `Language set to ${languageOptions.find(l => l.code === langCode)?.name}. Please restart the app to see all changes.`);
        } catch (error) { console.error('Failed to save language:', error); }
    };

    const languageOptions = [
      { name: 'English', code: 'en' },
      { name: 'हिन्दी (Hindi)', code: 'hi' },
      { name: 'বাংলা (Bengali)', code: 'bn' },
      { name: 'తెలుగు (Telugu)', code: 'te' },
      { name: 'ಮರಾಠಿ (Marathi)', code: 'mr' },
      { name: 'தமிழ் (Tamil)', code: 'ta' },
      { name: 'ગુજરાતી (Gujarati)', code: 'gu' },
      { name: 'ಕನ್ನಡ (Kannada)', code: 'kn' },
      { name: 'മലയാളം (Malayalam)', code: 'ml' },
      { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'pa' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007aff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t.settings.settingsTitle}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Account Section */}
                <Text style={styles.sectionTitle}>{t.personalInformation}</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => router.push('/screens/ProfileScreen')}>
                        <Ionicons name="person-outline" size={20} color="#555" style={styles.rowIcon} />
                        <Text style={styles.rowLabel}>{t.settings.myProfileText}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#c7c7cc" />
                    </TouchableOpacity>
                    {/* The "Your Diagnosis" item has been moved to the home screen. */}
                </View>

                {/* FIXED: App Settings Section */}
                <Text style={styles.sectionTitle}>{t.appSettings}</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => setLanguageModalVisible(true)}>
                        <Ionicons name="globe-outline" size={20} color="#555" style={styles.rowIcon} />
                        <Text style={styles.rowLabel}>{t.settings.changeLanguageText}</Text>
                        <View style={styles.languageIndicator}>
                            <Text style={styles.currentLangText}>{languageOptions.find(l => l.code === language)?.name}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#c7c7cc" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row} onPress={() => setNotificationsExpanded(!notificationsExpanded)}>
                        <Ionicons name="notifications-outline" size={20} color="#555" style={styles.rowIcon} />
                        <Text style={styles.rowLabel}>{t.settings.notificationsTitle}</Text>
                        <Ionicons name={notificationsExpanded ? 'chevron-down' : 'chevron-forward'} size={20} color="#c7c7cc" />
                    </TouchableOpacity>
                    {notificationsExpanded && (
                        <View style={styles.subSection}>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>{t.settings.disasterAlertsToggleText}</Text><Switch value={disasterAlert} onValueChange={setDisasterAlert} /></View>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>{t.settings.weatherAlertsText}</Text><Switch value={weatherAlert} onValueChange={setWeatherAlert} /></View>
                            <View style={styles.subRow}><Text style={styles.subRowLabel}>{t.settings.marketUpdatesText}</Text><Switch value={marketAlert} onValueChange={setMarketAlert} /></View>
                        </View>
                    )}
                </View>

                {/* FIXED: Support Section */}
                <Text style={styles.sectionTitle}>{t.supportHelpCentre}</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => router.push('/screens/SupportHelpScreen')}>
                        <Ionicons name="help-circle-outline" size={20} color="#555" style={styles.rowIcon} />
                        <Text style={styles.rowLabel}>{t.supportHelpCentre}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#c7c7cc" />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Report a Problem', 'Feature coming soon!')}>
                        <Ionicons name="alert-circle-outline" size={20} color="#555" style={styles.rowIcon} />
                        <Text style={styles.rowLabel}>{t.settings.reportProblemText}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#c7c7cc" />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            
            <Modal transparent={true} visible={languageModalVisible} animationType="fade" onRequestClose={() => setLanguageModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setLanguageModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        <FlatList data={languageOptions} keyExtractor={(item) => item.code} renderItem={({ item }) => (
                            <TouchableOpacity style={styles.langOption} onPress={() => handleSelectLanguage(item.code)}>
                                <Text style={[styles.langText, item.code === language && styles.selectedLangText]}>{item.name}</Text>
                                {item.code === language && <Ionicons name="checkmark" size={20} color="#007aff" />}
                            </TouchableOpacity>
                        )} />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e5ea', },
    backButton: { position: 'absolute', left: 15, zIndex: 1 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    content: { paddingVertical: 20, paddingBottom: 50 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#6d6d72', marginLeft: 20, marginBottom: 8, textTransform: 'uppercase' },
    section: { backgroundColor: '#fff', marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c6c6c8' },
    row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    rowIcon: { marginRight: 15, width: 20, textAlign: 'center' },
    rowLabel: { flex: 1, fontSize: 16 },
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
});

export default SettingsScreen;