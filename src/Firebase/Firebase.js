import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMUnogsGeC0UMAD5kMjsdAMe45hD93C7c",

  authDomain: "fyp-project-396a0.firebaseapp.com",

  databaseURL: "https://fyp-project-396a0-default-rtdb.firebaseio.com",

  projectId: "fyp-project-396a0",

  storageBucket: "fyp-project-396a0.appspot.com",

  messagingSenderId: "728459220050",

  appId: "1:728459220050:web:06a6bfa6115108ab4b7b8b",

  measurementId: "G-RVLD7WE2Z8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

export default app;
export { database };
