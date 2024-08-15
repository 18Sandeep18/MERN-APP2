// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-app-2.firebaseapp.com",
  projectId: "mern-app-2",
  storageBucket: "mern-app-2.appspot.com",
  messagingSenderId: "188094754849",
  appId: "1:188094754849:web:7c1b1ce7caa775648ff360",
  measurementId: "G-LYWLYTD5TB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
