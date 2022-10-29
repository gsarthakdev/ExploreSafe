import { Image, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function NearbySOSCard({ fullName }) {
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
      {/* --> Profile Image + Full Name <-- */}
    </View>
  );
}
export default NearbySOSCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.darkModeAccent,
    width: "90%",
    borderRadius: 20,
    height: 150,
  },
  header: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
});
