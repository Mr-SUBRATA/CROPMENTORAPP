import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = (): React.JSX.Element => {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to the LanguageScreen, replacing the welcome screen in history
    router.replace('/screens/LanguageScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_farm.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topContent}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.quote}>
              "The future of agriculture is not in growing crops, but in the
              cultivation of knowledge."
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for readability
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  topContent: {
    alignItems: 'center',
    marginTop: '25%', // Push content down from the top
  },
  logo: {
    width: 280,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  quote: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  startButton: {
    width: '100%',
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20, // Space from the bottom
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;