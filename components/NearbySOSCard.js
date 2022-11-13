import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import MapView, { Marker } from "react-native-maps";
import { Timestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import MainButton from "./MainButton";
import MapViewDirections from "react-native-maps-directions";
import { auth, MAPS_API_KEY } from "../firebase";


function NearbySOSCard({
  fullName,
  milesDistance,
  walkingDistance,
  sosData,
  currentUserLocation,
}) {
  const navigation = useNavigation();
  const d = new Date();
  const personBlat = 35.40779918907085;
  const personBlng = -80.73986141026292;
  const soslat = sosData.user_location.latitude;
  const soslng = sosData.user_location.longitude;
  console.log("Hello:", currentUserLocation);
  // currentUserLocation.latitude
  const markerCoords = [
    {
      latitude: currentUserLocation.latitude,
      longitude: currentUserLocation.longitude,
    },
  ];
  console.log(markerCoords);

  return (
    <View style={styles.container}>
      {/* --> Profile Image + Full Name <-- */}
      <View style={styles.header}>
        <View style={{ marginRight: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 20 }}
            source={require("../assets/placeholderProfileImage.jpg")}
          />
        </View>
        <Text style={{ color: "white", fontSize: 22 }}>{fullName}</Text>
      </View>
      {/* __ Profile Image + Full Name __ */}

      {/* --> SOS Stats <-- */}
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <Text style={{ color: "white", marginBottom: 9 }}>⏳1 hour ago</Text>
        <Text style={{ color: "white", marginBottom: 9 }}>
          📍{milesDistance} away • {walkingDistance} to walk
        </Text>
      </View>
      {/* __ SOS Stats __ */}

      {/* --> MapView + See details button <-- */}
      <View style={{ alignItems: "center" }}>
        <Pressable
          onLongPress={() => console.log("****")}
          style={styles.mapView}
        >
          <MapView
            style={{ width: "100%", height: "100%" }}
            provider="google"
            mapType="hybrid"
            initialRegion={{
              latitude: currentUserLocation.latitude,
              longitude: currentUserLocation.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {markerCoords.map((marker, index) => (
              <Marker key={index} coordinate={marker} pinColor="#0000FF" />
            ))}
            <Marker
              coordinate={{
                latitude: sosData.user_location.latitude,
                longitude: sosData.user_location.longitude,
              }}
              pinColor="red"
            />
            {/* <MapViewDirections
              origin={markerCoords[0]}
              destination={{
                latitude: sosData.user_location.latitude,
                longitude: sosData.user_location.longitude,
              }}
              apikey={MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            /> */}
          </MapView>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.push("SOSDetailsScreen", {
              sosData: sosData,
              currentUserLocation: currentUserLocation
            })
          }
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
            <Text>See details</Text>
          </View>
        </Pressable>
        {/* <MainButton
          onPress={() => console.log(sosData.user_location.longitude)}
        >
          Here
        </MainButton> */}
      </View>
      {/* __ MapView + See details button __ */}
    </View>
  );
}
export default NearbySOSCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.darkModeAccent,
    // width: "90%",
    width: 345,
    borderRadius: 20,
    height: 465,
    // marginRight: 10,
    marginLeft: 10,
    // flex: 1
  },
  header: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  mapView: {
    marginBottom: 15,
    height: 234,
    borderRadius: 15,
    overflow: "hidden",
    width: "90%",
  },
});
