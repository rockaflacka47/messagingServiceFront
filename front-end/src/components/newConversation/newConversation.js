import React, { useState } from "react";
import { selectUser } from "./../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./newConversation.css";
import { addConvo } from "../../slices/inboxSlice";
export function NewConversation() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [body, setBody] = useState("");
  const startConversation = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_one: user.payload.id,
        number: number,
        name: null,
        body: body,
      }),
    };
    fetch("http://localhost:3333/message/sendMessage", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          dispatch(addConvo(result.convo));
          //   setMessages((current) => [...current, result]);
          //   setMessage("");
        },

        (error) => {
          console.log(error);
          //   setError(error);
        }
      );

    setName("");
    setNumber("");
    setBody("");
  };
  return (
    <div className="height-100">
      <form
        className="height-100"
        onSubmit={(event) => startConversation(event)}
      >
        <div className="container">
          <div className="input-field">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="input-box"
            />
          </div>
          <div className="input-field">
            <input
              type="number"
              id="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="Number"
              className="input-box"
            />
          </div>
          <div className="message-area">
            <textarea
              id="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Type a message..."
              className="message-box"
            />
          </div>
          <div className="width-100">
            <button type="submit">Start Conversation</button>
          </div>
        </div>
      </form>
    </div>
  );
}
