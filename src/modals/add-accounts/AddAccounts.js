import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditModalState,
  fetchSelectedItem,
  setAddAccountModalState,
  setTriggerModal,
  fetchTempStorageState,
  setTempStorage,
} from "../../features/counterSlice";
import { ToastSuccess } from "../../toaster";
import { AppButtonWithicon, AppInputField, AppSpacer } from "../../component";
import {
  extractAccountsFromString,
  editSingleAccountRow,
  editSingleSessionRow,
} from "../../features/logic/account-reducer-logic";
import wcheck from "../../assests/images/wcheck.svg";
import add from "../../assests/images/add.svg";
const Schema =
  /^\s*(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,}):.{1,}$/;
function AddAccounts() {
  const item = useSelector(fetchSelectedItem);
  const state = useSelector(fetchEditModalState);
  const editedRow = useSelector(fetchTempStorageState);
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useState(false);
  const [data, setData] = useState({
    account: "",
  });

  useEffect(() => {
    if (
      state === "edit-account" &&
      (item["type"] === "account-group" || item["type"] === "session-group")
    ) {
      setData(() => {
        return { account: item["account"] };
      });
    } else if (state === "edit-account-row" || state === "edit-session-row") {
      setData(() => {
        return { account: editedRow["account"] };
      });
    }
    return () => {
      dispatch(setTriggerModal(""));
      dispatch(setTempStorage({}));
    };
  }, [state, item, dispatch, editedRow]);

  const handleAddAccountModal = () => {
    dispatch(setAddAccountModalState());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const checkValidation = () => {
    let valid = [];
    let result = false;
    let arr = data.account.split("\n");
    for (let i = 0; i < arr.length; i++) {
      if (Schema.test(arr[i])) {
        valid.push(arr[i]);
        result = true;
      } else {
        result = false;
      }
    }
    return { result, list: valid };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { list, result } = checkValidation();
    if (result === true) {
      if (state !== "edit-account" && Object.keys(editedRow).length === 0) {
        dispatch(extractAccountsFromString({ data, list: list }));
        ToastSuccess(`Account Created`);
      } else if (
        state === "edit-account-row" &&
        Object.keys(editedRow).length > 0
      ) {
        dispatch(editSingleAccountRow(data));
      } else if (
        state === "edit-session-row" &&
        Object.keys(editedRow).length > 0
      ) {
        dispatch(editSingleSessionRow(data));
      } else if (
        state === "edit-account" &&
        Object.keys(editedRow).length === 0
      ) {
        dispatch(extractAccountsFromString({ data, list: list }));
        ToastSuccess(`Account Updated`);
      }
      handleAddAccountModal();
    }
    setInvalid(true);
  };
  const edit_state = ["edit-session-row", "edit-account-row"];
  return (
    <div className="modal-container">
      <div className="modal-inner">
        <div className="modal-top">
          <h3>{item.title}</h3>
        </div>
        <AppSpacer space={80} />
        {edit_state.includes(state) ? (
          <AppInputField
            fieldTitle="Enter Accounts"
            onChange={handleChange}
            value={data.account}
            name="account"
            placeholderText="email:password"
            invalid={invalid}
          />
        ) : (
          <AppInputField
            multiHeight="220px"
            fieldTitle="Enter Accounts"
            isMulti={true}
            onChange={handleChange}
            value={data.account}
            name="account"
            placeholderText="email:password"
            invalid={invalid}
          />
        )}
        <AppSpacer space={30} />
        <div className="custom-profile-bottom">
          <div onClick={handleAddAccountModal} className="modal-cancel-btn btn">
            <span>Cancel</span>
          </div>
          <div className="profile-address-same">
            <AppButtonWithicon
              image={
                state === "edit-account" || edit_state.includes(state)
                  ? wcheck
                  : add
              }
              onClick={handleSubmit}
              btnTitle={
                state === "edit-account" || state === "edit-account-row"
                  ? "Edit Accounts"
                  : state === "edit-session-row"
                  ? "Edit Session"
                  : "Add Accounts"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAccounts;
