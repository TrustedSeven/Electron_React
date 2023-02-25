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
  fetchSelectedItem,
  setTaskModalState,
  fetchEditModalState,
  fetchTempStorageState,
  fetchAmazonSessionArray,
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
  TaskModeOptions,
} from "../../../config/modal-config";
import "./styles.css";

const EDIT_STATE = ["edit-all-task-row", "edit-task-row"];

function SSense() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const item = useSelector(fetchSelectedItem);
  const state = useSelector(fetchEditModalState);
  const tempStorage = useSelector(fetchTempStorageState);
  const amazonList = useSelector(fetchAmazonSessionArray);
  const [task, setTask] = useState({
    site: extractName(item),
    keyword: "",
    mode: "",
    scheduleStart: "",
    scheduleStop: "",
    status: "Idle",
    size: "O/S",
    selectedAccount: "",
    atcAttempt: "",
    checkoutAttempt: "",
    isScheduleStart: false,
    isScheduleStop: false,
    active: false,
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
    dispatch(setTaskModalState("amazon"));
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
   * Handler to Mode Select
   */
  const handleModeSelect = ({ value }) => {
    setTask((pre) => {
      return { ...pre, mode: value };
    });
  };

  /**
   * helper function that Set
   * selected account value in state
   */
  const handleAccountSelect = ({ value }) => {
    setTask((pre) => {
      return { ...pre, selectedAccount: value };
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
    if (task.mode.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Select Mode");
      return valid;
    }
    if (task.selectedAccount.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter slected account");
      return valid;
    }
    if (task.atcAttempt.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter ATC attempt");
      return valid;
    }
    if (task.checkoutAttempt.length > 0) {
      valid = true;
    } else {
      valid = false;
      ToastWarning("Enter checkout attempt");
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
        if (task?.selectedAccount === "allaccount") {
          // if we have 5 account and counter value is 10 we have to create 10*5= 50 account
          for (let i = 0; i < amazonList.length; i++) {
            let obj = { ...task };
            obj["selectedAccount"] = amazonList[i].account;
            // loop counter value
            for (let j = 0; j < counter; j++) {
              dispatch(addTaskInGroup(obj));
            }
          }
        } else {
          for (let i = 0; i < counter; i++) {
            dispatch(addTaskInGroup(task));
          }
        }
        ToastSuccess(`Task Created!`);
      } else {
        if (task?.selectedAccount === "allaccount") {
          for (let i = 0; i < amazonList.length; i++) {
            let obj = { ...task };
            obj["selectedAccount"] = amazonList[i].account;
            for (let j = 0; j < counter; j++) {
              dispatch(editSingleTaskRow({ data: obj, loop: true }));
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
   * helper function that make option
   * for selected account field
   */
  const makeAccountListOptions = (site) => {
    if (site !== undefined) {
      if (amazonList.length > 0) {
        let arr = [];
        for (let i = 0; i < amazonList.length + 1; i++) {
          let obj = {};
          if (i === 0) {
            obj["value"] = "allaccount";
            obj["label"] = "All Account";
            obj["index"] = i;
            arr.push(obj);
          } else {
            obj["value"] = amazonList[i - 1]["account"];
            obj["label"] = amazonList[i - 1]["account"]?.split(":")[0];
            obj["id"] = amazonList[i - 1]["id"];
            obj["index"] = i;
            arr.push(obj);
          }
        }
        return arr;
      } else return [];
    } else return [];
  };

  /**
   * helper function that fetch
   * selected account value
   */
  const getSelectedAccountValue = () => {
    if (task?.selectedAccount === "allaccount") {
      return [
        {
          value: "allaccount",
          label: "All Account",
        },
      ];
    } else {
      let data = amazonList.filter(
        (account) => account["account"] === task?.selectedAccount
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
  };

  return (
    <div className="modal-container">
      <div className="modal-inner ">
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
            <AppInputField
              placeholderText="Select Account"
              isSelect={true}
              isCustomReactSelect={true}
              fieldTitle="Account Selection"
              onChange={handleAccountSelect}
              selectOptions={makeAccountListOptions(item)}
              value={getSelectedAccountValue()}
            />
          </div>
          <div className="flex-half margin-left">
            <div className="flex-row">
              <div className="flex-half amazon-atc-attempt-field">
                <AppInputField
                  placeholderText="Attempts"
                  fieldTitle="ATC Attempts"
                  onChange={handleChange}
                  name="atcAttempt"
                  type="number"
                  value={task.atcAttempt}
                />
              </div>
              <div className="flex-half amazon-atc-attempt-field margin-left">
                <AppInputField
                  placeholderText="Attempts"
                  fieldTitle="Checkout Attempts"
                  onChange={handleChange}
                  name="checkoutAttempt"
                  value={task.checkoutAttempt}
                  type="number"
                />
              </div>
            </div>
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

export default SSense;
