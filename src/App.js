import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Mail from "./Mail";
import MailList from "./MailList";
import SendMail from "./SendMail";
import Sidebar from "./Sidebar";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // user logged in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      }
    })
  }, [dispatch])

  return (
    <Router>

      {!user ? (
        <Login />
      ): (
        <div className="app">
          <Header />

          <div className="app__body">
            <Sidebar />

            <Routes>
              <Route path="/" exact element={<MailList />} />
              <Route path="mail" element={<Mail />} />
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
