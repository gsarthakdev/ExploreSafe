import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SignedOutScreens } from './navigation';
import TempLandingScreen from './screens/onboardingScreens/TempLandingScreen';

export default function App() {
  return (
      <>
      <StatusBar style="light" />
      <SignedOutScreens/>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
