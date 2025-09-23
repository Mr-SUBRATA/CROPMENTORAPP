import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { translations } from '../../constants/translations';

const SettingsScreen = (): React.JSX.Element => {
    const [lang, setLang] = useState('en');
    const router = useRouter();

    // State for notification toggles
    const [weatherAlerts, setWeatherAlerts] = useState(true);
    const [marketUpdates, setMarketUpdates] = useState(true);
    const [disasterAlerts, setDisasterAlerts] = useState(false);

    useEffect(() => {
        const getLang = async () => {
            const savedLang = await AsyncStorage.getItem('selectedLang') || 'en';
            setLang(savedLang);
        };
        getLang();
    }, []);

    const t = translations[lang as keyof typeof translations]?.settings || translations.en.settings;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t.settingsTitle}</Text>
            </View>

            <ScrollView style={styles.container}>
                {/* General Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.generalSettingsTitle}</Text>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowIcon}>👤</Text>
                            <Text style={styles.rowText}>{t.myProfileText}</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.row} onPress={() => router.push('/screens/LanguageScreen')}>
                            <Text style={styles.rowIcon}>🌐</Text>
                            <Text style={styles.rowText}>{t.changeLanguageText}</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.notificationsTitle}</Text>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.rowIcon}>☀️</Text>
                            <Text style={styles.rowText}>{t.weatherAlertsText}</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={weatherAlerts ? '#5cb85c' : '#f4f3f4'}
                                onValueChange={() => setWeatherAlerts(previousState => !previousState)}
                                value={weatherAlerts}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.rowIcon}>📈</Text>
                            <Text style={styles.rowText}>{t.marketUpdatesText}</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={marketUpdates ? '#5cb85c' : '#f4f3f4'}
                                onValueChange={() => setMarketUpdates(previousState => !previousState)}
                                value={marketUpdates}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.rowIcon}>⚠️</Text>
                            <Text style={styles.rowText}>{t.disasterAlertsToggleText}</Text>
                             <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={disasterAlerts ? '#5cb85c' : '#f4f3f4'}
                                onValueChange={() => setDisasterAlerts(previousState => !previousState)}
                                value={disasterAlerts}
                            />
                        </View>
                    </View>
                </View>

                 {/* Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.supportTitle}</Text>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowIcon}>❓</Text>
                            <Text style={styles.rowText}>{t.helpCenterText}</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowIcon}>🚩</Text>
                            <Text style={styles.rowText}>{t.reportProblemText}</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/screens/LoginScreen')}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.appVersion}>{t.appVersionText}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#f0f4f7',
    },
    section: {
        marginTop: 20,
        marginHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    rowIcon: {
        fontSize: 20,
        marginRight: 15,
    },
    rowText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    arrow: {
        fontSize: 20,
        color: '#c7c7cc',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 50,
    },
    logoutButton: {
        margin: 20,
        backgroundColor: '#d9534f',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    appVersion: {
        textAlign: 'center',
        color: '#aaa',
        marginBottom: 20,
    },
});

export default SettingsScreen;

