import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
function SOSDetailsScreen({ route }) {
  const sosData = route.params.sosData;
  console.log(sosData);
  return (
    <View style={styles.container}>
      {/* <Text>SOSDetailsScreen</Text> */}
      <View style={{marginTop: 45,  alignItems: 'center'}}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "white", }}>{sosData.full_name}'s Details</Text>
      </View>
      {/* <View> */}
      <ScrollView style={{marginTop: 45,}}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "white", marginLeft: 15, marginBottom: 10, }}><Ionicons name="medical" size={20} color="red" /> Medical ID</Text>
      <View style={{paddingTop: 20, padding: 15, backgroundColor: GlobalStyles.colors.darkModeAccent, width: "100%", height: 250, borderRadius: 15}}>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 5}}>Allergies:</Text>
        <Text style={{color: 'white', fontSize: 16}}>{sosData.medical_ID.allergies}</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 10}}>___________________________________</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 5}}>Medications Taken:</Text>
        <Text style={{color: 'white', fontSize: 16}}>{sosData.medical_ID.medicationsTaken}</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 10}}>___________________________________</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 5}}>Primary Language(s) Spoken:</Text>
        <Text style={{color: 'white', fontSize: 16}}>{sosData.medical_ID.primaryLanguages}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "500", color: "white", marginLeft: 15, marginTop: 20, marginBottom: 10}}><Ionicons name="md-people-sharp" size={24} color="orange" /> Emergency Contacts</Text>
      <View style={{paddingTop: 20, padding: 15, backgroundColor: GlobalStyles.colors.darkModeAccent, width: "100%", height: 200, borderRadius: 15}}>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 15}}>{sosData.emergency_contacts[0].name}</Text>
        <Text style={{color: 'white', fontSize: 16}}>{sosData.emergency_contacts[0].phone_number}</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 10}}>___________________________________</Text>
        <Text style={{color: '#98989f', fontSize: 16, marginBottom: 15}}>{sosData.emergency_contacts[1].name}</Text>
        {/* <Text style={{color: 'white', fontSize: 16}}>{sosData.emergency_contacts[1].phone_number}</Text> */}
        
      </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

export default SOSDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.darkModeBackground,
  },
});
