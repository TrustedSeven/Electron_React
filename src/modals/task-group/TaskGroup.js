import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastSuccess } from "../../toaster";
import { TaskModalSiteLists } from "../../config/modal-config";
import {
  setTaskGroupModalState,
  fetchProxyGroupList,
} from "../../features/counterSlice";
import { AppButtonWithicon, AppInputField, AppSpacer } from "../../component";
import { addDataInTaskGroup } from "../../features/logic/task-reducer-logic";

function TaskGroup() {
  const [data, setData] = useState({
    taskGroupName: "",
    taskSite: "",
    taskProxy: "",
    taskProxyID: "",
    monitorProxy: "",
    monitorProxyID: "",
    monitorDelay: "2000",
    errorDelay: "2000",
    taskTable: {},
    totalTaskCheckout: 0,
    totalTaskDecline: 0,
    totalTaskCart: 0,
    proxyUsage: "0.0",
  });
  const dispatch = useDispatch();
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const [invalid, setInvalid] = useState("");

  const handleTaskGroupModal = () => {
    dispatch(setTaskGroupModalState());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const TaskDataValidation = () => {
    let valid = false;
    if (data.taskGroupName.length > 0) {
      valid = true;
    } else {
      valid = false;
      setInvalid("taskGroupName");
      return;
    }
    if (data.taskSite.length > 0) {
      valid = true;
    } else {
      valid = false;
      setInvalid("taskSite");
      return;
    }
    if (data.monitorProxy.length > 0) {
      valid = true;
    } else {
      valid = false;
      setInvalid("monitorProxy");
      return;
    }
    if (data.taskProxy.length > 0) {
      valid = true;
    } else {
      valid = false;
      setInvalid("taskProxy");
      return;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = TaskDataValidation();
    if (valid) {
      dispatch(addDataInTaskGroup(data));
      ToastSuccess(`Group created!`);
      handleTaskGroupModal();
    }
  };

  const handleMonitoProxySelect = (tempProxy) => {
    setData((pre) => {
      return {
        ...pre,
        monitorProxy: tempProxy.label,
        monitorProxyID: tempProxy.id,
      };
    });
  };

  const handleSiteSelect = ({ value }) => {
    setData((pre) => {
      return { ...pre, taskSite: value };
    });
  };

  const handleTaskProxy = (tempProxy) => {
    setData((pre) => {
      return { ...pre, taskProxy: tempProxy.label, taskProxyID: tempProxy.id };
    });
  };

  return (
    <div className="modal-container">
      <div className="modal-inner">
        <div className="modal-top">
          <h3>New Task Group</h3>
        </div>
        <AppSpacer space={50} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              placeholderText="Enter Task Group Name"
              fieldTitle="Task Group Name"
              onChange={handleChange}
              name="taskGroupName"
              invalid={invalid === "taskGroupName"}
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              isSelect={true}
              selectOptions={TaskModalSiteLists}
              placeholderText="Select Site"
              fieldTitle="Site"
              onChange={handleSiteSelect}
              invalid={invalid === "taskSite"}
            />
          </div>
        </div>
        <AppSpacer space={10} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              placeholderText="Select Proxy Group"
              fieldTitle="Task Proxy"
              onChange={handleTaskProxy}
              isSelect={true}
              selectOptions={proxyGroupList.map((group) => {
                let obj = {};
                obj["label"] = group["groupName"];
                obj["value"] = group["groupName"];
                obj["id"] = group["id"];
                return obj;
              })}
              invalid={invalid === "taskProxy"}
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              isSelect={true}
              placeholderText="Select Proxy Group"
              fieldTitle="Monitor Proxy"
              onChange={handleMonitoProxySelect}
              selectOptions={proxyGroupList.map((group) => {
                let obj = {};
                obj["label"] = group["groupName"];
                obj["value"] = group["groupName"];
                obj["id"] = group["id"];
                return obj;
              })}
              invalid={invalid === "monitorProxy"}
            />
          </div>
        </div>
        <AppSpacer space={10} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              placeholderText="2000"
              onChange={handleChange}
              name="monitorDelay"
              fieldTitle="Monitor Delays"
              type="number"
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              placeholderText="2000"
              onChange={handleChange}
              name="errorDelay"
              fieldTitle="Error Delay"
              type="number"
            />
          </div>
        </div>
        <AppSpacer space={30} />
        <div className="custom-profile-bottom">
          <div onClick={handleTaskGroupModal} className="modal-cancel-btn btn">
            <span>Cancel</span>
          </div>
          <div className="profile-address-same">
            <AppButtonWithicon
              onClick={handleSubmit}
              btnTitle="New Task Group"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskGroup;
