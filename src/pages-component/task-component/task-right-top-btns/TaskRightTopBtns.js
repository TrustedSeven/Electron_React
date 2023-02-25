import React, { useState } from "react";
import "./styles.css";
import {
  fetchTaskGroupListState,
  setTaskModalState,
  setTriggerModal,
} from "../../../features/counterSlice";
import { ToastWarning } from "../../../toaster";
import add from "../../../assests/images/add.svg";
import find from "../../../assests/images/find.svg";
import edit from "../../../assests/images/edit.svg";
import play from "../../../assests/images/play.svg";
import stop from "../../../assests/images/stop.svg";
import { useDispatch, useSelector } from "react-redux";
import { SameTaskModalForDifferentSites } from "../../../config/modal-config";

const {
  stopAllTasks,
  startAllTasks,
} = require("../../../helper/electron-bridge");

function TaskRightTopBtns({ item, handleTriggerSort }) {
  const list = useSelector(fetchTaskGroupListState);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  /**
   * function handle add task modal
   */
  const handleAddTask = () => {
    if (Object.keys(list)?.length > 0) {
      if (item["type"] === "task-group" && Object.keys(item).length > 0) {
        const { taskSite } = item;
        if (SameTaskModalForDifferentSites.includes(taskSite)) {
          dispatch(setTaskModalState("ssense"));
        } else if (taskSite === "amazon") {
          dispatch(setTaskModalState(taskSite));
        } else if (taskSite === "bestbuyca") {
          dispatch(setTaskModalState(taskSite));
        } else {
          dispatch(setTaskModalState("canadiancomputers"));
        }
      } else {
        ToastWarning("Select Task Group");
      }
    } else {
      ToastWarning("Create Some task Group");
    }
  };

  /**
   * function handle edit all task modal
   */
  const handleEditAllModal = () => {
    if (Object.keys(list)?.length > 0) {
      if (item["type"] === "task-group" && Object.keys(item).length > 0) {
        const { taskSite, taskTable } = item;
        if (Object.keys(taskTable)?.length > 0) {
          dispatch(setTriggerModal("edit-all-task-row"));
          if (SameTaskModalForDifferentSites.includes(taskSite)) {
            dispatch(setTaskModalState("ssense"));
          } else if (taskSite === "amazon") {
            dispatch(setTaskModalState(taskSite));
          } else if (taskSite === "bestbuyca") {
            dispatch(setTaskModalState(taskSite));
          } else {
            dispatch(setTaskModalState("canadiancomputers"));
          }
        } else ToastWarning("Create Some Task!");
      } else ToastWarning("Select Task Group");
    } else ToastWarning("Create Some task Group");
  };

  /**
   * function handle start, stop ,delete all
   * btn click event
   */
  const handleAll = (type) => {
    if (Object.keys(list)?.length > 0) {
      if (item["type"] === "task-group" && Object.keys(item).length > 0) {
        let tasks = [];
        for (let tempTask in item.taskTable) {
          tasks.push({
            ...item.taskTable[tempTask],
            taskGroupID: item.id,
          });
        }
        if (type === "play") startAllTasks(tasks);
        // Dispatch a task reducer function to change states to active
        else stopAllTasks(tasks);
      } else ToastWarning("Select Task Group");
    } else ToastWarning("Create Some task Group");
  };

  /**
   * function handle input change in search field
   */
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value);
    if (item["type"] === "task-group" && Object.keys(item).length > 0) {
      handleTriggerSort(value);
    } else ToastWarning("Select Task Group");
  };

  return (
    <div className="task-right-top-btns-wrapper">
      <div className="task-right-top-btns-left">
        <div
          onClick={handleAddTask}
          className="task-right-top-btn-container btn"
        >
          <img src={add} alt="" />
          <span>New Task</span>
        </div>
        <div className="task-right-top-search-container">
          <img src={find} alt="" />
          <input
            value={search}
            onChange={handleChange}
            type="search"
            required
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="task-right-top-btns-right">
        <div
          onClick={handleEditAllModal}
          className="task-right-top-btn-container edit btn"
        >
          <img src={edit} alt="" />
          <span>Edit All</span>
        </div>
        <div
          onClick={() => handleAll("play")}
          className="task-right-top-btn-container play btn"
        >
          <img src={play} alt="" />
          <span>Start All</span>
        </div>
        <div
          onClick={() => handleAll("stop")}
          className="task-right-top-btn-container stop btn"
        >
          <img src={stop} alt="" />
          <span>Stop All</span>
        </div>
      </div>
    </div>
  );
}

export default TaskRightTopBtns;
