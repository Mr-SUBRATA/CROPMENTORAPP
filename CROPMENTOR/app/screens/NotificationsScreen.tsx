import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Sample notification data
const notifications = [
  { id: '1', type: 'weather', title: 'Weather Alert', message: 'Heavy rainfall expected in your area tomorrow. Plan accordingly.', time: '10m ago' },
  { id: '2', type: 'market', title: 'Market Price Update', message: 'The price of Wheat has increased by 5% in your local market.', time: '1h ago' },
  { id: '3', type: 'disease', title: 'Crop Doctor Alert', message: 'A new pest has been identified in your region. Learn more.', time: '5h ago' },
  { id: '4', type: 'scheme', title: 'New Government Scheme', message: 'A new subsidy for irrigation equipment is now available.', time: '1d ago' },
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'weather':
      return <Ionicons name="partly-sunny" size={24} color="#64b5f6" />;
    case 'market':
      return <Ionicons name="trending-up" size={24} color="#4CAF50" />;
    case 'disease':
      return <Ionicons name="leaf" size={24} color="#ff8c42" />;
    case 'scheme':
      return <Ionicons name="flag" size={24} color="#ffa726" />;
    default:
      return <Ionicons name="notifications" size={24} color="#888" />;
  }
};

const NotificationsScreen = (): React.JSX.Element => {
    const router = useRouter();

    const renderItem = ({ item }: { item: typeof notifications[0] }) => (
      <View style={styles.notificationItem}>
        <View style={styles.iconContainer}>
            <NotificationIcon type={item.type} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007aff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e5ea' },
    backButton: { position: 'absolute', left: 15, zIndex: 1 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    list: { padding: 15 },
    notificationItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
    iconContainer: { marginRight: 15 },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    message: { fontSize: 14, color: '#555' },
    time: { fontSize: 12, color: '#999', marginTop: 8 },
});

export default NotificationsScreen;