import { StyleSheet, Text, View } from "react-native";
import MainButton from "../../components/MainButton";
import { ref, set, push } from "firebase/database";
import {RTdatabase, db, auth} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

function DashboardScreen({ navigation }) {
  function tester() {
    const here = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    console.log(here);
  }
  
  async function sosHandler() {
    const randomID = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

    const docRef = doc(db, auth.currentUser.uid, "user_information");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const medical_info = docSnap.data().medicalInfo;
      var allergies = medical_info.allergies;
      var medicationsTaken = medical_info.medicationsTaken;
      var primaryLanguages = medical_info.primaryLanguages;
      var emergencyContacts = docSnap.data().emergency_contacts;
      // console.log(emergencyContacts);
    } else {
      // doc.data() will be undefined in this case
      console.log("No data found!");
    }
    
    const sosRef = ref(RTdatabase, '/sos');
    const newSOSRef = push(sosRef);
    // const newSOSRef = sosRef + "/" + auth.currentUser.uid;
    console.log("*****"+newSOSRef.key);
    
    set(newSOSRef, {
      // [randomID]: {
        full_name: auth.currentUser.displayName, 
        medical_ID: {
          allergies: allergies,
          medicationsTaken: medicationsTaken, 
          primaryLanguages: primaryLanguages
        },
        emergency_contacts: emergencyContacts
      // }
    });
    
    
    /*
    set(ref(RTdatabase, '/sos'), {
      [randomID]: {
        full_name: auth.currentUser.displayName, 
        medical_ID: {
          allergies: allergies,
          medicationsTaken: medicationsTaken, 
          primaryLanguages: primaryLanguages
        },
        emergency_contacts: emergencyContacts
      }
    });
    */
  }
  
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={{ color: "white" }}>DashboardScreen</Text>
        <MainButton
          onPress={sosHandler}
          isValid
          overallStyle={{ backgroundColor: "red" }}
          style={styles.sosButton}
        >
          ⚠️SOS
        </MainButton>
      </View>
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  sosButton: {
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },
});
