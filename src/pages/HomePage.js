import "../styles/home/home.scss";
import { useState, useEffect, memo } from "react";
import { auth } from "../firebase";
import { ChatBox } from "../components/ChatBox";
import { Button } from "../components/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle } from "../firebase";

function HomePage() {
  const [user] = useAuthState(auth);

  return (
    <>
      {!user && <Button onClick={signInWithGoogle}>Sign in with Google</Button>}
      {user && <ChatBox />}
    </>
  );
}

export default HomePage;
