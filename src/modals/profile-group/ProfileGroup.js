import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppSpacer, AppInputField, AppButtonWithicon } from "../../component";
import { setProfileGroupModalState } from "../../features/counterSlice";
import { addProfileInList } from "../../features/logic/profile-reducer-logic";
import { ToastSuccess } from "../../toaster";

function ProfileGroup() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    list: [],
  });

  const handleprofileGroupModal = () => {
    dispatch(setProfileGroupModalState());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfileInList(data));
    ToastSuccess(`Profile Group created`);
    handleprofileGroupModal();
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-inner">
        <div className="modal-top">
          <h3>New Profile Group</h3>
        </div>
        <AppSpacer space={50} />
        <AppInputField
          value={data.title}
          name="title"
          required
          onChange={handleChange}
          fieldTitle="Profile Group Name"
          placeholderText="Enter Profile Group Name"
        />
        <AppSpacer space={30} />
        <div className="custom-profile-bottom">
          <div
            onClick={handleprofileGroupModal}
            className="modal-cancel-btn btn"
          >
            <span>Cancel</span>
          </div>
          <div className="profile-address-same">
            <AppButtonWithicon type="submit" btnTitle="New Profile Group" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileGroup;
