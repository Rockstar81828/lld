import React from "react";

const Toast = ({ message, type, deleteToast, id, horizontal }) => {
  return (
    <>
      <div className={`toast-box ${type.toLowerCase()}`}>
        <span>{message}</span>
        <span onClick={() => deleteToast(id)} className="close">
          x
        </span>
      </div>
    </>
  );
};

export default Toast;
