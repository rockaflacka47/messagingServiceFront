import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "./../../slices/userSlice";
import "./bar.css";
export function Bar() {
  const userFromStore = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: "rocker1",
        number: "2",
      }),
    };

    const FetchUser = async () => {
      const response = await fetch(
        "http://localhost:3333/user/doLogin",
        requestOptions
      );
      const data = await response.json();

      dispatch(setUser(data.result));
      setLoggedIn(true);
    };

    FetchUser();
  }, []);

  return (
    <div className="bar-styling inline-box">
      {loggedIn != false && (
        <div className="inline-box justify-between">
          <div className="inline-box ">
            <h3 className="margin-left-10">{userFromStore.payload.name}</h3>
            <h3 className="margin-left-10">{userFromStore.payload.number}</h3>
          </div>
          <h3 className="margin-right-10">Logout</h3>
        </div>
      )}
      {loggedIn === false && (
        <div className="inline-box">
          <h3 className="margin-right-10">Login</h3>
        </div>
      )}
    </div>
  );
}
