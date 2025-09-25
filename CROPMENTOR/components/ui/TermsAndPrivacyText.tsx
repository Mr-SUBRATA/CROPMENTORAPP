import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

interface Props {
  text: string;
  style?: object;
}

const TermsAndPrivacyText: React.FC<Props> = ({ text, style }) => {
  // Define the URLs for your links
  const urls = {
    terms: 'https://google.com', // Replace with your Terms of Service URL
    privacy: 'https://google.com', // Replace with your Privacy Policy URL
  };

  // This regex will capture the text before, the link key, the link text, and the text after
  const parts = text.split(/<a href='(.*?)'>(.*?)<\/a>/g);

  const handlePress = (key: string) => {
    const url = urls[key as keyof typeof urls];
    if (url) {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>
        {parts.map((part, index) => {
          // The pattern is [text, linkKey, linkText, text, linkKey, linkText, ...]
          if (index % 3 === 1) { // This is a link key
            const linkText = parts[index + 1];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(part)}
              >
                <Text style={styles.link}>{linkText}</Text>
              </TouchableOpacity>
            );
          }
          if (index % 3 === 2) { // This is link text, already handled
            return null;
          }
          return part; // This is regular text
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  link: {
    color: '#007bff', // Or your preferred link color
    textDecorationLine: 'underline',
  },
});

export default TermsAndPrivacyText;