import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./screens/authenticatedScreens/DashboardScreen";
import DigitalMedicalScreen from "./screens/onboardingScreens/DigitalMedicalScreen";
import EmergencyContactsScreen from "./screens/onboardingScreens/EmergencyContactsScreen";
import SignupScreen from "./screens/onboardingScreens/SignupScreen";
import TempLandingScreen from "./screens/onboardingScreens/TempLandingScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SOSNearbyScreen from "./screens/authenticatedScreens/SOSNearbyScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export function SignedOutScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TempLandingScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TempLandingScreen" component={TempLandingScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="DigitalMedicalScreen" component={DigitalMedicalScreen} />
        <Stack.Screen name="EmergencyContactsScreen" component={EmergencyContactsScreen}/>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
export function SignedInScreens() {
  return (
    
  );
}
*/

export function BottomTabsNavigation() {
  return ( 
    <NavigationContainer>
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="DashboardScreen" component={DashboardScreen}/>
      <BottomTabs.Screen name="SOSNearbyScreen" component={SOSNearbyScreen}/>
    </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
