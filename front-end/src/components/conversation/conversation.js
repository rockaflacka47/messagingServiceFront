import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../../slices/userSlice";
import { io } from "socket.io-client";
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
  const [bottomScroll, setBottomScroll] = useState(false);
  const [height, setHeight] = useState(0);
  var element;

  const socket = io(":3331");
  socket.connect();
  let otherPerson;

  if (user.payload) {
    otherPerson =
      user.payload.id === conversation.value.user_one
        ? conversation.value.user_two
        : conversation.value.user_one;
  }

  useEffect(() => {
    setPageNum(0);
    setBottomScroll(false);
    setHeight(0);
    setMessages([]);

    setMessage("");
    setIsLoaded(false);
    setInitialLoad(true);

    return () => {};
  }, [conversation]);

  useEffect(() => {
    socket.on("connect", () => {
      //
    });
    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.message.user_id === otherPerson &&
        conversation.value.id === newMessage.message.conversation_id
      ) {
        setMessages((current) => [...current, newMessage.message]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("newMessage");
      //
    };
  }, []);
  useEffect(() => {
    if (initialLoad) {
      loadMessages();
    }
  }, [initialLoad]);

  const loadMessages = () => {
    //debugger;
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
            // element = document.getElementById("messages");
            // element.addEventListener("scroll", loadMore);
            // element.scrollTop = element.scrollHeight;
            setPageNum(result.nextPage);
            setIsLoaded(true);
            if (initialLoad) {
              setInitialLoad(false);
            }
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
    console.log(user.payload.id);
    console.log(otherPerson);
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
          setMessages((current) => [...current, result.message]);
          setMessage("");
        },

        (error) => {
          console.log(error);
          setError(error);
        }
      );
  };
  element = document.getElementById("messages");
  // height = element.scrollHeight;
  useEffect(() => {
    if (messages.length > 0) {
      console.log(element.scrollHeight);
      if (!bottomScroll) {
        element.addEventListener("scroll", loadMore);
        element.scrollTop = element.scrollHeight;
        setBottomScroll(true);
      }
      return () => {
        // Anything in here is fired on component unmount.
        element.removeEventListener("scroll", loadMore);
      };
    }
  }, [messages]);

  useEffect(() => {
    console.log("here");
    if (element && element.scrollHeight) {
      console.log("setting hehight");
      setHeight(element.scrollHeight);
    }
  }, [element]);

  function loadMore() {
    if (element.scrollTop === 0) {
      loadMessages();
      element.scrollTop = element.scrollHeight - height;
      setHeight(element.scrollHeight);
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
