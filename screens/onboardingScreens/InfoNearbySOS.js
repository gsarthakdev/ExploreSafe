import { StyleSheet, Text, View } from "react-native";
import MainButton from "../../components/MainButton";
import { GlobalStyles } from "../../constants/styles";

export default function InfoNearbySOS({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={{ color: "white", marginBottom: 7, fontSize: 25 }}>
          What is <Text style={{fontWeight: '600'}}>Nearby SOS?</Text>
        </Text>
      </View>
      <Text style={styles.description}>
        Do you think you are in trouble or danger? Do you need help?
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
          Once you click the SOS Button: {"\n"}________________
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • Users within a 10 mile radius will see your SOS alert
          </Text>
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • Nearby Users will be able to see how far they are from
            you
          </Text>
          <Text style={{ marginTop: 20 }}>
            {"\n\n"} • Nearby users can get walking directions to come help you
          </Text>
        </Text>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <MainButton
            isValid
            onPress={() => navigation.push("InfoPassiveSOS")}
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
