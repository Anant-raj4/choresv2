// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn9j58ItytfJ_IAAEkGWI3Tm2tj0DMRQc",
  authDomain: "chores4sale-384521.firebaseapp.com",
  projectId: "chores4sale-384521",
  storageBucket: "chores4sale-384521.appspot.com",
  messagingSenderId: "386716839775",
  appId: "1:386716839775:web:f8a6cf085308cf926ad0ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
