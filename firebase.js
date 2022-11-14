// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyBsbDG19U6VvWs99_qt3n8QaVgFsQrTQN8",
  authDomain: "exploresafe-362903.firebaseapp.com",
  databaseURL: "https://exploresafe-362903-default-rtdb.firebaseio.com",
  projectId: "exploresafe-362903",
  storageBucket: "exploresafe-362903.appspot.com",
  messagingSenderId: "125867609988",
  appId: "1:125867609988:web:1ff6233ffde9b665e3d7d1",
  measurementId: "G-FFQWD6QP2E"
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyA6PzEio-duY1HdlVXwwG0RxMlBXXC38KM",
  authDomain: "exploresafe-362903.firebaseapp.com",
  databaseURL: "https://exploresafe-362903-default-rtdb.firebaseio.com",
  projectId: "exploresafe-362903",
  storageBucket: "exploresafe-362903.appspot.com",
  messagingSenderId: "125867609988",
  appId: "1:125867609988:web:1ff6233ffde9b665e3d7d1"
};


const MAPS_API_KEY = "AIzaSyBDO2f-cv6LyjYcfK0DDiIHrhyPJTBhEKo";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const RTdatabase = getDatabase();
const functions = getFunctions(app);
export {auth, db, RTdatabase, MAPS_API_KEY, functions}