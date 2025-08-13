// src/services/userContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type UserContextType = {
  username: string;
  photoURL: string | null;
  setUsername: (name: string) => void;
  setPhotoURL: (url: string | null) => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Buscar dados do Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
          setPhotoURL(data.photoURL || null);
        }
      } else {
        setUsername("");
        setPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, photoURL, setPhotoURL }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);