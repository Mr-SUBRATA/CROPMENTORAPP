import { Redirect } from 'expo-router';

export default function App() {
  // Redirect to the new welcome screen instead of the language screen
  return <Redirect href="/screens/WelcomeScreen" />;
}