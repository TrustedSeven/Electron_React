import React from "react";
import "./task-right-top.css";
import more from "../../../assests/images/more.svg";
import trash from "../../../assests/images/trash.svg";
import upload from "../../../assests/images/upload.svg";
import { useDispatch } from "react-redux";
import { deleteTaskGroup } from "../../../features/logic/task-reducer-logic";
import { extractName } from "../../../config/modal-config";
import { ToastInfo, ToastWarning } from "../../../toaster";
import {
  setEditTaskGroupModal,
  setTempTaskGroupStorage,
} from "../../../features/counterSlice";

function TaskRightTop({ item = {} }) {
  const dispatch = useDispatch();

  const handleDeletedGroup = () => {
    if (item["type"] === "task-group") {
      dispatch(deleteTaskGroup(item));
      ToastInfo("1 Task group Deleted");
    } else ToastWarning("Select Task Group!");
  };

  const handleEditGroupName = () => {
    if (item["type"] === "task-group") {
      dispatch(setTempTaskGroupStorage(item));
      dispatch(setEditTaskGroupModal());
    } else {
      ToastWarning("Select Task Group!");
    }
  };

  return (
    <div className="task-right-top-container taskPage">
      <div className="task-right-top-left-container">
        {item?.type === "task-group" ? (
          <p>
            {extractName(item)} — {Object.keys(item?.taskTable || {}).length}{" "}
            Tasks
          </p>
        ) : (
          <p>No Group Selected</p>
        )}

        <div className="task-right-top-flex-container">
          <div className="task-right-top-left">
            <h2>{item.taskGroupName}</h2>
            <div
              onClick={handleEditGroupName}
              className="task-right-top-left-btn "
            >
              <img className="btn" src={more} alt="" />
            </div>
            <div
              onClick={handleDeletedGroup}
              className="task-right-top-left-btn"
            >
              <img className="btn" src={trash} alt="" />
            </div>
            <div className="task-right-top-left-btn">
              <img src={upload} alt="" className="btn" />
            </div>
          </div>
        </div>
      </div>
      <div className="task-right-top-right-container">
        <div className="task-right-top-right-container-child">
          <span>Proxy Usage</span>
          <div className="status">
            <span />
            <span className="proxy-usage">
              {parseFloat(item?.proxyUsage || "0.00").toFixed(2)} GB
            </span>
            <span className="used">Used</span>
          </div>
        </div>
        <div className="task-right-top-right-container-child">
          <span>Task Proxy </span>
          <div className="status">
            <span />
            <span>{item?.taskProxy}</span>
          </div>
        </div>
        <div className="task-right-top-right-container-child">
          <span>Monitor Proxy</span>
          <div className="status">
            <span />
            <span>{item?.monitorProxy}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskRightTop;
//  {/* <div className="task-right-top-right">
//           {/* <span>Proxy Usage</span>
//           <span></span>
//           <span>0.7 GB</span>
//           <span>Used</span> */}
//           </div>
