import { useState } from "react";
import {View, Text, StyleSheet, TextInput} from "react-native"
import MainButton from "../../components/MainButton";
import { TextField } from "./DigitalMedicalScreen";
import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore"; 
import { auth, db } from "../../firebase";

/*
  Fields needed: 
  Contact name: email, password
*/

function EmergencyContactsScreen() {
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
        phone_number: phoneNumber1 
      },
      {
        name: name2,
        phone_number: phoneNumber2
      }
    ]
    console.log(emergencyContacts[0]);
    // const userUID = auth.currentUser.uid;
    // await updateDoc(doc(db, userUID, "user_information" ), {
    //   emergency_contacts: emergencyContacts
    // })
  }
  
  
  return (
    <View style={styles.container}>
       <View style={{ marginTop: 50, marginBottom: 50 }}>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Almost Done! Add your emergency contacts.
        </Text>
          <TextField placeholder="Name" onChangeText={(text) => setName1(text)}/>
          <View style={{alignItems: 'flex-end'}}>
            {/* <TextField placeholder="✉️ Email" width={330}/> */}
            <TextField placeholder="📞 Phone Number (no spaces or dashes)" width={330} onChangeText={(text) => setPhoneNumber1(text)} />
          </View>
          <TextField placeholder="Name" onChangeText={(text) => setName2(text)}/>
          <View style={{alignItems: 'flex-end'}}>
          {/* <TextField placeholder="✉️ Email" width={330}/> */}
          <TextField placeholder="📞 Phone Number (no spaces or dashes)" width={330} onChangeText={(text) => setPhoneNumber2(text)}/>
          </View>

        </View>
          <MainButton 
          isValid={true}
          style={{fontSize: 21}}
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
    backgroundColor: "#000000",
    alignItems: "center",
  }
})