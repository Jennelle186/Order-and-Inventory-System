import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

//Firebase SDK - this is the web app's configuration which can also be found in the Firebase project under its own project settings
const firebaseConfig = {
  apiKey: "AIzaSyB-AVjZIuPZA_T5QAl6RhUmnbT553VkPqE",
  authDomain: "lh-order-and-inventory.firebaseapp.com",
  projectId: "lh-order-and-inventory",
  storageBucket: "lh-order-and-inventory.appspot.com",
  messagingSenderId: "1014069435807",
  appId: "1:1014069435807:web:04390779a92d4e3a4fb1aa",
};

//Initializing Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const signInWithGoogle = new GoogleAuthProvider();
signInWithGoogle.setCustomParameters({ prompt: "select_account" });

//initializing if user is current user or not or a logged in user
export function useAuth() {
  const [isLoading, setIsLoading] = useState(true); // checking the user's status
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false); // finished checking
    });
    return unsub;
  }, []);

  return { currentUser, isLoading };
}
