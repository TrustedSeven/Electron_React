import React, { useState } from "react";
import {
  fetchProfileList,
  setProfileModalState,
  fetchSelectedItem,
  fetchSelectedItemList,
} from "../../../features/counterSlice";
import { ToastWarning } from "../../../toaster";
import add from "../../../assests/images/add.svg";
import find from "../../../assests/images/find.svg";
import wcopy from "../../../assests/images/wcopy.svg";
import trash from "../../../assests/images/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedSelectedProfile,
  duplicateSelectedProfile,
  deletAllRowFromTable,
} from "../../../features/logic/profile-reducer-logic";

function ProfileRightTopBtns({ style, handleTriggerSort }) {
  const list = useSelector(fetchProfileList);
  const selectedItem = useSelector(fetchSelectedItemList);
  const item = useSelector(fetchSelectedItem);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleModal = () => {
    if (list.length > 0) {
      if (item["type"] === "profile-group") {
        dispatch(setProfileModalState());
      } else {
        ToastWarning("Select Profile Group!");
      }
    } else {
      ToastWarning("Create Profile Group!");
    }
  };

  const handleDuplicateSelected = () => {
    dispatch(duplicateSelectedProfile());
  };

  const handleDeletedSelected = () => {
    dispatch(deletedSelectedProfile());
  };

  const handleDeletAllProfile = () => {
    if (item["type"] === "profile-group") {
      dispatch(deletAllRowFromTable());
    } else ToastWarning("Select Profile Group!");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (item["type"] === "profile-group" && Object.keys(item).length > 0) {
      handleTriggerSort(value, item["list"]);
    } else ToastWarning("Select Profile Group");
  };

  return (
    <div className="task-right-top-btns-wrapper">
      <div className="task-right-top-btns-left">
        <div onClick={handleModal} className="task-right-top-btn-container btn">
          <img src={add} alt="" />
          <span>New Profile</span>
        </div>
        <div className="task-right-top-search-container">
          <img src={find} alt="" />
          <input
            value={search}
            type="search"
            required
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
      </div>
      {selectedItem?.length > 0 ? (
        <div className="task-right-top-btns-right">
          <div
            onClick={handleDuplicateSelected}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={wcopy} alt="" />
            <span>Duplicate Selected Profiles</span>
          </div>
          <div
            style={{ background: "rgba(240, 85, 85, 0.05)" }}
            onClick={handleDeletedSelected}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={trash} alt="" />
            <span>Delete Selected Profiles</span>
          </div>
        </div>
      ) : (
        <div className="task-right-top-btns-right">
          <div
            style={{ background: "rgba(240, 85, 85, 0.05)" }}
            onClick={handleDeletAllProfile}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={trash} alt="" />
            <span>Delete All Profiles</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileRightTopBtns;
