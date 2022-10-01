import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DigitalMedicalScreen from "./screens/onboardingScreens/DigitalMedicalScreen";
import EmergencyContactsScreen from "./screens/onboardingScreens/EmergencyContactsScreen";
import SignupScreen from "./screens/onboardingScreens/SignupScreen";
import TempLandingScreen from "./screens/onboardingScreens/TempLandingScreen";

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
