// src/services/userContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  username: string;
  photoURL: string | null;
  setUsername: (name: string) => void;
  setPhotoURL: (url: string | null) => void;
  uid: string | null;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  // Carrega dados do AsyncStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedUid = await AsyncStorage.getItem("userUid");
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPhoto = await AsyncStorage.getItem("photoURL");

      if (storedUid) setUid(storedUid);
      if (storedUsername) setUsername(storedUsername);
      if (storedPhoto) setPhotoURL(storedPhoto);
    };

    loadUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        await AsyncStorage.setItem("userUid", user.uid);

        // Busca no Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
          setPhotoURL(data.photoURL || null);

          await AsyncStorage.setItem("username", data.username || "");
          await AsyncStorage.setItem("photoURL", data.photoURL || "");
        }
      } else {
        setUid(null);
        setUsername("");
        setPhotoURL(null);

        await AsyncStorage.removeItem("userUid");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("photoURL");
      }
    });

    return () => unsubscribe();
  }, []);

  // Atualizações automáticas no AsyncStorage
  useEffect(() => {
    if (uid) AsyncStorage.setItem("username", username);
  }, [username, uid]);

  useEffect(() => {
    if (uid) AsyncStorage.setItem("photoURL", photoURL || "");
  }, [photoURL, uid]);

  return (
    <UserContext.Provider value={{ username, setUsername, photoURL, setPhotoURL, uid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
