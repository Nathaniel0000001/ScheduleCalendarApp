// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq9dAcL9c5fKXDTxofD8E6lmgD1TSlzoM",
  authDomain: "schedulesite-fcbd7.firebaseapp.com",
  projectId: "schedulesite-fcbd7",
  storageBucket: "schedulesite-fcbd7.firebasestorage.app",
  messagingSenderId: "175526068079",
  appId: "1:175526068079:web:bb6b0fe3ce63f89e78729a",
  measurementId: "G-NN69Y6E70F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);