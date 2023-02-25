import React from "react";
import "./switch.css";
function Switch({ id, ...props }) {
  return (
    <div className="app-switch-container">
      <input id={id} {...props} type="checkbox" />
      <label htmlFor={id}></label>
    </div>
  );
}

export default Switch;
