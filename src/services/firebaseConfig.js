// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjn2O_hSxuAdWrHkefG0Y72l61k8nu2F4",
  authDomain: "app-vestquest.firebaseapp.com",
  projectId: "app-vestquest",
  storageBucket: "app-vestquest.firebasestorage.app",
  messagingSenderId: "9320893736",
  appId: "1:9320893736:web:79c74cc2d8710c28f2541d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);