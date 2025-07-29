import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjn2O_hSxuAdWrHkefG0Y72l61k8nu2F4",
  authDomain: "app-vestquest.firebaseapp.com",
  projectId: "app-vestquest",
  storageBucket: "app-vestquest.firebasestorage.app",
  messagingSenderId: "9320893736",
  appId: "1:9320893736:web:79c74cc2d8710c28f2541d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
