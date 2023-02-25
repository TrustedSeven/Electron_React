import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastWarning } from "../../../toaster";
import add from "../../../assests/images/add.svg";
import find from "../../../assests/images/find.svg";
import lock from "../../../assests/images/lock.svg";
import edit from "../../../assests/images/edit.svg";
import {
  setAddAccountModalState,
  setTriggerModal,
} from "../../../features/counterSlice";
import { togglePassword } from "../../../features/logic/account-reducer-logic";

function AccountsRightTopBtnsWrapper({ data, handleTriggerSort }) {
  const { passwordStatus } = data;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleAddAccountModal = () => {
    if (data !== undefined) {
      const { type } = data;
      if (type === "account-group" || type === "session-group") {
        dispatch(setAddAccountModalState());
      } else {
        ToastWarning("Select Some Account/Session Group");
      }
    }
  };

  const handlePasswordToggle = () => {
    dispatch(togglePassword());
  };

  const handleMassEdit = () => {
    if (data !== undefined) {
      const { type } = data;
      if (type === "account-group" || type === "session-group") {
        dispatch(setTriggerModal("edit-account"));
        dispatch(setAddAccountModalState());
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (data["type"] === "account-group" && Object.keys(data).length > 0) {
      handleTriggerSort(value, data["accountList"]);
    } else if (
      data["type"] === "session-group" &&
      Object.keys(data).length > 0
    ) {
      handleTriggerSort(value, data["sessionList"]);
    } else ToastWarning("Select Group");
  };

  return (
    <div className="task-right-top-btns-wrapper">
      <div className="task-right-top-btns-left">
        <div
          onClick={handleAddAccountModal}
          className="task-right-top-btn-container btn"
        >
          <img src={add} alt="" />
          <span>Add Accounts</span>
        </div>
        <div className="task-right-top-search-container">
          <img src={find} alt="" />
          <input
            onChange={handleChange}
            value={search}
            type="search"
            required
            placeholder="Search..."
          />
        </div>
        <div
          onClick={handlePasswordToggle}
          style={{ marginLeft: "7px" }}
          className="task-right-top-btn-container edit  btn"
        >
          <img src={lock} alt="" />
          <span>{passwordStatus ? "Show" : "Hide"} Passwords</span>
        </div>
      </div>
      <div className="task-right-top-btns-right">
        <div
          onClick={handleMassEdit}
          className="task-right-top-btn-container edit btn"
        >
          <img src={edit} alt="" />
          <span>Mass Edit</span>
        </div>
      </div>
    </div>
  );
}

export default AccountsRightTopBtnsWrapper;
