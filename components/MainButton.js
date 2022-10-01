import { Pressable, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../constants/styles";

function MainButton({ children, style, overallStyle, isValid, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && isValid ? styles.pressed : null]}
      onPress={onPress}
    >
      <View style={[styles.button, overallStyle]}>
        <Text style={[styles.buttonText, style]}>{children}</Text>
      </View>
    </Pressable>
  );
}
export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.buttonColor,
    borderRadius: 13,
    // padding: 20,
    width: 300,
    height: 59.4,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    // fontFamily: "SourceSansPro-Black",
  },
  pressed: {
    opacity: 0.75,
  },
});