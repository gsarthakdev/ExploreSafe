import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import MainButton from "../../components/MainButton";
import { TextField } from "./DigitalMedicalScreen";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

/*
  Fields needed: 
  Contact name: email, password
*/

function EmergencyContactsScreen({ navigation, route }) {
  const medicalInfo = route.params.medical_info;
  const [name1, setName1] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [name2, setName2] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  // console.log({name1});
  // console.log({phoneNumber1})
  // console.log({name2});
  // console.log({phoneNumber2})
  // console.log("Name", name1);

  async function sendEmergencyContactsData() {
    const emergencyContacts = [
      {
        name: name1,
        phone_number: phoneNumber1,
      },
      {
        name: name2,
        phone_number: phoneNumber2,
      },
    ];
    // console.log(emergencyContacts[0]);
    // const userUID = auth.currentUser.uid;
    // await updateDoc(doc(db, userUID, "user_information" ), {
    //   emergency_contacts: emergencyContacts
    // })
    navigation.push("SignupScreen", {
      emergencyContacts: emergencyContacts,
      medicalInfo: medicalInfo,
    });
  }

  function autofillHandler() {
    setName1("Alex Miller")
    console.log(name1);
    setName2("Sundar Pichai")
    console.log(name2);
  }
  
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Almost Done! Add your emergency contacts.
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            marginBottom: 20,
            // marginHorizontal: 20,
          }}
        >
          Please enter in real phone numbers otherwise app functionality will be
          hindered
        </Text>
        <View style={{marginBottom: 20}}>
          <Button title="Demo Autofill" onPress={autofillHandler} />
        </View>
        <TextField placeholder="Name" onChangeText={(text) => setName1(text)} value={name1} />
        <View style={{ alignItems: "flex-end" }}>
          {/* <TextField placeholder="✉️ Email" width={330}/> */}
          <TextField
            placeholder="📞 Phone Number (no spaces or dashes)"
            width={330}
            onChangeText={(text) => setPhoneNumber1(text)}
          />
        </View>
        <TextField placeholder="Name" onChangeText={(text) => setName2(text)} value={name2} />
        <View style={{ alignItems: "flex-end" }}>
          {/* <TextField placeholder="✉️ Email" width={330}/> */}
          <TextField
            placeholder="📞 Phone Number (no spaces or dashes)"
            width={330}
            onChangeText={(text) => setPhoneNumber2(text)}
          />
        </View>
      </View>
      <MainButton
        isValid={true}
        style={{ fontSize: 21 }}
        onPress={sendEmergencyContactsData}
      >
        Next
      </MainButton>
    </View>
  );
}

export default EmergencyContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1323",
    alignItems: "center",
  },
});
