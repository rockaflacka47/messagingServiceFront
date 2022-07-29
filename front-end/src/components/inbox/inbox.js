import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../../slices/userSlice";
import ReactDOM from "react-dom";
import "./inbox.css";

import { Tile } from "./tile";
import { Conversation } from "../conversation/conversation";

export function Inbox() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [otherName, setOtherName] = useState(null);

  useEffect(() => {
    if (user.payload) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.payload.id, archived: false }),
      };
      fetch("http://localhost:3333/conversation/getConvos", requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setConversations(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [user]);

  let selectConvo = (conversation) => {
    setOtherName(
      conversation.user_one_name === user.payload.name
        ? conversation.user_two_name
        : conversation.user_one_name
    );
    setSelected(conversation);
  };

  let unsetSelected = () => {
    setSelected(null);
    setOtherName(null);
  };
  return (
    <div>
      <div className="inbox-format">
        {conversations.map((conversation) => (
          <div
            className="tile-format"
            key={conversation.id}
            onClick={() => selectConvo(conversation)}
          >
            <Tile value={conversation} />
          </div>
        ))}
      </div>
      {selected != null && (
        <div className="conversation-view">
          <div className="bar-styling display-inline justify-center">
            <h6
              className="margin-left-10 absolute"
              onClick={() => unsetSelected()}
            >
              Back
            </h6>
            <h6>{otherName}</h6>
          </div>
          <Conversation value={selected} />
        </div>
      )}
    </div>
  );
}
