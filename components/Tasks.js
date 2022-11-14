import { RTdatabase, db, auth } from "../firebase";
import { ref, set, get, child, update } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';

function defineTasks() {
    const BACKGROUND_FETCH_TASK = 'update-firebase';
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

        const user = auth.currentUser;
        const uid = user.uid;
        const location = await Location.getCurrentPositionAsync();
        const docRef = doc(db, uid, "user_information");
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().active_sos_key)

        get(child(ref(RTdatabase), `routes/` + docSnap.data().active_sos_key + "/waypoints/")).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let waypointArray = snapshot.val();
              waypointArray.push({"lat":location.coords.latitude, "long":location.coords.longitude});
              update(ref(RTdatabase, 'routes/' + docSnap.data().active_sos_key), {
                waypoints: waypointArray,
            });
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

        // Be sure to return the successful result type!
        return BackgroundFetch.BackgroundFetchResult.NewData;
    });
}

export default defineTasks;