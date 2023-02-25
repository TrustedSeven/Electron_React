import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePageTableRow } from "../..";
import {
  addingRowInArray,
  fetchSelectedItemList,
  setTriggerModal,
  setTempStorage,
  setProfileModalState,
  setSelectedItemList,
} from "../../../features/counterSlice";
import {
  copySingleRowFromTable,
  deleteProfileRowFromTable,
} from "../../../features/logic/profile-reducer-logic";
import { ToastInfo, MAX_TOAST_LIMIT, hideToaster } from "../../../toaster";
import "./styles.css";
import { FixedSizeList as List } from "react-window";

function ProfileTable({ sortTable }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);
  const [toasterCounter, setToasterCounter] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(setSelectedItemList([]));
    };
  }, [dispatch]);

  const handleDeleteCard = (card) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(deleteProfileRowFromTable(card));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 profile deleted");
    } else {
      hideToaster();
    }
  };

  const handleCopyRow = (row) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(copySingleRowFromTable(row));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 Profile copied");
    } else {
      hideToaster();
    }
  };

  const handleEditProfile = (data) => {
    dispatch(setTriggerModal("edit-single-profile"));
    dispatch(setTempStorage(data));
    dispatch(setProfileModalState());
  };

  const handleClick = ({ event, task }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(task));
    }
  };
  return (
    <div className="profile-table-scroll">
      <div className="profile-table-sticky-header">
        <div>Profile Name</div>
        <div>Cardholder</div>
        <div>Profile</div>
        <div style={{ marginLeft: "-5px" }}>Billing</div>
        <div style={{ marginLeft: "0px" }}>Shipping</div>
        <div className="profile-table-stick-header selected-profile-label">
          {selectedItem?.length > 0 &&
            `${selectedItem?.length} Profiles Selected`}
        </div>
      </div>
      <List
        itemData={sortTable}
        className="List"
        height={740}
        itemCount={sortTable?.length}
        itemSize={45}
        width="100%"
      >
        {({ data, index, style, isScrolling }) => {
          return (
            <ProfilePageTableRow
              {...{ data, index, style, isScrolling }}
              onDelete={handleDeleteCard}
              onCopy={handleCopyRow}
              onEdit={handleEditProfile}
              onPress={handleClick}
              activeRow={selectedItem?.filter(
                (item) => item.id === data[index].id
              )}
              key={`task-table-row-${data[index].id}`}
            />
          );
        }}
      </List>
    </div>
  );
}

export default ProfileTable;
