import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function SourceComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/targetComponent', { state: { message: "Hello from SourceComponent" } });
  }
  
  return (
    <button >Go to Target Component</button>
  );
}
export default SourceComponent;
