import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { translations } from '../../constants/translations';

const LoginScreen = (): React.JSX.Element => {
    const [lang, setLang] = useState('en');
    const router = useRouter();

    useEffect(() => {
        const getLang = async () => {
            const savedLang = await AsyncStorage.getItem('selectedLang') || 'en';
            setLang(savedLang);
        };
        getLang();
    }, []);

    const t = translations[lang as keyof typeof translations] || translations.en;

    const handleLogin = () => {
        // Basic validation can be added here
        router.push('/screens/HomeScreen');
    };

    return (
        <ImageBackground
            source={require('../../assets/images/bg_farm.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View style={styles.loginContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                        <Text style={styles.subtitle}>{t.yourFarmAssistant}</Text>

                        <Text style={styles.title}>{t.signInOrCreateAccount}</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputIcon}>📱</Text>
                            <TextInput
                                placeholder={t.mobileOrEmail}
                                style={styles.input}
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                placeholder={t.password}
                                style={styles.input}
                                placeholderTextColor="#888"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>{t.continue}</Text>
                        </TouchableOpacity>

                        <Text style={styles.termsText}>{t.terms.replace(/<a href='#'>/g, '').replace(/<\/a>/g, '')}</Text>

                        <View style={styles.socialLoginContainer}>
                            <Text style={styles.orText}>{t.or}</Text>
                            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                                <Text style={styles.socialIcon}>G</Text>
                                <Text style={styles.socialButtonText}>{t.continueWithGoogle}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                                <Text style={styles.socialIcon}>f</Text>
                                <Text style={styles.socialButtonText}>{t.continueWithFacebook}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Dark overlay for better text readability
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#5cb85c',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 12,
        color: '#888',
        marginTop: 15,
        textAlign: 'center',
    },
    socialLoginContainer: {
        width: '100%',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    orText: {
        textAlign: 'center',
        color: '#777',
        marginBottom: 15,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    googleButton: {
        // Specific styles if needed
    },
    facebookButton: {
        // Specific styles if needed
    },
    socialIcon: {
        marginRight: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
});

export default LoginScreen;

