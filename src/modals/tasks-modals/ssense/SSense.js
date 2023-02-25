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
  fetchSsenseAccountList,
  fetchMicrosoftSessionArray,
} from "../../../features/counterSlice";
import wadd from "../../../assests/images/add.svg";
import add from "../../../assests/images/badd.svg";
import {
  editAllTask,
  addTaskInGroup,
  editSingleTaskRow,
} from "../../../features/logic/task-reducer-logic";
import { useDispatch, useSelector } from "react-redux";
import check from "../../../assests/images/wcheck.svg";
import minimize from "../../../assests/images/bminimize.svg";
import { ToastSuccess, ToastWarning } from "../../../toaster";
import {
  dateValid,
  extractName,
  getSingleProfileValue,
  profileSelectionList,
  TaskModeOptions,
} from "../../../config/modal-config";
import "./styles.css";

const EDIT_STATE = ["edit-all-task-row", "edit-task-row"];
const Account_Selection_Modal = ["ssense", "microsoftca"];

function SSense() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const item = useSelector(fetchSelectedItem);
  const state = useSelector(fetchEditModalState);
  const profileList = useSelector(fetchProfileList);
  const tempStorage = useSelector(fetchTempStorageState);
  const ssenseAccountList = useSelector(fetchSsenseAccountList);
  const microsoftSessionList = useSelector(fetchMicrosoftSessionArray);
  const [task, setTask] = useState({
    site: extractName(item),
    keyword: "",
    profileID: "",
    profile: [],
    mode: "",
    filterID: "",
    scheduleStart: "",
    scheduleStop: "",
    status: "Idle",
    size: "O/S",
    isScheduleStart: false,
    isScheduleStop: false,
    active: false,
    profileType: "",
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
    dispatch(setTaskModalState("ssense"));
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

  /**
   * Helper  to Task validation
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

  /**
   * Handler to Submit button
   */
  const handleSubmit = (e) => {
    let validTask = TaskDataValidation();
    if (validTask) {
      if (state !== "edit-task-row") {
        if (
          Account_Selection_Modal.includes(item?.taskSite) &&
          task?.accountSelected === "allaccount"
        ) {
          let list =
            item?.taskSite === "ssense"
              ? ssenseAccountList
              : microsoftSessionList;
          for (let i = 0; i < list.length; i++) {
            let obj = { ...task };
            obj["accountSelected"] = list[i].account;
            let profileArr = [...task.profile];
            for (let idx = 0; idx < profileArr.length; idx++) {
              const profile = getSingleProfileValue(
                profileList,
                profileArr[idx]
              );
              obj["profileID"] = profile["id"];
              obj["profileName"] = profile["label"];
              obj["profile"] = [profile["id"]];
              for (let j = 0; j < counter; j++) {
                dispatch(addTaskInGroup(obj));
              }
            }
          }
        } else {
          let profileArray = [...task.profile];
          for (let index = 0; index < profileArray.length; index++) {
            let obj = { ...task };
            const profile = getSingleProfileValue(
              profileList,
              profileArray[index]
            );
            obj["profileID"] = profile["id"];
            obj["profileName"] = profile["label"];
            obj["profile"] = [profile["id"]];
            for (let i = 0; i < counter; i++) {
              dispatch(addTaskInGroup(obj));
            }
          }
        }
        ToastSuccess(`Task Created!`);
      } else {
        if (
          item?.taskSite === Account_Selection_Modal[1] &&
          task?.accountSelected === "allaccount"
        ) {
          let list =
            item?.taskSite === "ssense"
              ? ssenseAccountList
              : microsoftSessionList;
          for (let i = 0; i < list.length; i++) {
            let obj = { ...task };
            obj["accountSelected"] = list[i].account;
            let profileArr = [...task.profile];
            for (let idx = 0; idx < profileArr.length; idx++) {
              const profile = getSingleProfileValue(
                profileList,
                profileArr[idx]
              );
              obj["profileID"] = profile["id"];
              obj["profileName"] = profile["label"];
              obj["profile"] = [profile["id"]];
              for (let j = 0; j < counter; j++) {
                dispatch(editSingleTaskRow({ data: obj, loop: true }));
              }
            }
          }
        } else {
          dispatch(editSingleTaskRow({ data: task, loop: false }));
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
   * Handler bind to Checkbox
   */
  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setTask((pre) => {
      return { ...pre, [name]: checked };
    });
  };
  /**
   * function that set dynamic toggle value in state
   * for Account CA and Walmart CA
   */
  const handleCustomToggle = (event) => {
    const { name, checked } = event.target;
    setTask((pre) => {
      return { ...pre, [name]: checked };
    });
  };

  /**
   * helper function that fetch
   * selected account value
   */
  const getSelectedAccountValue = (site) => {
    if (site !== undefined) {
      if (task?.accountSelected === "allaccount") {
        return [
          {
            value: "allaccount",
            label: "All Account",
          },
        ];
      } else {
        if (site === "ssense") {
          let data = ssenseAccountList.filter(
            (account) => account["account"] === task?.accountSelected
          );
          if (data.length > 0) {
            return [
              {
                value: data[0]["account"],
                label: data[0]["account"]?.split(":")[0],
                id: data[0]["id"],
              },
            ];
          } else {
            return [];
          }
        } else {
          let data = microsoftSessionList.filter(
            (account) => account["account"] === task?.accountSelected
          );
          if (data.length > 0) {
            return [
              {
                value: data[0]["account"],
                label: data[0]["account"]?.split(":")[0],
                id: data[0]["id"],
              },
            ];
          } else {
            return [];
          }
        }
      }
    } else return [];
  };

  /**
   * helper function that Set
   * selected account value in state
   */
  const handleAccountSelect = ({ value }) => {
    setTask((pre) => {
      return { ...pre, accountSelected: value };
    });
  };

  /**
   * helper function that make option
   * for selected account field
   */
  const makeAccountListOptions = (site) => {
    if (site !== undefined) {
      if (site === "ssense") {
        if (ssenseAccountList.length > 0) {
          let arr = [];
          for (let i = 0; i < ssenseAccountList.length + 1; i++) {
            let obj = {};
            if (i === 0) {
              obj["value"] = "allaccount";
              obj["label"] = "All Account";
              obj["index"] = i;
              arr.push(obj);
            } else {
              obj["value"] = ssenseAccountList[i - 1]["account"];
              obj["label"] = ssenseAccountList[i - 1]["account"]?.split(":")[0];
              obj["id"] = ssenseAccountList[i - 1]["id"];
              obj["index"] = i;
              arr.push(obj);
            }
          }
          return arr;
        } else return [];
      } else if (site === "microsoftca") {
        if (microsoftSessionList.length > 0) {
          let arr = [];
          for (let i = 0; i < microsoftSessionList.length + 1; i++) {
            let obj = {};
            if (i === 0) {
              obj["value"] = "allaccount";
              obj["label"] = "All Account";
              obj["index"] = i;
              arr.push(obj);
            } else {
              obj["value"] = microsoftSessionList[i - 1]["account"];
              obj["label"] =
                microsoftSessionList[i - 1]["account"]?.split(":")[0];
              obj["id"] = microsoftSessionList[i - 1]["id"];
              obj["index"] = i;
              arr.push(obj);
            }
          }
          return arr;
        } else return [];
      }
    } else return [];
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
        {Account_Selection_Modal.includes(item?.taskSite) ? (
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
                placeholderText="Select Account"
                isSelect={true}
                fieldTitle="Account Selection"
                isCustomReactSelect={true}
                onChange={handleAccountSelect}
                selectOptions={makeAccountListOptions(item?.taskSite)}
                value={getSelectedAccountValue(item?.taskSite)}
              />
            </div>
          </div>
        ) : (
          <AppInputField
            name="keyword"
            placeholderText="Enter Keyword, SKU or Site"
            fieldTitle="Keyword / SKU / Site"
            onChange={handleChange}
            value={task.keyword}
          />
        )}
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
              placeholderText="Select Mode"
              isSelect={true}
              fieldTitle="Mode"
              value={TaskModeOptions.filter((data) => data.value === task.mode)}
              onChange={handleModeSelect}
              selectOptions={TaskModeOptions}
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
                id="schedule-start"
                onChange={handleToggle}
                name="isScheduleStart"
              />
            </div>
            <AppInputField
              value={task.scheduleStart}
              isDate={true}
              onDateTimeChange={handleScheduleStartPicker}
              hideLabel={true}
              dateDisable={!task.isScheduleStart}
            />
          </div>
          <div className="flex-half margin-left">
            <div className="inputfield-custom-label">
              <label>Schedule Stop</label>
              <AppToggleBar
                checked={task.isScheduleStop}
                id="schedule-stop"
                onChange={handleToggle}
                name="isScheduleStop"
              />
            </div>
            <AppInputField
              value={task.scheduleStop}
              onDateTimeChange={handleScheduleStopPicker}
              isDate={true}
              hideLabel={true}
              dateDisable={!task.isScheduleStop}
            />
          </div>
        </div>
        <AppSpacer space={30} />
        <div className="flex-row">
          <div className="flex-half custom-modal-additional-field-flex">
            <div onClick={handleModalState} className="modal-cancel-btn">
              <span>Cancel</span>
            </div>
            {item?.taskSite === Account_Selection_Modal[1] ? (
              <div className="custom-modal-toggle-label">
                <AppToggleBar
                  name="rotateOnDecline"
                  id="rotate-on-decline"
                  onChange={handleCustomToggle}
                  checked={task?.rotateOnDecline}
                />
                <span>Rotate on Decline</span>
              </div>
            ) : item?.taskSite === "walmartca" ? (
              <div className="custom-modal-toggle-label">
                <AppToggleBar
                  id="use-account"
                  onChange={handleCustomToggle}
                  name="useAccount"
                  checked={task?.useAccount}
                />
                <span>Use Accounts</span>
              </div>
            ) : null}
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

export default SSense;
