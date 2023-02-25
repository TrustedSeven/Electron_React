import React, { useState } from "react";
import {
  AppSpacer,
  AppToggleBar,
  AppInputField,
  AppButtonWithicon,
} from "../../../component";
import {
  setTempStorage,
  setTriggerModal,
  fetchProfileList,
  fetchSelectedItem,
  setTaskModalState,
  fetchEditModalState,
  fetchTempStorageState,
} from "../../../features/counterSlice";
import {
  editAllTask,
  addTaskInGroup,
  editSingleTaskRow,
} from "../../../features/logic/task-reducer-logic";
import wadd from "../../../assests/images/add.svg";
import add from "../../../assests/images/badd.svg";
import check from "../../../assests/images/wcheck.svg";
import { useDispatch, useSelector } from "react-redux";
import minimize from "../../../assests/images/bminimize.svg";
import { ToastSuccess, ToastWarning } from "../../../toaster";
import {
  dateValid,
  extractName,
  getSingleProfileValue,
  profileSelectionList,
  TaskModeOptions,
} from "../../../config/modal-config";

const EDIT_STATE = ["edit-all-task-row", "edit-task-row"];

function BestBuyModal() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const item = useSelector(fetchSelectedItem);
  const state = useSelector(fetchEditModalState);
  const profileList = useSelector(fetchProfileList);
  const tempStorage = useSelector(fetchTempStorageState);
  const [task, setTask] = useState({
    site: extractName(item),
    keyword: "",
    profile: "",
    mode: "",
    scheduleStart: "",
    scheduleStop: "",
    status: "Idle",
    size: "O/S",
    phoneNumber: "",
    filterID: "",
    maxRange: "",
    isScheduleStart: false,
    isScheduleStop: false,
    active: false,
    profileType: "",
    profileID: "",
    profileName: "",
  });

  React.useEffect(() => {
    if (state === "edit-task-row") {
      setTask((pre) => {
        return { ...tempStorage };
      });
    }
    return () => {
      dispatch(setTriggerModal(""));
      dispatch(setTempStorage({}));
    };
  }, [state, tempStorage, dispatch]);

  /**
   * Handler to modal state
   */
  const handleModalState = () => {
    dispatch(setTaskModalState("bestbuyca"));
  };

  /**
   * Handler to input field
   */
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTask((pre) => {
      return { ...pre, [name]: value };
    });
  };

  /**
   * Handler to Schedule Start date picker
   */
  const handleScheduleStartPicker = (date) => {
    setTask((pre) => {
      return { ...pre, scheduleStart: date };
    });
  };

  /**
   * Handler to Schedule Stop date picker
   */
  const handleScheduleStopPicker = (date) => {
    setTask((pre) => {
      return { ...pre, scheduleStop: date };
    });
  };

  /**
   * Handler to Profile Select
   */
  const handleMultProfileSelect = ({ value }) => {
    setTask((pre) => {
      return { ...pre, profile: value };
    });
  };

  /**
   * Handler to Mode Select
   */
  const handleModeSelect = ({ value }) => {
    setTask((pre) => {
      return { ...pre, mode: value };
    });
  };
  // };

  /**
   * Handler to task increment  button
   */
  const increment = () => {
    setCounter((pre) => pre + 1);
  };

  /**
   * Handler to task decrement  button
   */
  const decrement = () => {
    if (counter > 1) {
      setCounter((pre) => pre - 1);
    }
  };

  /**
   * function handler to counter input
   * change event
   */
  const handleCounterChange = (e) => {
    const { value } = e.target;
    setCounter(Number(value));
  };

  /**
   * Handler to Checkbox
   */
  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setTask((pre) => {
      return { ...pre, [name]: checked };
    });
  };

  /**
   * Helper function  to Task validation
   */
  const TaskDataValidation = () => {
    let valid = false;
    if (task.keyword.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter Keyword");
      return valid;
    }
    if (/\d{3}\s\d{3}\s\d{4}/.test(task.phoneNumber)) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter Phone Number");
      return valid;
    }
    if (task.profile.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Select Profile");
      return valid;
    }
    if (task.mode.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Select Mode");
      return valid;
    }
    if (task.maxRange.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter Max Range");
      return valid;
    }
    if (task.filterID.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter Filter ID");
      return valid;
    }
    if (task.isScheduleStart && task.isScheduleStop) {
      if (dateValid(task["scheduleStart"]) && dateValid(task["scheduleStop"])) {
        valid = true;
        return valid;
      } else {
        let label;
        if (task.isScheduleStart && !task.isScheduleStop) {
          label = "start";
        } else if (task.isScheduleStop && task.isScheduleStart) {
          label = "stop";
        }
        ToastWarning(`Select ${label} date time!`);
        valid = false;
        return valid;
      }
    } else if (!task.isScheduleStop && !task.isScheduleStart) {
      valid = true;
      return valid;
    } else if (task.isScheduleStart && !task.isScheduleStop) {
      if (dateValid(task["scheduleStart"])) {
        valid = true;
        return valid;
      } else {
        ToastWarning("Select start time!");
        valid = false;
        return valid;
      }
    } else {
      ToastWarning("Enable schedule start!");
      valid = false;
      return valid;
    }
  };

  const handleSubmit = (e) => {
    let validTask = TaskDataValidation();
    if (validTask) {
      if (state !== "edit-task-row") {
        let profileArr = [...task.profile];
        for (let idx = 0; idx < profileArr.length; idx++) {
          let obj = { ...task };
          const profile = getSingleProfileValue(profileList, profileArr[idx]);
          obj["profileID"] = profile["id"];
          obj["profileName"] = profile["label"];
          obj["profile"] = [profile["id"]];
          for (let i = 0; i < counter; i++) {
            dispatch(addTaskInGroup(obj));
          }
        }
        ToastSuccess(`Task Created!`);
      } else {
        let profileArr = [...task.profile];
        for (let idx = 0; idx < profileArr.length; idx++) {
          let obj = { ...task };
          const profile = getSingleProfileValue(profileList, profileArr[idx]);
          obj["profileID"] = profile["id"];
          obj["profileName"] = profile["label"];
          obj["profile"] = [profile["id"]];
          dispatch(editSingleTaskRow({ data: obj, loop: true }));
        }
        ToastSuccess(`Task Updated!`);
      }
      handleModalState();
    }
  };

  /**
   * Handler to Submit button
   */
  const handleSubmitTaskCreation = () => {
    let testCounter = Number(counter);
    if (typeof testCounter === "number" && testCounter >= 1) {
      if (state === "edit-all-task-row") {
        dispatch(editAllTask(task));
        handleModalState();
      } else {
        handleSubmit();
      }
    } else ToastWarning("Counter must be number and greater than 0!!");
  };

  return (
    <div className="modal-container">
      <div className="modal-inner">
        <div className="modal-top">
          <h3>
            {state === "edit-all-task-row"
              ? "Edit All"
              : state === "edit-task-row"
              ? "Edit"
              : "New"}
            {"\t"}Task
          </h3>
          <span>{extractName(item)}</span>
        </div>
        <AppSpacer space={40} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              name="keyword"
              placeholderText="Enter Keyword, SKU or Site"
              fieldTitle="Keyword / SKU / Site"
              onChange={handleChange}
              value={task.keyword}
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              isCustomInputField={true}
              format="### ### ####"
              name="phoneNumber"
              placeholderText="Enter Phone Number"
              fieldTitle="Phone Number"
              onChange={handleChange}
              value={task.phoneNumber}
            />
          </div>
        </div>
        <AppSpacer space={10} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              placeholderText="Select Profile"
              isSelect={true}
              isProfileCustomSelect={true}
              isCustomReactSelect={true}
              isMultiSelect={true}
              fieldTitle="Profile"
              onChange={handleMultProfileSelect}
              selectOptions={profileSelectionList(profileList)}
              value={task.profile}
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              name="mode"
              placeholderText="Select Mode"
              fieldTitle="Mode"
              isSelect={true}
              onChange={handleModeSelect}
              selectOptions={TaskModeOptions}
              value={TaskModeOptions.filter((data) => data.value === task.mode)}
            />
          </div>
        </div>
        <AppSpacer space={10} />
        <div className="flex-row">
          <div className="flex-half">
            <AppInputField
              name="maxRange"
              placeholderText="Enter Max Range"
              fieldTitle="Max Range (KM)"
              onChange={handleChange}
              value={task.maxRange}
              type="number"
            />
          </div>
          <div className="flex-half margin-left">
            <AppInputField
              name="filterID"
              placeholderText="Enter Store ID"
              fieldTitle="Store ID Filter"
              onChange={handleChange}
              value={task.filterID}
            />
          </div>
        </div>
        <AppSpacer space={10} />
        <div className="flex-row">
          <div className="flex-half">
            <div className="inputfield-custom-label">
              <label>Schedule Start</label>
              <AppToggleBar
                checked={task.isScheduleStart}
                id="bestbuy-schedule-start"
                onChange={handleToggle}
                name="isScheduleStart"
              />
            </div>
            <AppInputField
              value={task.scheduleStart}
              isDate={true}
              hideLabel={true}
              onDateTimeChange={handleScheduleStartPicker}
              dateDisable={!task.isScheduleStart}
            />
          </div>
          <div className="flex-half margin-left">
            <div className="inputfield-custom-label">
              <label>Schedule Stop</label>
              <AppToggleBar
                checked={task.isScheduleStop}
                id="bestbuy-schedule-stop"
                onChange={handleToggle}
                name="isScheduleStop"
              />
            </div>
            <AppInputField
              value={task.scheduleStop}
              isDate={true}
              onDateTimeChange={handleScheduleStopPicker}
              hideLabel={true}
              dateDisable={!task.isScheduleStop}
            />
          </div>
        </div>
        <AppSpacer space={30} />
        <div className="flex-row">
          <div className="flex-half">
            <div onClick={handleModalState} className="modal-cancel-btn">
              <span>Cancel</span>
            </div>
          </div>
          <div className="flex-half  ">
            <div className="modal-bottom-flex">
              {!EDIT_STATE.includes(state) ? (
                <div className="modal-counter-btn">
                  <img
                    onClick={decrement}
                    src={minimize}
                    alt="decrement-icon"
                  />
                  <input
                    onChange={handleCounterChange}
                    value={counter}
                    type="number"
                    min="0"
                  />
                  <img onClick={increment} src={add} alt="increment-icon" />
                </div>
              ) : (
                <div className="empty-counter" />
              )}
              <div style={{ width: "60%" }} className="modal-bottom-save">
                <AppButtonWithicon
                  onClick={handleSubmitTaskCreation}
                  image={
                    state === "edit-all-task-row" || state === "edit-task-row"
                      ? check
                      : wadd
                  }
                  btnTitle={
                    state === "edit-task-row"
                      ? "Edit Task"
                      : state === "edit-all-task-row"
                      ? "Edit Tasks"
                      : "New Task"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestBuyModal;
