import { View, Text, StyleSheet, TextInput } from "react-native";

function CustomTextInput({ children, style, isAutoCapitalize, autoFocus, onChangeText, onBlur, value, autoCorrect, keyboardType, secureTextEntry, textContentType }) {
  var inputText = `${children}`;
  return (
    <View>
      <TextInput
        placeholder={inputText}
        placeholderTextColor="#717171"
        style={[styles.textInput, style]}
        autoCapitalize={isAutoCapitalize}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoCorrect={autoCorrect}
        textContentType={textContentType}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderColor: "transparent",
    backgroundColor: "#262A34",
    borderWidth: 2,
    borderRadius: 15,
    width: 300,
    height: 70,
    fontSize: 21,
    color: "white",
    padding: 22,
    // fontFamily: "SourceSansPro-Bold",
  },
});