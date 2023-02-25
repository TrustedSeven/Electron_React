import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountPageSessionTableRow } from "../..";
import {
  addingRowInArray,
  fetchSelectedItemList,
  setAddAccountModalState,
  setTempStorage,
  setTriggerModal,
} from "../../../features/counterSlice";
import { hideToaster, MAX_TOAST_LIMIT, ToastInfo } from "../../../toaster";
import {
  deleteAccountRowFromGroup,
  deleteSelectedAccount,
} from "../../../features/logic/account-reducer-logic";
import { FixedSizeList as List } from "react-window";
import trash from "../../../assests/images/trash.svg";
function SessionTable({ data: obj, sortTable }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);
  const [toasterCounter, setToasterCounter] = useState(0);

  const handleDeleteRow = (row) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(deleteAccountRowFromGroup(row));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 session deleted");
    } else {
      hideToaster();
    }
  };

  const handleEditRow = (row) => {
    dispatch(setTempStorage(row));
    dispatch(setTriggerModal("edit-session-row"));
    dispatch(setAddAccountModalState());
  };

  const handleSelected = ({ event, row }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(row));
    }
  };

  const handleSelectedDeletSession = () => {
    dispatch(deleteSelectedAccount());
  };

  return (
    <div className="account-table-container">
      <div className="account-table-scroll">
        <div className="account-table-stick-header session-table">
          <div style={{ width: "10%" }}>#</div>
          <div style={{ width: "25%" }}>Login</div>
          <div style={{ width: "25%", marginLeft: "-5px" }}>Password</div>
          <div style={{ width: "27%", marginLeft: "-15px" }}>Status</div>
          <div style={{ width: "15%" }}>
            {selectedItem?.length > 0 &&
              `${selectedItem?.length} Account Selected`}
          </div>
        </div>
        <List
          itemData={sortTable}
          className="List"
          height={645}
          itemCount={sortTable?.length}
          itemSize={45}
          width="100%"
        >
          {({ data, index, style, isScrolling }) => {
            return (
              <AccountPageSessionTableRow
                {...{ data, index, style, isScrolling, obj }}
                onPress={handleSelected}
                onEdit={handleEditRow}
                onDelete={handleDeleteRow}
                activeRow={selectedItem?.filter((d) => d.id === data[index].id)}
                key={`accounts-table-row-${data[index].id}`}
              />
            );
          }}
        </List>
      </div>
      {selectedItem?.length > 0 && (
        <div className="task-scrollable-bottom-btns-wrapper">
          <div
            style={{ background: "rgba(240, 85, 85, 0.05)" }}
            onClick={handleSelectedDeletSession}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={trash} alt="trash-icon" />
            <span>Delete Selected Accounts</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionTable;
