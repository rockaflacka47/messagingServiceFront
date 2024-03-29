import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../../slices/notificationSlice";
import { setUser, selectUser } from "./../../slices/userSlice";
import { useCookies } from "react-cookie";
import "./login.css";
export function Login() {
  //const [cookies, setCookie] = useCookies(["user"]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const doLogin = (event) => {
    event.preventDefault();
    if (showLogin) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          password: password,
          number: number,
        }),
      };

      const FetchUser = async () => {
        const response = await fetch(
          "https://messagingservice.david-rocker.com/api/user/doLogin",
          //"https://127.0.0.1:3333/api/user/doLogin",
          //"http://localhost:3333/api/user/doLogin",
          requestOptions
        );
        const data = await response.json();

        if (data.result) {
          dispatch(setUser(data.result));
        } else if (data.message) {
          dispatch(
            setNotification({ text: data.message, error: true, visible: true })
          );
        }
      };

      FetchUser();
      // setCookie("Name", name, { path: "/" });
      // setCookie("Password", password, { path: "/" });
      // setCookie("User", user, { path: "/" });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          name: name,
          username: username,
        }),
      };

      const createUser = async () => {
        const response = await fetch(
          "https://messagingservice.david-rocker.com/api/user/createUser",
          requestOptions
        );
        const data = await response.json();
        dispatch(setUser(data.result));
      };

      createUser();
    }
  };
  return (
    <div>
      {showLogin && (
        <form className="height-100" onSubmit={(event) => doLogin(event)}>
          <div className="container">
            <div className="input-field-login">
              <input
                type="number"
                id="number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                placeholder="Number"
                className="input-box-login"
              />
            </div>
            <div className="input-field-login">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="input-box-login"
              />
            </div>

            <div className="width-100">
              <button type="submit" className="button">
                Login
              </button>
            </div>
            <div className="width-100">
              <p
                onClick={() => setShowLogin(!showLogin)}
                className="bottom-links"
              >
                Create an account
              </p>
            </div>
          </div>
        </form>
      )}
      {!showLogin && (
        <form className="height-100" onSubmit={(event) => doLogin(event)}>
          <div className="container">
            <div className="input-field-login">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full Name"
                className="input-box-login"
              />
            </div>
            <div className="input-field-login">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                className="input-box-login"
              />
            </div>
            <div className="input-field-login">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="input-box-login"
              />
            </div>

            <div className="width-100">
              <button type="submit" className="button">
                Create Account
              </button>
            </div>
            <div className="width-100">
              <p
                onClick={() => setShowLogin(!showLogin)}
                className="bottom-links"
              >
                Login
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
