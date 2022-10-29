import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import MapView from "react-native-maps";
function NearbySOSCard({ fullName, milesDistance }) {
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
          John Miller {fullName}
        </Text>
      </View>
      {/* __ Profile Image + Full Name __ */}

      {/* --> SOS Stats <-- */}
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <Text style={{ color: "white", marginBottom: 9 }}>⏳1 hour ago</Text>
        <Text style={{ color: "white", marginBottom: 9 }}>
          📍2.6 mi away • 34 minutes to walk
        </Text>
      </View>
      {/* __ SOS Stats __ */}
      
      {/* --> MapView + See details button <-- */}
      <View style={{ alignItems: "center" }}>
        <Pressable onLongPress={() => console.log("****")} style={styles.mapView}>
          <MapView style={{ width: "100%", height: "100%" }} />
        </Pressable>
        <Pressable style={({pressed}) => pressed && {opacity: 0.75}}>
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
    width: "90%",
    borderRadius: 20,
    height: 465,
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
