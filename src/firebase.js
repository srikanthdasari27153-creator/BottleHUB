import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMidj1C-YMBXoFHyOqJ-yxNlQF6o3spVc",
  authDomain: "bottlehub-8ceb0.firebaseapp.com",
  projectId: "bottlehub-8ceb0",
  storageBucket: "bottlehub-8ceb0.firebasestorage.app",
  messagingSenderId: "676829243736",
  appId: "1:676829243736:web:4e361425317ef6453b9d2d",
  measurementId: "G-29YZ6WXDWQ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// 👇 Add this
export const auth = getAuth(app);