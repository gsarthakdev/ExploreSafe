import { FlatList, StyleSheet, Text, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { RTdatabase } from "../../firebase";
import { useEffect, useState } from "react";
import MainButton from "../../components/MainButton";
import * as Location from "expo-location";
import { GlobalStyles } from "../../constants/styles";
import NearbySOSCard from "../../components/NearbySOSCard";
export default function SOSNearbyScreen() {
  // console.log("\n-----------");
  console.log("Logged");
  // console.log("-----------");
  /*
  const [location, setLocation] = useState(null);
  useEffect(() => {
    getLocation();
    console.log("*************************");
  }, [])

  async function getLocation() {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    setLocation(location.coords);
  }
  // function getData() {
    function approximateDistance(originLat, originLng, destinationLat, destinationLng) {
      const distance =  (2 * Math.asin(Math.sqrt(Math.pow((Math.sin((originLat - destinationLat)/2)), 2) + Math.cos(originLat) * Math.cos(destinationLat) * (Math.pow((Math.sin((originLng - destinationLng)/2)), 2)))) / 360)*(2*Math.PI*3958.756);
      // console.log("\n-----")
      // console.log(distance)
      return distance;
    }
    
  
  const [data, setData] = useState([]);
  useEffect(() => {
    if(location !== null) {
    const sosRef = ref(RTdatabase, "sos/");
    onValue(sosRef, (snapshot) => {
    console.log("*****" + location)
      setData([]);
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val();
        var sosLocation = data.user_location;
        const localDistance = approximateDistance(location.latitude, location.longitude, sosLocation.latitude, sosLocation.longitude)
        console.log("Local Distance: " + localDistance);
        if (localDistance < 9) {
          setData((current) => [...current, data]);
        }  
      });
    });
  } else {
    console.log("we have hit the else statement")
  }
  }, [location]);




  function MyComponent() {
    if (data.length == 0) {
      return (
        <Text>Nothing</Text>
      ) 
    } else {
      return (
        <Text>{data[0].full_name}</Text>
      )
    }
  }

  if (location == null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Finding nearby SOSs...
        </Text>
      </View>
    )
  }
*/
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 45, alignItems: 'center', marginBottom: 30}}>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
            Nearby SOS Screen
          </Text>
        <Text style={{ fontSize: 16, fontWeight: "300", color: "white" }}>
          People nearby, who need help
        </Text>
      </View>
      <NearbySOSCard/>
      {/* <MainButton isValid onPress={() => console.log(data)}>
        Press
      </MainButton> */}
      {/* <MainButton isValid onPress={() => console.log(location.latitude)}>
        Location Value
      </MainButton> */}
      {/* <MyComponent/> */}
      {/* <FlatList data={data} renderItem={({item}) => (<Text>{item.full_name}</Text>)}/> */}
      {/* <ShowText data="HiHi"/> */}
      {/* item.emergency_contacts[0].name */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: GlobalStyles.colors.darkModeBackground,
  },
});
