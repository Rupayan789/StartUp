import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "employeemanagement-dd7a0.firebaseapp.com",
  databaseURL: "https://employeemanagement-dd7a0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "employeemanagement-dd7a0",
  storageBucket: "employeemanagement-dd7a0.appspot.com",
  messagingSenderId: "195556458947",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const fireDB = initializeApp(firebaseConfig);

// Get a reference to the database service
export const databaseRef = ref(getDatabase(fireDB));


