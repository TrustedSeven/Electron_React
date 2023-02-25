import React from "react";
import "./styles.css";
import {
  setSelectItem,
  setProfileGroupModalState,
} from "../../../features/counterSlice";
import { useDispatch } from "react-redux";
import add from "../../../assests/images/gadd.svg";

function ProfileLeftCardContainer({ list, data }) {
  const dispatch = useDispatch();

  const handleprofileGroupModal = () => {
    dispatch(setProfileGroupModalState());
  };

  const handleSelectProfile = (profile) => {
    dispatch(setSelectItem(profile));
  };

  return (
    <div className="profile-left-top-card-container">
      <div
        onClick={handleprofileGroupModal}
        className="profile-left-top-card-add-profile"
      >
        <img src={add} alt="add-icon" />
        <span>New Profile Group</span>
      </div>
      <div className="profile-scroll-height">
        {list?.map((profile, i) => (
          <div
            onClick={() =>
              handleSelectProfile({ ...profile, type: "profile-group" })
            }
            key={`profile-card-key-${i}`}
            className={`profile-left-card button ${
              profile.id === data.id && "active-profile"
            }`}
          >
            <h2>{profile.title}</h2>
            <div className="profile-counter">
              <span>{profile?.list?.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileLeftCardContainer;
