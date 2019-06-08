import React from "react";

export default function ErrorBox({ children: error, onClose }) {
  if (!error) {
    return null;
  }
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        color: "red",
        border: "1px solid",
        padding: 12
      }}
      onClick={onClose}
    >
      {error.message}
    </div>
  );
}
