import React, { useEffect, useState } from "react";
import "./styles.css";
import download from "../../../assests/images/download.svg";
import { fetchTaskGroupListState } from "../../../features/counterSlice";
import { useSelector } from "react-redux";

function TaskDataUsage() {
  const [usage, setUsage] = useState("2.8");
  const taskGroupObj = useSelector(fetchTaskGroupListState);

  useEffect(() => {
    let proxyUsage = 0.0;
    Object.keys(taskGroupObj).forEach((taskGroup) => {
      let singleTaskgroup = { ...taskGroupObj[taskGroup] };
      let parseProxyUsage = parseFloat(singleTaskgroup["proxyUsage"]);
      proxyUsage += parseProxyUsage;
    });
    setUsage(proxyUsage.toFixed(2));
  }, [taskGroupObj]);

  return (
    <div className="task-data-usage-wrapper">
      <div className="task-left-top-container">
        <h1 className="text-700">Tasks</h1>
        <div className="task-download-btn">
          <img src={download} className="btn" alt="download-icon" />
        </div>
      </div>
      <div className="task-data-usage-container">
        <h2 className="text-700">Total Proxy Usage</h2>
        <div className="task-usage-stats">
          <span></span>
          <span className="text-700">{usage} GB</span>
          <span className="text-500">Used</span>
        </div>
      </div>
      <div className="task-container-divider" />
    </div>
  );
}

export default TaskDataUsage;
