// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_usnJBYrYRgYx5Kf3-3TzD3ydG04zU5g",
  authDomain: "vestquestapp.firebaseapp.com",
  projectId: "vestquestapp",
  storageBucket: "vestquestapp.firebasestorage.app",
  messagingSenderId: "1037377114876",
  appId: "1:1037377114876:web:ada2ceb931658c3a6f3d79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);