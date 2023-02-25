import React from "react";
import "./app-control-btn.css";
import close from "../../assests/images/close.svg";
import mini from "../../assests/images/minimize.svg";

function AppControlButton({ position = "absolute", onClose, onMinimize }) {
  return (
    <div style={{ position }} className="app-control-btn-wrapper">
      <img onClick={onMinimize} src={mini} alt="minimize-icon" />
      <img onClick={onClose} src={close} alt="close-icon" />
    </div>
  );
}

export default AppControlButton;
