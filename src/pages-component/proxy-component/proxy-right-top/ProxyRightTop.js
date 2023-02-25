import React from "react";
import "./styles.css";
import {
  setProxyGroupModalState,
  setTriggerModal,
  fetchTaskGroupListState,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastInfo, ToastWarning } from "../../../toaster";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import upload from "../../../assests/images/upload.svg";
import { deleteProxyGroup } from "../../../features/logic/proxy-group-reducer-logic";

function ProxyRightTop({ data }) {
  const dispatch = useDispatch();
  const taskList = useSelector(fetchTaskGroupListState);

  const handledelete = () => {
    let valid = true;
    if (data["type"] === "proxy-group") {
      for (let i = 0; i < taskList.length; i++) {
        if (
          taskList[i]["monitorProxy"] === data["groupName"] ||
          taskList[i]["taskProxy"] === data["groupName"]
        ) {
          valid = false;
        }
      }
      if (valid) {
        dispatch(deleteProxyGroup(data));
        ToastInfo("1 Proxy group Deleted");
      } else ToastWarning("Proxy Group Is in Use!!");
    } else ToastWarning("Select Proxy Group");
  };
  const handleProxyGroupEdit = () => {
    if (data["type"] === "proxy-group") {
      dispatch(setTriggerModal("edit-proxy"));
      dispatch(setProxyGroupModalState());
    } else ToastWarning("Select Proxy Group");
  };

  return (
    <div className="task-right-top-container">
      <div className="task-right-top-stats">
        <p>{data?.list?.length} Proxies</p>
      </div>
      <div className="task-right-top-flex-container">
        <div className="task-right-top-left">
          <h2>{data?.groupName}</h2>
          <div onClick={handledelete} className="task-right-top-left-btn ">
            <img src={trash} className="btn" alt="" />
          </div>
          <div className="task-right-top-left-btn ">
            <img src={upload} className="btn" alt="" />
          </div>
        </div>
        <div className="task-right-top-right proxy">
          <div
            onClick={handleProxyGroupEdit}
            className="task-right-top-btn-container edit btn"
          >
            <img src={edit} alt="" />
            <span>Edit Group</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProxyRightTop;
