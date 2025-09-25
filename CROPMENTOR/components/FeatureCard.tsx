import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Define the props to accept an icon name and set
interface Props {
  iconName: string;
  iconSet: 'Ionicons' | 'MaterialCommunityIcons';
  title: string;
  color: string;
}

const FeatureCard = ({ iconName, iconSet, title, color }: Props): React.JSX.Element => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      {/* Conditionally render the correct icon from the specified set */}
      {iconSet === 'Ionicons' && <Ionicons name={iconName as any} size={30} color="#fff" />}
      {iconSet === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={iconName as any} size={30} color="#fff" />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FeatureCard;