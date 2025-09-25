import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* I have removed all the duplicate screen entries from this list */}
          <Stack.Screen name="screens/WelcomeScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/LanguageScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/SettingsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/WrittenInputScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/VoiceInputScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/ImageInputScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/DrawerScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/MarketPricesScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/DIYRemediesScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/AICallSupportScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/EmpoweredFarmersScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/DisasterNewsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/SoilScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/ProfileScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/SupportHelpScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/NotificationsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screens/DiagnosisHistoryScreen" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}