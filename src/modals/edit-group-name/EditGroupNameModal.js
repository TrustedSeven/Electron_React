import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedItem,
  setEditGroupNameModalState,
} from "../../features/counterSlice";
import { ToastSuccess } from "../../toaster";
import tick from "../../assests/images/wcheck.svg";
import { AppButtonWithicon, AppInputField, AppSpacer } from "../../component";
import { updateProfileGroupName } from "../../features/logic/profile-reducer-logic";

function EditGroupNameModal({ groupState: { value } }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItem);
  const [invalid, setInvalid] = useState(false);
  const [data, setData] = useState({
    title: "",
  });

  React.useEffect(() => {
    if (value === "Profile") {
      setData(() => {
        return { title: selectedItem["title"] };
      });
    }
  }, [selectedItem, value]);

  const handleprofileGroupModal = () => {
    dispatch(setEditGroupNameModalState({ state: false, value: "" }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title.length > 0) {
      if (value === "Profile") {
        let tempObj = { ...selectedItem };
        tempObj["title"] = data.title;
        dispatch(updateProfileGroupName(tempObj));
        ToastSuccess(`Profile Group Updated`);
      }
      handleprofileGroupModal();
    } else setInvalid(true);
  };
  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-inner">
        <div className="modal-top">
          <h3>Edit Profile Group</h3>
        </div>
        <AppSpacer space={50} />
        <AppInputField
          value={data.title}
          name="title"
          onChange={handleChange}
          fieldTitle="Profile Group Name"
          placeholderText="Enter Profile Group Name"
          invalid={invalid}
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
            <AppButtonWithicon
              image={tick}
              type="submit"
              btnTitle="Save Profile Group"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditGroupNameModal;

// if (value === "Task") {
//   let obj = { ...selectedItem };
//   obj["taskGroupName"] = data.title;
//   dispatch(updateTaskGroupName(obj));
//   ToastSuccess(`Task Group Updated`);
// }
