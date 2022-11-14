import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function SOSMapDirections({ route }) {
  const directionsData = route.params.directionsData;
  console.log("********");
  console.log(directionsData);
  return (
    <View style={{flex: 1, justifyContent: 'center',  backgroundColor: GlobalStyles.colors.darkModeBackground}}>
      {/* <Text>{directionsData[0].distance.text}</Text> */}
      {/* <View> */}
      <View style={{alignItems: 'center', top: 70}}>

      <Text style={{color: 'white', fontSize: 24, fontWeight: '500'}}>Directions</Text>
      {/* <Text style={{color: 'white',}}>___________________________________________________</Text> */}
      </View>
      <FlatList
        style={{marginTop: 90, backgroundColor: GlobalStyles.colors.darkModeAccent, borderRadius: 10}}
        data={directionsData}
        renderItem={renderDirections}
      />
      {/* </View> */}
    </View>
  );


  function renderDirections({item, index}) {
    return (
      <View style={{padding: 20}}>
        <Text style={{color: 'white', fontSize: 20 }}>{directionsData[index].html_instructions.toString().replace("<b>", "").replace("<b>", "").replace("</b>", "").replace("</b>", "").replace(`<div style="font-size:0.9em">`, " ").replace("</div>", "")} </Text>
        <Text style={{color: "white", fontSize: 18, fontWeight: '800'}}> {directionsData[index].distance.text}</Text>
      <Text style={{color: 'white', fontSize:10, }}>________________________________________________________________</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({});
