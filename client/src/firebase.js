// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Meta } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1e34f.firebaseapp.com",
  projectId: "mern-auth-1e34f",
  storageBucket: "mern-auth-1e34f.firebasestorage.app",
  messagingSenderId: "899403666382",
  appId: "1:899403666382:web:8b9e65f068491fed83119f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
