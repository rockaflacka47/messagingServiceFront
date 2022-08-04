import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../../slices/userSlice";
import { setNotification } from "../../slices/notificationSlice";
import "./conversation.css";

import { Message } from "../message/message";

export function Conversation(conversation) {
  const useForceRerendering = () => {
    const [counter, setCounter] = React.useState(0);
    return () => setCounter((counter) => counter + 1);
  };

  // add hook at beginning of a component:
  const forceRerendering = useForceRerendering();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const otherPerson =
    user.payload.id === conversation.value.user_one
      ? conversation.value.user_one
      : conversation.value.user_two;

  useForceRerendering();
  useEffect(() => {
    console.log("in");

    loadMessages();
    return () => {
      setPageNum(0);
    };
  }, [conversation]);

  const loadMessages = () => {
    if (pageNum !== -1) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convo_id: conversation.value.id,
          page: pageNum,
        }),
      };
      fetch("http://localhost:3333/message/getForConvoPage", requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            if (messages.length === 0) {
              setMessages(result.data);
            } else {
              setMessages((current) => [...result.data, ...current]);
            }
            setPageNum(result.nextPage);
            setIsLoaded(true);
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
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_one: user.payload.id,
        user_two: otherPerson,
        name: null,
        body: message,
      }),
    };
    fetch("http://localhost:3333/message/sendMessage", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setMessages((current) => [...current, result]);
          setMessage("");
          dispatch(
            setNotification({ text: "hello", error: true, visible: true })
          );
        },

        (error) => {
          console.log(error);
          setError(error);
        }
      );
  };

  var element = document.getElementById("messages");
  function updateScroll() {
    if (initialLoad) {
      element.scrollTop = element.scrollHeight;
      setInitialLoad(false);
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      element.addEventListener("scroll", loadMore);
      updateScroll();
      return () => {
        // Anything in here is fired on component unmount.
        element.removeEventListener("scroll", loadMore);
      };
    }
  }, [messages]);

  function loadMore() {
    if (element.scrollTop === 0) {
      loadMessages();
    }
  }

  return (
    <div className="viewport">
      <div className="view-message-box" id="messages">
        {messages.length > 0 &&
          messages.map((message) => (
            <Message value={message} key={message.id} />
          ))}
      </div>
      <div className="new-message-box">
        <textarea
          className="new-message"
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
        ></textarea>

        <button className="message-button" onClick={() => sendMessage()}>
          Send Message
        </button>
      </div>
    </div>
  );
}
