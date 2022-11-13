import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { MAPS_API_KEY, RTdatabase } from "../../firebase";
import { useEffect, useState } from "react";
import MainButton from "../../components/MainButton";
import * as Location from "expo-location";
import { GlobalStyles } from "../../constants/styles";
import NearbySOSCard from "../../components/NearbySOSCard";
import axios from "axios";


export default function SOSNearbyScreen() {
  async function runAPI(originLat, originLng, destinationLat, destinationLng, data) {
    // originLat, originLng, destinationLat, destinationLng
    // const link = "https://maps.googleapis.com/maps/api/distancematrix/json"
    const link = "maps.googleapis.com/maps/api/distancematrix/json";
    const api_key = MAPS_API_KEY;
    // const origin = {lat: 35.053950, lng: -80.819890};
    /*
    const originLat = 35.053950;
    const originLng = -80.819890;
    const destinationLat = 35.40539296078933;
    const destinationLng = -80.73718225533925;
    // */
    /*
    const response = await axios.get(link, {
      params: {
        origins: `${originLat},${originLng}`,
        destinations: `${destinationLat},${destinationLng}`,
        units: "imperial",
        mode: "walking",
        key: "api_key"
      }
    })
    // */
    //  /*
    // const testH = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&units=imperial&key=${api_key}`
    // https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&units=imperial&key=${api_key}
    // https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY
    // const response = await axios.get(testH)
    // console.log(response);
    // console.log("*******Request made**********");
    // */
    console.log(`$$$$$ ${Platform.OS} API REQUEST MADE $$$$$`);
    setDistanceData((current) => [...current, response]);
    setData((current) => [...current, data]);
  }

  // console.log("\n-----------");
  console.log("Logged");
  // console.log("-----------");
  // /*
  const [location, setLocation] = useState(null);
  useEffect(() => {
    getLocation();
    console.log("*************************");
  }, []);

  async function getLocation() {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    setLocation(location.coords);
  }
  // function getData() {
  function approximateDistance(
    originLat,
    originLng,
    destinationLat,
    destinationLng
  ) {
    const distance =
      ((2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin((originLat - destinationLat) / 2), 2) +
              Math.cos(originLat) *
                Math.cos(destinationLat) *
                Math.pow(Math.sin((originLng - destinationLng) / 2), 2)
          )
        )) /
        360) *
      (2 * Math.PI * 3958.756);
    // console.log("\n-----")
    // console.log(distance)
    return distance;
  }

  const [data, setData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  useEffect(() => {
    if (location !== null && Platform.OS !== "ios") {
      const sosRef = ref(RTdatabase, "sos/");
      onValue(sosRef, (snapshot) => {
        console.log("*****" + location);
        setData([]);
        setDistanceData([]);
        snapshot.forEach((childSnapshot) => {
          var data = childSnapshot.val();
          var sosLocation = data.user_location;
          const localDistance = approximateDistance(
            location.latitude,
            location.longitude,
            sosLocation.latitude,
            sosLocation.longitude
          );
          console.log("Local Distance: " + localDistance);
          // if (localDistance < 9) {
          /*
          runAPI(
            location.latitude,
            location.longitude,
            sosLocation.latitude,
            sosLocation.longitude,
            data
          );
          */
          setData((current) => [...current, data]);
          // }
          // const getDistanceData = async () => {
          //   var distanceData = await runAPI();
          //   setDistanceData((current) => [...current, distanceData])
          // }
        });
      });
    } else {
      console.log("we have hit the else statement");
    }
  }, [location]);

  function MyComponent() {
    if (data.length == 0) {
      return <Text>Nothing</Text>;
    } else {
      return <Text>{data[0].full_name}</Text>;
    }
  }

  if (location == null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Finding nearby SOSs...</Text>
      </View>
    );
  }
  // */
  const fake = [
    {
      name: "Jake",
      age: 10,
    },
    {
      name: "Timothy",
      age: 8,
    },
  ];


  function encap() {

  }
  
  
  function Comp({ item, index }) {
    // for (var i = 0; i < distanceData.length; i++) {
      console.log("~~~~ " + index)
      // console.log(distanceData);
      console.log("\n-------<<>>>>>-------");
      // console.log(distanceData[index].data.rows[0].elements[0].distance.text)
      return (
        <NearbySOSCard
          fullName={item.full_name}
          // milesDistance={distanceData[index].data.rows[0].elements[0].distance.text}
          milesDistance={index}
          sosData={data[index]}
          currentUserLocation={location}
          />
          );
    
      }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 45, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
          Nearby SOS
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "300", color: "white" }}>
          People nearby, who need help
        </Text>
      </View>
      {/* <View style={{backgroundColor: 'blue', }}>
      </View> */}
      <FlatList
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        style={{ backgroundColor: "transparent" }}
        data={data}
        renderItem={Comp}
      />
      {/* <NearbySOSCard/> */}
      {/* <MainButton isValid onPress={() => console.log(distanceData)}>
        distanceData
      </MainButton>
      <MainButton isValid onPress={() => console.log(distanceData.length)}>
        Firebase data.length
      </MainButton> */}
      {/* <MainButton isValid onPress={() => console.log(location.latitude)}>
        Location Value
      </MainButton> */}
      {/* <MyComponent/> */}
      {/* <ShowText data="HiHi"/> */}
      {/* item.emergency_contacts[0].name */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: GlobalStyles.colors.darkModeBackground,
  },
});
