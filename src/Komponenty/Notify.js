import React from "react";

const Notify = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notify;