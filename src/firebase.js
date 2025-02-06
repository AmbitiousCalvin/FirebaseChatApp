import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANQg93zJcEPB5eo0iuMr2BPzx4rknZJn8",
  authDomain: "dashboard-chatapp.firebaseapp.com",
  projectId: "dashboard-chatapp",
  storageBucket: "dashboard-chatapp.firebasestorage.app",
  messagingSenderId: "838944666408",
  appId: "1:838944666408:web:eb09c53a983ac7745a561d",
  measurementId: "G-86SZBLM8L2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export const messagesRef = collection(db, "messages");

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
