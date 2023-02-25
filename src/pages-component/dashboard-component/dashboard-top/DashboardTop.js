import React from "react";
import "./dashboard.css";
import crown from "../../../assests/images/crown.png";
import camera from "../../../assests/images/camera.svg";
import { fetchSettingPageState } from "../../../features/counterSlice";
import { useSelector } from "react-redux";

function DashboardTop() {
  const settingState = useSelector(fetchSettingPageState);

  return (
    <div className="dashboard-top">
      <div>
        <img src={crown} alt="crown-icon" />
        <span className="text-400"> Welcome,</span>
        <span style={{ marginLeft: "10px" }} className="text-700">
          {settingState.user.userName}
        </span>
      </div>
      <div className="snapshot-btn button btn">
        <img src={camera} alt="camera-icon" />
        <span className="text-700">Snapshot</span>
      </div>
    </div>
  );
}

export default DashboardTop;
