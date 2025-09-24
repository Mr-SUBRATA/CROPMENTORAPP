import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { translations } from '../../constants/translations';

const VoiceInputScreen = (): React.JSX.Element => {
  const router = useRouter();
  const t = translations.en;
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate a listening process that stops after 3 seconds
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.voiceInput}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.promptText}>
          {isListening ? "Listening..." : "Tap the microphone and start speaking your query."}
        </Text>
        <TouchableOpacity
          style={[styles.microphoneButton, isListening && styles.microphoneButtonListening]}
          onPress={handleVoiceInput}
        >
          <Text style={[styles.microphoneIcon, isListening && styles.microphoneIconListening]}>
            🎙️
          </Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>Voice recognition feature is coming soon!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  microphoneButton: {
    backgroundColor: '#5cb85c',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  microphoneButtonListening: {
    backgroundColor: '#ff5c5c',
  },
  microphoneIcon: {
    fontSize: 60,
    color: '#fff',
  },
  microphoneIconListening: {
    color: '#eee',
  },
  hintText: {
    color: '#888',
    fontStyle: 'italic',
  },
});

export default VoiceInputScreen;