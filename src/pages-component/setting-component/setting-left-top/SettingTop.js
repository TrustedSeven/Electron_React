import React from "react";
import "./styles.css";
import upload from "../../../assests/images/upload.svg";
import download from "../../../assests/images/download.svg";
function SettingTop() {
  return (
    <div className="setting-top-container">
      <h1>Settings</h1>
      <div className="setting-top-btns-wrapper">
        <div className="setting-top-btn btn">
          <img src={download} alt="" />
          <span>Import All</span>
        </div>
        <div className="setting-top-btn btn">
          <img src={upload} alt="" />
          <span>Export All</span>
        </div>
      </div>
    </div>
  );
}

export default SettingTop;
