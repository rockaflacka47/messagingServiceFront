import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

export function Tile(conversation) {
  const user = useSelector(selectUser);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (user.payload.name === conversation.value.user_one_name) {
      setDisplayName(conversation.value.user_two_name);
    } else {
      setDisplayName(conversation.value.user_one_name);
    }
  }, []);

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

  return (
    <div className="tile-interior">
      <h3>{displayName}</h3>
      <h5>{formatDate(conversation.value.updated_at)}</h5>
    </div>
  );
}
