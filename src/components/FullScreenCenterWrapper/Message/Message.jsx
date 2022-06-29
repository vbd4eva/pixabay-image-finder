import React from "react";
// import s from "./Message.module.css";

const style = {
  display: "block",
  width: "calc(100vw - 20%)",
  maxWidth: "100%",
  textAlign: "center",
  padding: "2em 0",
  margin: "auto",
};

function Message({ children }) {
  return <div style={style}>{children}</div>;
}

export default Message;
