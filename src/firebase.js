// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqh2FrnQZn4gjMT0hel-P2LW_gHb4fft4",
  authDomain: "automatedbussystem.firebaseapp.com",
  projectId: "automatedbussystem",
  storageBucket: "automatedbussystem.appspot.com",
  messagingSenderId: "860728922124",
  appId: "1:860728922124:web:e6ae8d90d8e4af7e57de29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
