import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3OZatZ912h24Q8iLFYcYpSbxYzr23MTE",
  authDomain: "test-41534.firebaseapp.com",
  databaseURL: "https://test-41534-default-rtdb.firebaseio.com",
  projectId: "test-41534",
  storageBucket: "test-41534.appspot.com",
  messagingSenderId: "746178614657",
  appId: "1:746178614657:web:ff1679c77b3eefe8bac480",
  measurementId: "G-2XPG8WXJJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
