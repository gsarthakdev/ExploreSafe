import { View, Text, StyleSheet, Button, TextInput, ImageBackground } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import MainButton from "../../components/MainButton";

function TempLandingScreen({ navigation }) {
  return (
    <ImageBackground style={styles.container} resizeMode="cover" source={require("../../assets/ExploreImageBackground.png")}>
    <View>
      <View style={{ marginTop: 100, alignItems: 'center', }}>
      <Text style={{ color: "white", marginBottom: 7, fontSize: 25,  }}>
          Welcome to
        </Text>
        <Text style={{ color: "white", fontWeight: '600', marginBottom: 20, fontSize: 40 }}>
          ExploreSafe
        </Text>
        <Text style={{ color: "white", fontSize: 18, marginHorizontal: 40, textAlign: 'center'}}>
          Leave stress at bay and let ExploreSafe be your friend in safety
        </Text>
      </View>
      <View style={{marginTop: 300, alignItems: 'center'}}>
        <MainButton isValid onPress={() => navigation.push("InfoNearbySOS")} overallStyle={{backgroundColor: '#5468FF'}} style={{color: 'white', fontSize: 20, fontWeight: '500'}}>Get Started</MainButton>
      </View>
      {/* <Button
        title="Get started"
        onPress={() => navigation.push("DigitalMedicalScreen")}
      /> */}
    </View>
    </ImageBackground>
  );
}

export default TempLandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1323",
    alignItems: "center",
    // justifyContent: "center",
  },
});
