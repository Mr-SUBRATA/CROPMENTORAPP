import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { translations } from '../../constants/translations';
import TermsAndPrivacyText from '../../components/ui/TermsAndPrivacyText';

const { width, height } = Dimensions.get('window');

const LoginScreen = (): React.JSX.Element => {
    const [lang, setLang] = useState('en');
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getLang = async () => {
            const savedLang = await AsyncStorage.getItem('selectedLang') || 'en';
            setLang(savedLang);
        };
        getLang();
    }, []);

    const t = translations[lang as keyof typeof translations] || translations.en;
    
    // Check if the mobile number is 10 digits and password is not empty
    const isValid = mobileOrEmail.length === 10 && !isNaN(Number(mobileOrEmail)) && password.length > 0;

    const handleLogin = () => {
        // This function will only be called if the button is not disabled
        router.push('/screens/HomeScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topLeftGreenBlob} />
            <View style={styles.bottomRightGreenBlob} />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
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
                                keyboardType="number-pad"
                                value={mobileOrEmail}
                                onChangeText={setMobileOrEmail}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                placeholder={t.password}
                                style={styles.input}
                                placeholderTextColor="#888"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, !isValid && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={!isValid}
                        >
                            <Text style={styles.loginButtonText}>{t.continue}</Text>
                        </TouchableOpacity>
                        <TermsAndPrivacyText text={t.terms} style={styles.termsText} />
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
        transform: [{ rotate: '30deg' }],
    },
    bottomRightGreenBlob: {
        position: 'absolute',
        bottom: -height * 0.3,
        right: -width * 0.7,
        width: width,
        height: height * 0.7,
        backgroundColor: '#5cb85c',
        borderRadius: 200,
        transform: [{ rotate: '30deg' }],
    },
    safeArea: {
        flex: 1,
        zIndex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '90%',
        backgroundColor: 'transparent', // Changed to transparent
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
        color: '#060606ff',
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
    disabledButton: {
        opacity: 0.5,
    },
});

export default LoginScreen;