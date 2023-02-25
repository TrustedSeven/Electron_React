import React from "react";
import "./styles.css";
import {
  fetchSelectedItemList,
  setEditGroupNameModalState,
  toggleProfilCardDisplay,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import more from "../../../assests/images/more.svg";
import grid from "../../../assests/images/grid.svg";
import ggrid from "../../../assests/images/ggrid.svg";
import list from "../../../assests/images/list.svg";
import wlist from "../../../assests/images/wlist.svg";
import trash from "../../../assests/images/trash.svg";
import upload from "../../../assests/images/upload.svg";
import { ToastInfo, ToastWarning } from "../../../toaster";
import { deleteProfileGroup } from "../../../features/logic/profile-reducer-logic";

function ProfileRightTop({ data, style }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);

  const handleDeleteGroup = () => {
    if (data["type"] === "profile-group") {
      ToastInfo("1 Profile group Deleted");
      dispatch(deleteProfileGroup(data));
    } else ToastWarning("Select Profile Group");
  };

  const handleDisplayToggle = (type) => {
    dispatch(toggleProfilCardDisplay(type));
  };

  const handleEditGroupName = () => {
    if (data["type"] === "profile-group") {
      dispatch(setEditGroupNameModalState({ state: true, value: "Profile" }));
    } else ToastWarning("Select Profile Group");
  };

  return (
    <div className="task-right-top-container">
      <div className="task-right-top-stats">
        {data["type"] === "profile-group" ? (
          <p>{data?.list?.length} Profiles</p>
        ) : (
          <p></p>
        )}
        {style === "flex" && (
          <small>{selectedItem?.length} Profiles Selected</small>
        )}
      </div>
      <div className="task-right-top-flex-container">
        <div className="task-right-top-left">
          <h2>{data.title}</h2>
          <div
            onClick={handleEditGroupName}
            className="task-right-top-left-btn"
          >
            <img src={more} alt="" className="btn" />
          </div>
          <div onClick={handleDeleteGroup} className="task-right-top-left-btn ">
            <img src={trash} className="btn" alt="" />
          </div>
          <div className="task-right-top-left-btn ">
            <img src={upload} alt="" className="btn" />
          </div>
        </div>
        <div className="task-right-top-right profile">
          <div
            style={
              style === "flex"
                ? { left: "0px", right: "unset" }
                : { right: "0px", left: "unset" }
            }
            className="slider-active start"
          />
          <div className="task-right-top-right-ontop">
            <div
              style={{ borderRadius: "5px 0px 0px 5px" }}
              onClick={() => handleDisplayToggle("flex")}
              className={`task-right-top-filter  ${
                style === "flex" && "active-view"
              } `}
            >
              <img src={style === "flex" ? grid : ggrid} alt="" />
              <span>Grid</span>
            </div>
            <div
              style={{ borderRadius: "0px 5px 5px 0px" }}
              onClick={() => handleDisplayToggle("block")}
              className={`task-right-top-filter  ${
                style !== "flex" && "active-view"
              } `}
            >
              <img src={style === "block" ? wlist : list} alt="" />
              <span>List</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileRightTop;
