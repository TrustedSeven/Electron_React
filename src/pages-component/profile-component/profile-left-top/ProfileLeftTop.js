import React from "react";
import download from "../../../assests/images/download.svg";
function ProfileLeftTop() {
  return (
    <div>
      <div className="task-left-top-container">
        <h1 className="text-700">Profiles</h1>
        <div className="task-download-btn">
          <img src={download} className="btn" alt="download-icon" />
        </div>
      </div>
    </div>
  );
}

export default ProfileLeftTop;
