import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';
import MainButton from '../../../components/MainButton';
import * as Location from 'expo-location';

export default function AskLocationScreen() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    requestLocationAccess();
    
  }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  
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

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });
      setLocation(location);
  }

  return (
    <View>
      <Text>AskLocationScreen</Text>
      <MainButton isValid onPress={() => console.log(location)}>
        Get location coords
      </MainButton>
    </View>
  )
}

const styles = StyleSheet.create({})