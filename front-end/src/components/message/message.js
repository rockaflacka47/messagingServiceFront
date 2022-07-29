import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../../slices/userSlice";
import "./message.css";

export function Message(message) {
  const user = useSelector(selectUser);
  const sentByMe = message.value.user_id === user.payload.id;

  const Banner = () => (
    <div className={`flex ${!sentByMe ? "justify-right" : ""}`}>
      {sentByMe && (
        <div className="sent-by-me message">
          <p className="text">{message.value.body}</p>
        </div>
      )}
      {!sentByMe && (
        <div className="sent-by-him message">
          <p className="text">{message.value.body}</p>
        </div>
      )}
    </div>
  );
  return Banner();
}
