import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import MapView from "react-native-maps";
import { Timestamp } from "firebase/firestore";
import {useNavigation} from "@react-navigation/native"

function NearbySOSCard({ fullName, milesDistance, walkingDistance, sosIndex }) {
  const navigation = useNavigation();
  const d = new Date();
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
        <Text style={{ color: "white", fontSize: 22 }}>
          {fullName}
        </Text>
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
        <Pressable onLongPress={() => console.log("****")} style={styles.mapView}>
          <MapView style={{ width: "100%", height: "100%" }} provider="google" />
        </Pressable>
        <Pressable onPress={() => navigation.push("SOSDetailsScreen", {
          sosData: sosIndex
        })} style={({pressed}) => pressed && {opacity: 0.75}}>
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
    marginLeft: 10
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
