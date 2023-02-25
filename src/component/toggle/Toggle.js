import React from "react";
import "./toggle.css";
function Toggle({ id = 1, inputType = "checkbox", ...props }) {
  return (
    <div className={`toggle-wrapper ${inputType === "radio" && "circle"}`}>
      <input {...props} id={id} type={inputType} />
      <label htmlFor={id}></label>
    </div>
  );
}

export default Toggle;
