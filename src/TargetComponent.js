import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function TargetComponent() {
  const location = useLocation();
  const message = location.state?.message || "No message passed";
  console.log('message:', message);
  return (
    <div>{message}</div>
  );
}

export default TargetComponent;
