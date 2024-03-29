import { Alert, StyleSheet, Text, View } from "react-native";
import MainButton from "../../components/MainButton";
import { ref, set, push } from "firebase/database";
import {useEffect, useState} from "react";
import {RTdatabase, db, auth, MAPS_API_KEY} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import * as Location from 'expo-location';
import axios from "axios"
import { signOut } from "firebase/auth";
import { GlobalStyles } from "../../constants/styles";
function DashboardScreen({ navigation }) {
  function tester() {
    const here = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    console.log(here);
  }
  // const [location, setLocation] = useState(null);
  // useEffect(() => {
  //   getLocation();
  // }, [])
  
  async function signOutHandler() {
    await signOut(auth).then(() => {
      console.log("Signed out successfully!")
    }).catch((error) => {
      console.log("Error", error)
    })
  }
  
  async function sosHandler() {
    const randomID = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    const docRef = doc(db, auth.currentUser.uid, "user_information");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const medical_info = docSnap.data().medical_info;
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
    
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    
    
    set(newSOSRef, {
      // [randomID]: {
        full_name: auth.currentUser.displayName, 
        user_location: {
          latitude: location.coords.latitude, 
          longitude: location.coords.longitude, 
        }, 
        medical_ID: {
          allergies: allergies,
          medicationsTaken: medicationsTaken, 
          primaryLanguages: primaryLanguages
        },
        emergency_contacts: emergencyContacts
      // }
    });
  }



  // async function getLocation() {
  //     let location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.BestForNavigation
  //     });
  //     setLocation(location);
  //   }

    // const [datad, setDatad] = useState([]);
    // async function runAPI() {
    //   const link = "https://maps.googleapis.com/maps/api/distancematrix/json"
    //   const api_key = MAPS_API_KEY;
    //   // const origin = {lat: 35.053950, lng: -80.819890};
    //   const originLat = 35.053950;
    //   const originLng = -80.819890;
    //   const destinationLat = 28.40539296078933;
    //   const destinationLng = -77.73718225533925;
    //   // /*
    //   const response = await axios.get(link, {
    //     params: {
    //       origins: `${originLat},${originLng}`,
    //       destinations: `${destinationLat},${destinationLng}`, 
    //       units: "imperial",
    //       mode: "walking",
    //       key: api_key
    //     }
    //   })
    //   // */
    //   // const testH = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&units=imperial&key=${api_key}`
    //   // const response = await axios.get(testH)
    //   console.log(response)
    //   setDatad((current) => [...current, response])
    // }

    // function distanceCalculator(originLat, originLng, destinationLat, destinationLng) {
    //   const distance =  (2 * Math.asin(Math.sqrt(Math.pow((Math.sin((originLat - destinationLat)/2)), 2) + Math.cos(originLat) * Math.cos(destinationLat) * (Math.pow((Math.sin((originLng - destinationLng)/2)), 2)))) / 360)*(2*Math.PI*3958.756);
    //   return distance
    // }


  
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
        {/* <MainButton isValid onPress={() => console.log("runapihere")}>
          API
        </MainButton>
        <MainButton isValid onPress={() => console.log(datad[2].data.rows[0].elements[0].duration.text)}>
          API Read
        </MainButton> */}
        <MainButton isValid onPress={signOutHandler}>Sign out (testing)</MainButton>
      </View>
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.darkModeBackground,
    alignItems: "center",
  },
  sosButton: {
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },
});
