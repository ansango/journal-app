import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMXpAgOH-wCn_pgxPGZjPhq6HWPTAN0l8",
  authDomain: "react-journal-app-dfedf.firebaseapp.com",
  projectId: "react-journal-app-dfedf",
  storageBucket: "react-journal-app-dfedf.appspot.com",
  messagingSenderId: "715143290770",
  appId: "1:715143290770:web:ad92b52d87840a01f86b4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, googleAuthProvider };
