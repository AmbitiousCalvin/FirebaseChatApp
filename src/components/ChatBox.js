import "../styles/home/home.scss";
import { useState, useEffect, memo, useRef } from "react";
import { Button } from "../components/utils";
import { auth, messagesRef, logOut, usersRef } from "../firebase";
import SearchIcon from "@mui/icons-material/Search";
import {
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function ChatBox() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const msgQuery = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        console.log("Doc data:", doc.data());
        return { ...doc.data(), id: doc.id };
      });

      setUsersData(users);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("usersData log: ", usersData);
  }, [usersData]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const tempVariable = input;
      setInput("");
      await addDoc(messagesRef, {
        userName: user.displayName,
        userId: user.uid,
        content: tempVariable,
        profile: user.photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <div className="chat__header-content">
            <span className="chat__title">Header</span>
            <button className="btn-outline" onClick={logOut}>
              Log out
            </button>
            <div className="chat__user-data">User data</div>

            <form className="search-bar-container" onSubmit={handleSubmit}>
              <input
                type="text"
                className="search-bar"
                placeholder="Type your message..."
              />
              <div className="icon-btn">
                <SearchIcon />
              </div>
            </form>
          </div>
        </div>

        <div className="chat__header">
          <div className="chat__header-content">
            <ul>
              {usersData.map((user) => {
                return (
                  <li>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <img width="50" height="50" src={user.photoURL} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="chat__messages">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`chat__message ${
                item.userId === user.uid ? "right" : "left"
              }`}
            >
              <div
                className="chat__message-profile-container"
                style={{ "--user-name": `'${user.displayName.slice(0, 1)}'` }}
              >
                <img
                  className="profile"
                  src={item.profile}
                  width={20}
                  height={20}
                  alt="Profile"
                />
              </div>
              <div
                className={`chat__message-content-container ${
                  item.userId === user.uid ? "right" : "left"
                }`}
              >
                <span className="chat__message-user">{item.userName}</span>
                <p className="chat__message-content">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
        <span ref={scrollRef}></span>
      </div>
      <div className="chat-footer">
        <form
          className="search-bar-container send-msg-form"
          onSubmit={handleSubmit}
        >
          <input
            value={input}
            onInput={(e) => setInput(e.target.value)}
            type="text"
            className="search-bar"
            placeholder="Type your message..."
          />
          <button type="submit" className="btn btn-outline">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
