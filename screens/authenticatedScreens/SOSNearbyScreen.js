import { StyleSheet, Text, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { RTdatabase } from "../../firebase";
import { useEffect, useState } from "react";
import MainButton from "../../components/MainButton";

export default function SOSNearbyScreen() {
  console.log("Logged");

  function CardComp({ name }) {
    return (
      <View
        style={{ justifyContent: "flex-end", alignItems: "center", flex: 1 }}
      >
        <Text>{name}</Text>
        <Text>Hello</Text>
      </View>
    );
  }

  // function Test() {
  // const [data, setData] = useState([])
  // useEffect(() => {

  function ShowText({ data }) {
    // const here = data;
    return (
      <View>
        <Text>{data}</Text>
      </View>
    );
  }

  // function getData() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const sosRef = ref(RTdatabase, "sos/");
    onValue(sosRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val();
        console.log(data);
        setValue((current) => current + 1)
        // console.log("inside forEach: " + value)
        // return (
        //   data.map((item) => <Text>{item}</Text>)
        // );

        return (<Text>Hello</Text>)
        
        setData((current) => [childSnapshot.val(), ...current]); 
        //2 fresh values
        //next iteration: 2 fresh + 1 old that isn't updated
        
      });
    });
  }, []);
  // }

  // }, []);
  // }
     // setData((current) => {
        //   return [...current, data];
        // });
  function sup() {
    return <ShowText data="Corsair" />;
  }

  return (
    <View style={styles.container}>
      <Text>Nearby SOS Screen</Text>
      <MainButton isValid onPress={() => console.log("From Button: " + value)}>
        Press
      </MainButton>
      {/* <Text>{data[0].emergency_contacts[0].name}</Text> */}
      {/* <ShowText data="HiHi"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
