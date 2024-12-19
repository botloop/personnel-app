// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACjBJuF0HC1SwxPb7T2NB91A6hX0a7hfE",
    authDomain: "tracker-54139.firebaseapp.com",
    projectId: "tracker-54139",
    storageBucket: "tracker-54139.firebasestorage.app",
    messagingSenderId: "688238118813",
    appId: "1:688238118813:web:7bbcc9aba3d2806dde5174",
    measurementId: "G-8558WRNH2X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore
const db = getFirestore(app);

export { db };
