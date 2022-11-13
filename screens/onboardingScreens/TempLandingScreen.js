import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";

function TempLandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 20 }}>ExploreSafe</Text>
      <Button
        title="Get started"
        onPress={() => navigation.push("DigitalMedicalScreen")}
      />
    </View>
  );
}

export default TempLandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
