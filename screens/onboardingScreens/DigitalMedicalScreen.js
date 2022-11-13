import { View, Text, TextInput, StyleSheet } from "react-native";
import MainButton from "../../components/MainButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { GlobalStyles } from "../../constants/styles";
import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore"; 
import { auth, db } from "../../firebase";
import { useEffect } from "react";
/*
  Add tool-tip for some objective text inputs, to tell user why they should enter it
*/

/*
  Send data to firestore: 
    Create collection: UUID (name)
      Create document: "user_information"
*/


async function requestLocationAccess() {
  let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      try {
        status = null;
        // Alert.alert("Required", "Location access is neccesaary for the app to work", [{text: "Try again", onPress: () => requestLocationAccess() }])
        // requestLocationAccess();
        // let {newStatus} = await Location.requestForegroundPermissionsAsync();
      } catch(e) {
        console.log("error: " + e)
      }
      // return;
    } 
}

function DigitalMedicalScreen({ navigation }) {
  useEffect(() => {
    requestLocationAccess()
  }, [])
  
  const MedicalCardSchema = Yup.object().shape({
    homeAddress: Yup.string()
      .required()
      .min(3, "Your home address is required"),
    // dateOfBirth: Yup.string().email().required("An email is required"),
    allergies: Yup.string().required(),
    medicationsTaken: Yup.string(),
    primaryLanguages: Yup.string().required(
      "Your primary language is required."
    ),
  });
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, marginBottom: 10 }}>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          Create a Digital Medical Card
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            marginHorizontal: 20,
          }}
        >
          This will be used to provide quick help to you when an SOS is triggered
        </Text>
      </View>
      <Formik
        initialValues={{
          homeAddress: "",
          allergies: "",
          medicationsTaken: "",
          primaryLanguages: "",
        }}
        onSubmit={async (values) => {
          // /*
          // const userUUID = auth.currentUser.uid;
          // const userDisplayName = auth.currentUser.displayName;
          const medicalInfo = {
            homeAddress: values.homeAddress, 
            allergies: values.allergies, 
            medicationsTaken: values.medicationsTaken, 
            primaryLanguages: values.primaryLanguages, 
          }
          
          // await setDoc(doc(db, userUUID, "user_information"), {
          //   name: userDisplayName, 
          //   medical_info: medicalInfo,
          // })
          // */

          // console.log(values);
          navigation.push("EmergencyContactsScreen", {
            medical_info: medicalInfo
          })
          // onSignup(values.fullName, values.email, values.password, teamName, teamCode, !!teamIcon)
          // createUser(values.fullName, values.email, values.password);
          // console.log(values.fullName, values.email, values.password)
        }}
        validationSchema={MedicalCardSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={{
                flex: 1,
                backgroundColor: "#181a20",
                borderWidth: 3,
                width: "100%",
                borderRadius: 20,
                padding: 15,
              }}
            >
              {/* <TextInput placeholder="Home Address" placeholderTextColor="white" style={{ color: 'white', borderColor: 'white', borderWidth: 2, borderRadius: 7, padding: 6, alignItems: 'center'}}/> */}
              <TextField
                placeholder="Home Address"
                autoFocus={true}
                onChangeText={handleChange("homeAddress")}
                onBlur={handleBlur("homeAddress")}
                autoCorrect={false}
                textContentType="fullStreetAddress"
                value={values.homeAddress}
              />
              {/* <TextField placeholder="Date of Birth" /> */}
              <TextField
                placeholder="Allergies"
                onChangeText={handleChange("allergies")}
                onBlur={handleBlur("allergies")}
                autoCorrect={false}
                value={values.allergies}
              />
              <TextField
                placeholder="Medications Taken"
                onChangeText={handleChange("medicationsTaken")}
                onBlur={handleBlur("medicationsTaken")}
                autoCorrect={false}
                value={values.medicationsTaken}
              />
              <TextField
                placeholder="Primary Language(s) Spoken"
                onChangeText={handleChange("primaryLanguages")}
                onBlur={handleBlur("primaryLanguages")}
                autoCorrect={true}
                value={values.primaryLanguages}
              />
              <View style={{ alignItems: "center" }}>
                <MainButton
                  isValid={isValid}
                  style={[styles.nextButtonText(isValid), { fontSize: 21 }]}
                  overallStyle={styles.nextButton(isValid)}
                  // pressableStyle={styles.pressableStyle(isValid)}
                  // pressed={pressed}
                  onPress={handleSubmit}
                >
                  Next
                </MainButton>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
export default DigitalMedicalScreen;

export function TextField({
  placeholder,
  isAutoCapitalize,
  autoFocus,
  onChangeText,
  onBlur,
  autoCorrect,
  textContentType,
  width,
  placeholderTextColor
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="gray"
      style={{
        marginBottom: 20,
        color: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 7,
        width: width, 
        padding: 6,
        alignItems: "center",
      }}
      autoCapitalize={isAutoCapitalize}
      autoFocus={autoFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      autoCorrect={autoCorrect}
      textContentType={textContentType}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    // justifyContent: 'center'
  },
  nextButton: (isValid) => ({
    backgroundColor: isValid
      ? GlobalStyles.colors.buttonColor
      : GlobalStyles.colors.invalidButtonColor,
  }),

  nextButtonText: (isValid) => ({
    color: isValid ? "white" : GlobalStyles.colors.invalidTextColor,
  }),
});
