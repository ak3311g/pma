// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUimLlQ9kpeLXZv5oT7N8jPef9eXruHrc",
  authDomain: "project-mgmnt-app.firebaseapp.com",
  projectId: "project-mgmnt-app",
  storageBucket: "project-mgmnt-app.appspot.com",
  messagingSenderId: "810086541736",
  appId: "1:810086541736:web:d5f7df3fbd7c67f00ad59d",
  measurementId: "G-V0RPS6LV9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

export { auth, provider, db };