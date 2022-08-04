import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "./../../slices/userSlice";
import "./bar.css";

import { Login } from "../login/login";
export function Bar() {
  const userFromStore = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (userFromStore.payload) {
      setLoggedIn(true);
      setShowForm(false);
    }
  }, [userFromStore]);

  const doLogout = () => {
    setLoggedIn(false);
    dispatch(setUser());
  };

  return (
    <div className="bar-styling inline-box">
      {loggedIn != false && userFromStore.payload && (
        <div className="inline-box justify-between">
          <div className="inline-box ">
            <h3 className="margin-left-10">{userFromStore.payload.name}</h3>
            <h3 className="margin-left-10">{userFromStore.payload.number}</h3>
          </div>
          <h3 className="margin-right-10 pointer" onClick={() => doLogout()}>
            Logout
          </h3>
        </div>
      )}
      {loggedIn === false && (
        <div className="inline-box">
          <h3
            className="margin-right-10"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Login
          </h3>
        </div>
      )}
      {showForm && (
        <div id="login-box" className="login-box pointer">
          <Login className="pointer" />
        </div>
      )}
    </div>
  );
}
