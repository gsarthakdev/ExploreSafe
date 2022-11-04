import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabsNavigation, SignedInScreens, SignedOutScreens } from './navigation';
import EmergencyContactsScreen from './screens/onboardingScreens/EmergencyContactsScreen';
import TempLandingScreen from './screens/onboardingScreens/TempLandingScreen';

export default function App() {
  return (
      <>
      <StatusBar style="light" />
      {/* <SignedOutScreens/> */}
      {/* <BottomTabsNavigation/> */}
      <SignedInScreens/>
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
