import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2; // Subtracting 60 for padding/margin

interface FeatureCardProps {
  icon: string;
  title: string;
  color: string;
}

const FeatureCard = ({ icon, title, color }: FeatureCardProps): React.JSX.Element => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 48,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default FeatureCard;