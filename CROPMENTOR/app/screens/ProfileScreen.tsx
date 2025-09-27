import React from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { translations } from '../../constants/translations';
import { useLanguage } from '../context/LanguageContext'; // Make sure this hook exists

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { language } = useLanguage(); // Get the current language from context
    const t = translations[language as keyof typeof translations] || translations.en;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ThemedView style={styles.profileHeader}>
                    <Image
                        source={require('@/assets/images/farmer_avater.png')}
                        style={styles.profileImage}
                    />
                    <ThemedText type="title" style={styles.userName}>
                        subrata das
                    </ThemedText>
                    <ThemedText type="default" style={styles.userLocation}>
                        India, West Bengal
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.section}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        {t.personalInformation}
                    </ThemedText>
                    <ThemedText style={styles.sectionItem}>
                        Email: subrata@example.com
                    </ThemedText>
                    <ThemedText style={styles.sectionItem}>
                        Phone: +91 9876543210
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.section}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        {t.appSettings}
                    </ThemedText>
                    <ThemedText style={styles.sectionItem}>
                        Language: {language}
                    </ThemedText>
                    <ThemedText style={styles.sectionItem}>
                        Notifications: On
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'transparent',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    userLocation: {
        fontSize: 16,
        color: 'gray',
    },
    section: {
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    sectionItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});