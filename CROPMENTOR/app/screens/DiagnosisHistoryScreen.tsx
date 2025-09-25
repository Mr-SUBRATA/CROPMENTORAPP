import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Sample data for the diagnosis history
const diagnosisHistory = [
  {
    id: '1',
    crop: 'Tomato',
    issue: 'Diagnosed Issue: Early Blight',
    date: 'Date: Oct 26, 2023',
    status: 'Critical',
    image: require('../../assets/images/tomato.jpeg'), 
  },
  {
    id: '2',
    crop: 'Corn',
    issue: 'Diagnosed Issue: No Pests Detected',
    date: 'Date: Oct 20, 2023',
    status: 'Resolved',
    image: require('../../assets/images/corn.jpeg'),
  },
  {
    id: '3',
    crop: 'Wheat',
    issue: 'Diagnosed Issue: Rust Fungi',
    date: 'Date: Sep 15, 2023',
    status: 'Moderate',
    image: require('../../assets/images/wheat.jpeg'),
  },
];

// Helper to get the color for the status tag
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Critical':
      return '#d9534f';
    case 'Resolved':
      return '#5cb85c';
    case 'Moderate':
      return '#f0ad4e';
    default:
      return '#777';
  }
};

const DiagnosisHistoryScreen = (): React.JSX.Element => {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof diagnosisHistory[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cropImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cropName}>{item.crop}</Text>
        <Text style={styles.issueText}>{item.issue}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis History</Text>
      </View>

      <View style={styles.searchAndFilterContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Search diagnoses..." style={styles.searchInput} />
        </View>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}><Text>Filter By Crop</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}><Text style={styles.activeFilterText}>Filter By Status</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text>Sort By</Text></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={diagnosisHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    backButton: { position: 'absolute', left: 15, zIndex: 1 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    searchAndFilterContainer: { padding: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F5', borderRadius: 10, paddingHorizontal: 10, marginBottom: 15 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: 40 },
    filterButtons: { flexDirection: 'row', justifyContent: 'space-around' },
    filterButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#E9ECEF' },
    activeFilter: { backgroundColor: '#D4EDDA' },
    activeFilterText: { color: '#155724', fontWeight: 'bold' },
    list: { padding: 15 },
    card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cropImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
    cardContent: { flex: 1 },
    cropName: { fontSize: 16, fontWeight: 'bold' },
    issueText: { fontSize: 14, color: '#555', marginVertical: 2 },
    dateText: { fontSize: 12, color: '#888' },
    statusTag: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 15, position: 'absolute', bottom: 10, right: 10 },
    statusText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
});

export default DiagnosisHistoryScreen;