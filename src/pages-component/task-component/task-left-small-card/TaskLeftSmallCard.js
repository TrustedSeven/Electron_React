import React from "react";
import "./styles.css";
import {
  setSelectItem,
  setSelectedItemList,
  fetchTaskGroupListState,
} from "../../../features/counterSlice";
import { AppSpacer } from "../../../component";
import check from "../../../assests/images/check.svg";
import minus from "../../../assests/images/minus.svg";
import error from "../../../assests/images/error.svg";
import { useSelector, useDispatch } from "react-redux";
import { extractName } from "../../../config/modal-config";
import { selectedTaskGroup } from "../../../helper/electron-bridge";

function TaskLeftSmallCard({ item }) {
  const obj = useSelector(fetchTaskGroupListState);
  const dispatch = useDispatch();

  const handleTaskSelect = (task) => {
    selectedTaskGroup(task);
    dispatch(setSelectItem(task));
    dispatch(setSelectedItemList([]));
  };

  return (
    <div className="task-small-card-scroll-container">
      {Object.keys(obj).map((key, i) => (
        <div
          onClick={() => handleTaskSelect({ ...obj[key], type: "task-group" })}
          key={`task-small-card-${key || i}`}
          className={`task-small-card-container ${
            key === item.id && "active-task-card"
          }`}
        >
          <div className="task-small-card-top">
            <h3 className="text-700">{obj[key].taskGroupName}</h3>
            <div
              className={`task-small-card-counter ${
                key === item.id && "active"
              }`}
            >
              <span className="text-700">
                {Object.keys(obj[key]?.taskTable).length || 0}
              </span>
            </div>
          </div>
          <p className="text-600">{extractName(obj[key])}</p>
          <AppSpacer space={5} />
          <div className="task-small-card-btn-wrapper">
            <div className="task-small-card-btn ">
              <img src={check} alt="" />
              <span>{obj[key]["totalTaskCheckout"]}</span>
            </div>
            <div className="task-small-card-btn">
              <img src={minus} alt="" />
              <span>{obj[key]["totalTaskCart"]}</span>
            </div>
            <div className="task-small-card-btn">
              <img src={error} alt="" />
              <span>{obj[key]["totalTaskDecline"]}</span>
            </div>
          </div>
          <AppSpacer space={5} />
          <p className="task-schedule-status">Scheduled start at 8:58AM</p>
          <div className="task-dot-status" />
        </div>
      ))}
    </div>
  );
}

export default TaskLeftSmallCard;
