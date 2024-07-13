// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxJlTiWkPrSbQHXuONCMMzFdd0qubxltw",
  authDomain: "promanagement-app.firebaseapp.com",
  projectId: "promanagement-app",
  storageBucket: "promanagement-app.appspot.com",
  messagingSenderId: "1053629501825",
  appId: "1:1053629501825:web:c9c43f8170749135e51880",
  measurementId: "G-H74MJZ5P4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

export { auth, provider, db };