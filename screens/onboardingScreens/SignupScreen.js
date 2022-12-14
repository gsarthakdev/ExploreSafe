import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../components/MainButton";
import CustomTextInput from "../../components/CustomTextInput";
import { GlobalStyles } from "../../constants/styles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, } from "firebase/firestore"; 


function SignupScreen({ navigation, route }) {
  const emergencyContacts = route.params.emergencyContacts;
  const medicalInfo = route.params.medicalInfo;
  const SignupFormSchema = Yup.object().shape({
    fullName: Yup.string().required().min(2, "Your full name is required"),
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password must be at least 8 characters"),
  });
  return (
    <View style={styles.container}>
      {/* <Pressable onPress={Keyboard.dismiss}> */}
        <View>
          <View style={{ marginTop: 55, marginHorizontal: 68 }}>
            <Text style={styles.headingText}>Sign Up</Text>
          </View>
          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            onSubmit={async (values) => {
              // console.log(values);
              // /*
              await createUserWithEmailAndPassword(auth, values.email, values.password)
              .then( async (userCredential) => {
                console.log("Firebase Signup Successful!");
                await updateProfile(auth.currentUser, {displayName: values.fullName})
                .then(async () => {
                  const user = auth.currentUser;
                  console.log("🔥Firebase Update Successful! ✅", user.email, user.displayName);
                  const userUID = auth.currentUser.uid;
                  const userDisplayName = auth.currentUser.displayName;
                  await setDoc(doc(db, userUID, "user_information"), {
                    name: userDisplayName, 
                    medical_info: medicalInfo,
                    emergency_contacts: emergencyContacts
                  })
                })
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);
              })
              // */
              
              
            }}
            validationSchema={SignupFormSchema}
            validateOnMount={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
              <>
                <View style={styles.inputAndButtonContainer}>
                  <View style={styles.padding}>
                    <CustomTextInput
                      autoFocus={true}
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      autoCorrect={false}
                      value={values.fullName}
                      style={{
                        borderColor:
                          values.fullName.length < 1 ||
                          values.fullName.length >= 2
                            ? "transparent"
                            : "red",
                      }}
                    >
                      Full name
                    </CustomTextInput>
                  </View>

                  <View style={styles.padding}>
                    <CustomTextInput
                      autoFocus={false}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      autoCorrect={false}
                      isAutoCapitalize="none"
                      keyboardType="email-address"
                      value={values.email}
                      style={{
                        borderColor:
                          values.email.length < 1 || values.email.length >= 2
                            ? "transparent"
                            : "red",
                      }}
                    >
                      Email
                    </CustomTextInput>
                  </View>
                  <View style={styles.padding}>
                    <CustomTextInput
                      autoFocus={false}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      autoCorrect={false}
                      secureTextEntry={true}
                      textContentType="password"
                      isAutoCapitalize="none"
                      value={values.password}
                      style={{
                        borderColor:
                          values.password.length < 1 ||
                          values.password.length >= 6
                            ? "transparent"
                            : "red",
                      }}
                    >
                      Password (At least 6 characters)
                    </CustomTextInput>
                  </View>
                  <View style={styles.padding}>
                    <MainButton
                      style={[styles.nextButtonText(isValid), { fontSize: 21 }]}
                      overallStyle={styles.nextButton(isValid)}
                      // pressableStyle={styles.pressableStyle(isValid)}
                      // pressed={pressed}
                      onPress={handleSubmit}
                      isValid={isValid}
                    >
                      Next
                    </MainButton>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      {/* </Pressable> */}
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  nextButton: (isValid) => ({
    backgroundColor: isValid
      ? GlobalStyles.colors.buttonColor
      : GlobalStyles.colors.invalidButtonColor,
  }),

  nextButtonText: (isValid) => ({
    color: isValid ? "white" : GlobalStyles.colors.invalidTextColor,
  }),

  // pressableStyle: ({pressed}, isValid) => ({
  //   opacity: isValid && pressed ? 0.75 : null
  // }),

  container: {
    flex: 1,
    backgroundColor: "#0c1323",
    alignItems: "center",
  },
  headingText: {
    color: "white",
    fontSize: 45,
    textAlign: "center",
    fontWeight: '600'
  },
  inputAndButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignContent: 'center',
    alignItems: "center",
    marginBottom: 270,
  },
  padding: {
    padding: 10,
  },
});
