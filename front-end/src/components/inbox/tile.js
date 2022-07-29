import React from "react";
import ReactDOM from "react-dom";

export function Tile(conversation) {
  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
  return (
    <div className="tile-interior">
      <h3>{conversation.value.user_one_name}</h3>
      <h5>{formatDate(conversation.value.updated_at)}</h5>
    </div>
  );
}
