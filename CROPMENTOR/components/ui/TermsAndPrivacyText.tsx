import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export function TermsAndPrivacyText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By continuing, you agree to our{' '}
        <Link href="#" style={styles.link}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" style={styles.link}>
          Privacy Policy
        </Link>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // You might want to adjust these styles
    marginTop: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  link: {
    color: '#5cb85c', // Or another appropriate link color
    textDecorationLine: 'underline',
  },
});