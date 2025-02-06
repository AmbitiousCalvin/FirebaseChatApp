import "../styles/home/home.scss";
import { useState, useEffect, memo } from "react";
import { auth } from "../firebase";
import { ChatBox } from "../components/ChatBox";
import { Button } from "../components/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle, usersRef } from "../firebase";
import { query, where, getDocs, addDoc } from "firebase/firestore";

function HomePage() {
  const [user] = useAuthState(auth);

  const addUserIfNotExists = async ({ userId, userData }) => {
    const q = query(usersRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("no user ike this one");
      await addDoc(usersRef, { uid: userId, ...userData });
    }
  };

  useEffect(() => {
    if (user) {
      addUserIfNotExists({
        userId: user.uid,
        userData: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
      });
    }
  }, [user]);

  return (
    <>
      {!user && <Button onClick={signInWithGoogle}>Sign in with Google</Button>}
      {user && <ChatBox />}
    </>
  );
}

export default HomePage;
