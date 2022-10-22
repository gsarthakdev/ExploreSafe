import { FlatList, StyleSheet, Text, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { RTdatabase } from "../../firebase";
import { useEffect, useState } from "react";
import MainButton from "../../components/MainButton";

export default function SOSNearbyScreen() {
  console.log("Logged");

  // function getData() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const sosRef = ref(RTdatabase, "sos/");
    onValue(sosRef, (snapshot) => {
      setData([]);
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val();
        // console.log(data);
        setData((current) => [...current, data]);
      });
    });
  }, []);

  function MyComponent() {
    if (data.length == 0) {
      return (
        <Text>Nothing</Text>
      ) 
    } else {
      return (
        <Text>{data[0].full_name}</Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text>Nearby SOS Screen</Text>
      <MainButton isValid onPress={() => console.log(data)}>
        Press
      </MainButton>
      {/* <MyComponent/> */}
      <FlatList data={data} renderItem={({item}) => (<Text>{item.full_name}</Text>)}/>
      {/* <ShowText data="HiHi"/> */}
      {/* item.emergency_contacts[0].name */}
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
