import React, { useEffect, useState } from "react";
import { AppButtonWithicon, AppInputField, AppSpacer } from "../../component";
import "./styles.css";
import tick from "../../assests/images/wcheck.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProxyGroupList,
  fetchtempTaskStorageState,
  setEditTaskGroupModal,
} from "../../features/counterSlice";
import { updateTaskGroup } from "../../features/logic/task-reducer-logic";

function EditTaskGroup() {
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const item = useSelector(fetchtempTaskStorageState);
  const [editData, setEditData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (item["type"] === "task-group") {
      setEditData((pre) => {
        return { ...item };
      });
    }
  }, [item]);

  const handleTaskGroupModal = () => {
    dispatch(setEditTaskGroupModal());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleTaskProxy = (tempProxy) => {
    setEditData((pre) => {
      return {
        ...pre,
        taskProxy: tempProxy.label,
        taskProxyID: tempProxy.value,
      };
    });
  };

  const handleMonitoProxySelect = (tempProxy) => {
    setEditData((pre) => {
      return {
        ...pre,
        monitorProxy: tempProxy.label,
        monitorProxyID: tempProxy.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item["type"] === "task-group") {
      dispatch(updateTaskGroup(editData));
      handleTaskGroupModal();
    }
  };

  const getProxyValue = (key = "monitorProxyID") => {
    const selectedValue = proxyGroupList.filter(
      (proxy) => proxy["id"] === editData[key] || ""
    );
    if (selectedValue.length > 0) {
      return [
        {
          value: selectedValue[0]["id"],
          label: selectedValue[0]["groupName"],
        },
      ];
    } else {
      return [];
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-inner">
        <div className="modal-top">
          <h3>Edit Task Group</h3>
        </div>
        <AppSpacer space={40} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              fieldTitle="Task Group Name"
              placeholderText="Enter Task Group Name"
              name="taskGroupName"
              onChange={handleChange}
              value={editData?.taskGroupName}
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              isSelect={true}
              onChange={handleMonitoProxySelect}
              fieldTitle="Monitor Proxy"
              placeholderText="Select Proxy Group"
              selectOptions={proxyGroupList.map((group) => {
                let obj = {};
                obj["label"] = group["groupName"];
                obj["value"] = group["id"];
                return obj;
              })}
              value={getProxyValue()}
            />
          </div>
        </div>
        <AppSpacer space={20} />
        <div className="flex-row">
          <div className="flex-half">
            <div className="flex-row">
              <div className="flex-half monitor-proxy">
                <AppInputField
                  fieldTitle="Monitor Delay"
                  placeholderText="2000"
                  onChange={handleChange}
                  name="monitorDelay"
                  type="number"
                  value={editData?.monitorDelay}
                />
              </div>
              <div className="flex-half monitor-proxy margin-left">
                <AppInputField
                  fieldTitle="Error Delay"
                  placeholderText="2000"
                  onChange={handleChange}
                  name="errorDelay"
                  type="number"
                  value={editData?.errorDelay}
                />
              </div>
            </div>
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              fieldTitle="Task Proxy"
              onChange={handleTaskProxy}
              isSelect={true}
              placeholderText="Select Proxy Group"
              selectOptions={proxyGroupList.map((group) => {
                let obj = {};
                obj["label"] = group["groupName"];
                obj["value"] = group["id"];
                return obj;
              })}
              value={getProxyValue("taskProxyID")}
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
              image={tick}
              type="submit"
              btnTitle="Save Task Group"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskGroup;
