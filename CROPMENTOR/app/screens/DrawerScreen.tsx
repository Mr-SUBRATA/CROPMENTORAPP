import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const DrawerScreen = (): React.JSX.Element => {
  const router = useRouter();

  const navigateTo = (path: 'MarketPricesScreen' | 'DIYRemediesScreen' | 'AICallSupportScreen' | 'EmpoweredFarmersScreen' | 'DisasterNewsScreen' | 'SoilScreen') => {
    router.push(`/screens/${path}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('MarketPricesScreen')}>
          <Text style={styles.menuItemText}>Market Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('DIYRemediesScreen')}>
          <Text style={styles.menuItemText}>DIY Remedies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('AICallSupportScreen')}>
          <Text style={styles.menuItemText}>AI Call Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('EmpoweredFarmersScreen')}>
          <Text style={styles.menuItemText}>Empowered Farmers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('DisasterNewsScreen')}>
          <Text style={styles.menuItemText}>Disaster News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('SoilScreen')}>
          <Text style={styles.menuItemText}>Soil</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default DrawerScreen;