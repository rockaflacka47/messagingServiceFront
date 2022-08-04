import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotification,
  setNotification,
} from "../../slices/notificationSlice";
import "./notification.css";
export function Notification(props) {
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();
  const [text, setText] = useState(props.value);
  let error = false;
  let visible = false;
  useEffect(() => {
    error = notification.error;
    visible = notification.visible;
    setText(notification.text);
  }, [notification]);

  const closeNotification = () => {
    dispatch(setNotification({ visible: false }));
  };
  const Banner = () => (
    console.log(props),
    (
      <div
        className={`notification-bubble ${
          props.error ? "red-background" : "green-background"
        } ${props.visible ? "" : "invisible"}`}
      >
        <p className="margin-left-10">{text}</p>
        <p
          onClick={() => closeNotification()}
          className="margin-right-10 pointer"
        >
          close
        </p>
      </div>
    )
  );
  return Banner();
}
