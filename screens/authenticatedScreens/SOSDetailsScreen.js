import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { MAPS_API_KEY } from "../../firebase";
function SOSDetailsScreen({ route, navigation }) {
  const sosData = route.params.sosData;
  const currentUserLocation = route.params.currentUserLocation;
  // const [response, setResponse] = useState();
  console.log(currentUserLocation);
  const [here, setHere] = useState();
  return (
    <View style={styles.container}>
      {/* <Text>SOSDetailsScreen</Text> */}
      <View style={{ marginTop: 45, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
          {sosData.full_name}'s Details
        </Text>
      </View>
      {/* <View> */}
      <ScrollView style={{ marginTop: 45 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: "white",
            marginLeft: 15,
            marginBottom: 10,
          }}
        >
          <Ionicons name="medical" size={20} color="red" /> Medical ID
        </Text>
        <View
          style={{
            paddingTop: 20,
            padding: 15,
            backgroundColor: GlobalStyles.colors.darkModeAccent,
            width: "100%",
            height: 250,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 5 }}>
            Allergies:
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sosData.medical_ID.allergies}
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 10 }}>
            ___________________________________
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 5 }}>
            Medications Taken:
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sosData.medical_ID.medicationsTaken}
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 10 }}>
            ___________________________________
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 5 }}>
            Primary Language(s) Spoken:
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sosData.medical_ID.primaryLanguages}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: "white",
            marginLeft: 15,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Ionicons name="md-people-sharp" size={24} color="orange" /> Emergency
          Contacts
        </Text>
        <View
          style={{
            paddingTop: 20,
            padding: 15,
            backgroundColor: GlobalStyles.colors.darkModeAccent,
            width: "100%",
            height: 200,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 15 }}>
            {sosData.emergency_contacts[0].name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sosData.emergency_contacts[0].phone_number}
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 10 }}>
            ___________________________________
          </Text>
          <Text style={{ color: "#98989f", fontSize: 16, marginBottom: 15 }}>
            {sosData.emergency_contacts[1].name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sosData.emergency_contacts[1].phone_number}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <Pressable
            onPress={() => {
              directionsAPI();
              // console.log(response.data.routes[0].legs[0].steps[0].distance.text)
              // console.log(response.data.routes[0].legs[0].steps[0].html_instructions.toString().replace("<b>", "").replace("</b>", ""))
              // console.log(response.data.routes[0].legs[0].steps);
             
            }}
            style={({ pressed }) => pressed && { opacity: 0.75 }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "white",
                width: 200,
                padding: 10,
                borderRadius: 7,
              }}
            >
              <Text>Get Directions to help</Text>
            </View>
          </Pressable>
          </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
  
  async function directionsAPI() {
    const link = "https://maps.googleapis.com/maps/api/directions/json"
    const api_key = MAPS_API_KEY;
    const response = await axios.get(link, {
      params: {
        origin: `${currentUserLocation.latitude},${currentUserLocation.longitude}`,
        destination: `${sosData.user_location.latitude},${sosData.user_location.longitude}`,
        units: "imperial",
        mode: "walking",
        key: api_key
      }
    })
    console.log(response);
    // setResponse(response);
    navigation.push("SOSMapDirections", {
      directionsData: response.data.routes[0].legs[0].steps 
    })
    // setHere(response.data.routes[0].legs[0].steps[0].html_instructions);

  }              

  
}

export default SOSDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.darkModeBackground,
  },
});
