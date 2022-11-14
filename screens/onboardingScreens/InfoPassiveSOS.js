import { StyleSheet, Text, View } from "react-native";
import MainButton from "../../components/MainButton";
import { GlobalStyles } from "../../constants/styles";

export default function InfoPassiveSOS({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={{ color: "white", marginBottom: 7, fontSize: 25 }}>
          What is <Text style={{fontWeight: '600'}}>Passive SOS?</Text>
        </Text>
      </View>
      <Text style={styles.description}>
        What if you have no cellular connection?
      </Text>
      <View
        style={{
          height: "80%",
          backgroundColor: GlobalStyles.colors.darkModeAccent,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            color: "white",
            fontSize: 23,
            marginTop: 20,
          }}
        >
          After creading a route: {"\n"}________________
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • Our servers will use the user's input to determine if you have been offline for too long.
          </Text>
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • If you have been offline for too long, our servers will send a message to your contacts.
            you
          </Text>
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • Contacts will receive information about your location history, last known loction, and other important information.
          </Text>
        </Text>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <MainButton
            isValid
            onPress={() => navigation.push("DigitalMedicalScreen")}
            overallStyle={{ backgroundColor: "#5468FF" }}
            style={{ color: "white", fontSize: 20, fontWeight: "500" }}
          >
            Next
          </MainButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1323",
    // alignItems: "center",
  },
  description: {
    color: "white",
    marginTop: 20,
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
    marginBottom: 30,
  },
});
