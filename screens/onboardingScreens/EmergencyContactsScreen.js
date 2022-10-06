import {View, Text, StyleSheet, TextInput} from "react-native"
import { TextField } from "./DigitalMedicalScreen";

/*
  Fields needed: 
  Contact name: email, password
*/

function EmergencyContactsScreen() {
  return (
    <View style={styles.container}>
       <View style={{ marginTop: 50, marginBottom: 50 }}>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Almost Done! Add your emergency contacts.
        </Text>
          <TextField placeholder="Name"/>
          <View style={{alignItems: 'flex-end'}}>
            <TextField placeholder="✉️ Email" width={330}/>
            <TextField placeholder="📞 Phone" width={330}/>
          </View>
          <TextField placeholder="Name"/>
          <View style={{alignItems: 'flex-end'}}>
          <TextField placeholder="✉️ Email" width={330}/>
          <TextField placeholder="📞 Phone" width={330}/>
          </View>

        </View>
    </View>
  );
}

export default EmergencyContactsScreen; 

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: "#000000",
    alignItems: "center",
  }
})