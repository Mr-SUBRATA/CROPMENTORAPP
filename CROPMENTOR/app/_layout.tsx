import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens/LanguageScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/SettingsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/WrittenInputScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/VoiceInputScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/ImageInputScreen" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}