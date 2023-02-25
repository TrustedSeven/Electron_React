import React, { useEffect } from "react";
import "./styles.css";
import SingleProfileCard from "../profile-card/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileModalState,
  setTempStorage,
  setTriggerModal,
  fetchSelectedItemList,
  addingRowInArray,
  setSelectedItemList,
} from "../../../features/counterSlice";

function ProfileCardWrapper({ data, style, sortTable }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);

  useEffect(() => {
    return () => {
      dispatch(setSelectedItemList([]));
    };
  }, [dispatch]);

  const handleEditProfile = (data) => {
    dispatch(setTriggerModal("edit-single-profile"));
    dispatch(setTempStorage(data));
    dispatch(setProfileModalState());
  };

  const handlePress = ({ event, row }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(row));
    }
  };

  return (
    <div className="profile-card-wrapper">
      {sortTable?.map((data, i) => (
        <SingleProfileCard
          onEdit={handleEditProfile}
          onPress={handlePress}
          {...{ data }}
          key={`data-${data.id}`}
          activeRow={selectedItem?.filter((d) => d.id === data.id)}
        />
      ))}
    </div>
  );
}

export default ProfileCardWrapper;
