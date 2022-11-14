import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, TextInput, Modal, Picker, Button, Linking, Alert } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { RTdatabase, db, auth } from "../../firebase";
import { ref, set } from "firebase/database";
import { GlobalStyles } from "../../constants/styles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';

const BACKGROUND_FETCH_TASK = 'update-firebase';

function ActiveRouteScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [currentPassiveSosTime, setcurrentPassiveSosTime] = useState();
    const [sosValue, setSosValue] = useState(0)
    const [sosUnit, setSosUnit] = useState(0)
    const [isRouteActive, setIsRouteActive] = useState(false)
    const [passiveSOS, setPassiveSOS] = useState(false)
    const [routeID, setRouteID] = useState(null)

    async function registerBackgroundFetchAsync() {
        console.log("Registered")
        return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 1, // 15 minutes
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    }

    // 3. (Optional) Unregister tasks by specifying the task name
    // This will cancel any future background fetch calls that match the given name
    // Note: This does NOT need to be in the global scope and CAN be used in your React components!
    async function unregisterBackgroundFetchAsync() {
        console.log("Unregistered")
        setIsRouteActive(false)
        return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    }



    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);

    React.useEffect(() => {
        checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
        setIsRouteActive(isRegistered)
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            console.log("Here")
            setIsRouteActive(false)
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        checkStatusAsync();
    };

    async function createRoute() {
        setModalVisible(false)

        const location = await Location.getCurrentPositionAsync();
        const user = auth.currentUser;
        const uid = user.uid;
        const user_name = user.displayName
        const date = new Date();
        const routeId = String(Date.now()) + uid;

        const docRef = doc(db, uid, "user_information");
        const docSnap = await getDoc(docRef);
        let contactArray = [];
        
        setRouteID(routeId)
        for (let contact in docSnap.data().emergency_contacts) {
            contactArray.push(docSnap.data().emergency_contacts[contact].phone_number)
        }

        set(ref(RTdatabase, 'routes/' + routeId), {
            route_id: routeId,
            contacts: contactArray,
            sos_message_sent: false,
            user_id: uid,
            user_name: user_name,
            expected_route: [{}],
            passive_sos_time: {"value":sosValue, "unit":sosUnit},
            waypoints: [{"lat":location.coords.latitude, "long":location.coords.longitude}],
            last_callback_time: { day: date.getUTCDate(), hour: date.getUTCHours(), minute: date.getUTCMinutes(), month: date.getUTCMonth(), year: date.getUTCFullYear() }
        });

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            active_sos_key: routeId
        });

        setIsRouteActive(true)
        registerBackgroundFetchAsync();
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Day", value: "Days" },
        { label: "Week", value: "Weeks" },
        { label: "Hour", value: "Hours" },
    ]);
    

    if (isRouteActive) {
        if (passiveSOS) {
            return (
                <View style={styles.container}>
                    <View style={styles.centeredView}>
                    <Text style={{color:"white", marginBottom:10}}>Select button below to trigger a passive SOS alert.</Text>
                    <Pressable
                        onPress={() => setPassiveSOS(true)}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                                marginBottom: 30
                            }}
                        >
                            <Text>Trigger Passive SOS</Text>
                        </View>
                    </Pressable>
    
                    <Text style={{color:"white", marginBottom:10, marginHorizontal:50, textAlign:"center"}}>Select button below to access web portal. The web portal shows what one of your contacts would see if an SOS was called.</Text>
                    <Pressable
                        onPress={() => Linking.openURL("https://exploresafe-362903.firebaseapp.com/" + routeID)}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                                marginBottom: 30
                            }}
                        >
                            <Text>Open Website</Text>
                        </View>
                    </Pressable>

                    <Text style={{color:"white", marginBottom:10, marginHorizontal:50, textAlign:"center"}}>Select button below to end the route.</Text>
                    <Pressable
                        onPress={unregisterBackgroundFetchAsync}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                                marginBottom: 30
                            }}
                        >
                            <Text>Stop Route</Text>
                        </View>
                    </Pressable>
                    </View>

                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.centeredView}>
                    <Text style={{color:"white", marginBottom:10}}>Select button below to trigger a passive SOS alert.</Text>
                    <Pressable
                        onPress={() => setPassiveSOS(true)}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                                marginBottom: 30
                            }}
                        >
                            <Text>Trigger Passive SOS</Text>
                        </View>
                    </Pressable>
    

                    <Text style={{color:"white", marginBottom:10, marginHorizontal:50, textAlign:"center"}}>Select button below to end the route.</Text>
                    <Pressable
                        onPress={unregisterBackgroundFetchAsync}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                                marginBottom: 30
                            }}
                        >
                            <Text>Stop Route</Text>
                        </View>
                    </Pressable>
                    </View>

                </View>

            )
        }

    } else {
        return (
            <View style={styles.container}>
                <View style={styles.centeredView}>
                <View style={{ marginTop: 45, alignItems: "center", marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
                        Routes
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "300", color: "white", marginBottom: 20 }}>
                        You have not started an active route. To start a route, select the start button below.
                    </Text>
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={({ pressed }) => pressed && { opacity: 0.75 }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                backgroundColor: "white",
                                width: 200,
                                padding: 10,
                                borderRadius: 7,
                            }}
                        >
                            <Text>Start Route</Text>
                        </View>
                    </Pressable>
                </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={[styles.modalText, {fontSize:20}]}>Set Passive SOS Delay</Text>
                                <Text style={styles.modalText}>Set the amount of time until ExploreSafe automaticly sends a message to your contacts.</Text>
                                <View style={{flexDirection:'row', marginVertical:14}}>
                                <TextInput style={{backgroundColor:"black", borderRadius: 14, marginHorizontal:20, padding:10, color:"white", align:"center"}} placeholder="#" placeholderTextColor={"grey"} textAlign="center" onChangeText={setSosValue}></TextInput>
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    onChangeValue={setSosUnit}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    theme="DARK"
                                    placeholder="Select Units"
                                    style={{
                                        borderRadius: 14,
                                    }}
                                    containerStyle={{
                                        width: "40%",
                                    }}
                                    placeholderStyle={{
                                        // color: 'white'
                                    }}
                                    arrowIconStyle={{
                                        tintColor: 'white'
                                    }}
                                // searchable={true}
                                />
                                </View>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={createRoute}>
                                    <Text style={styles.textStyle}>Start Route</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
                {/* <View style={{backgroundColor: 'blue', }}>
            </View> */}
                {/* <NearbySOSCard/> */}
                {/* <MainButton isValid onPress={() => console.log(distanceData)}>
              distanceData
            </MainButton>
            <MainButton isValid onPress={() => console.log(distanceData.length)}>
              Firebase data.length
            </MainButton> */}
                {/* <MainButton isValid onPress={() => console.log(location.latitude)}>
              Location Value
            </MainButton> */}
                {/* <MyComponent/> */}
                {/* <ShowText data="HiHi"/> */}
                {/* item.emergency_contacts[0].name */}
            </View>
        );
    }
}

export default ActiveRouteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.darkModeBackground,
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#708090',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#FFFFFF',
    },
    buttonClose: {
        backgroundColor: '#000000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 14,
        color: "white"
    },
});
