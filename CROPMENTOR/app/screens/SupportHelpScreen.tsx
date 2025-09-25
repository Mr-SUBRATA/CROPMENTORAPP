import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const SupportHelpScreen = (): React.JSX.Element => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Support & Help</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions (FAQ)</Text>
                <View style={styles.faqItem}>
                    <Text style={styles.question}>Q: How do I use the Crop Doctor feature?</Text>
                    <Text style={styles.answer}>A: Navigate to the home screen, tap on the "Image Input" option under "Enter Your Query", and upload a clear photo of the affected crop leaf. Our AI will analyze it for you.</Text>
                </View>

                <View style={styles.faqItem}>
                    <Text style={styles.question}>Q: How can I change the language?</Text>
                    <Text style={styles.answer}>A: You can change the language from the Settings page. Tap the gear icon (⚙️) on the top-right of the home screen, then select 'Language' to choose your preferred language.</Text>
                </View>

                <View style={styles.faqItem}>
                    <Text style={styles.question}>Q: Where can I see government schemes?</Text>
                    <Text style={styles.answer}>A: The Government Schemes feature is available on the home screen. We are constantly updating it with the latest information for your region.</Text>
                </View>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <View style={styles.contactSection}>
                    <Text style={styles.contactInfo}>If you need further assistance or want to report a problem, please reach out to our support team:</Text>
                    <Text style={styles.contactDetail}>📧 Email: support@cropmentor.com</Text>
                    <Text style={styles.contactDetail}>📞 Phone: +91 12345 67890</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 24,
        color: '#007aff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginTop: 10,
    },
    faqItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    answer: {
        fontSize: 14,
        lineHeight: 20,
        color: '#555',
    },
    contactSection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
    },
    contactInfo: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    contactDetail: {
        fontSize: 16,
        color: '#007aff',
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default SupportHelpScreen;