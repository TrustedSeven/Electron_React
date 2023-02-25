import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import trash from "../../../assests/images/trash.svg";
import {
  addingRowInArray,
  fetchSelectedItemList,
  setTempStorage,
  setTriggerModal,
  setAddAccountModalState,
} from "../../../features/counterSlice";
import {
  deleteAccountRowFromGroup,
  deleteSelectedAccount,
} from "../../../features/logic/account-reducer-logic";
import { hideToaster, MAX_TOAST_LIMIT, ToastInfo } from "../../../toaster";
import AccountsTableRow from "../acccount-tabel-row/AccountsTableRow";
import { FixedSizeList as List } from "react-window";

function AccountsTabel({ data: obj, sortTable }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);
  const [toasterCounter, setToasterCounter] = useState(0);

  const handleDeleteRow = (row) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(deleteAccountRowFromGroup(row));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 Account deleted");
    } else {
      hideToaster();
    }
  };

  const handleSelectDeleted = () => {
    dispatch(deleteSelectedAccount());
  };

  const handleEditRow = (row) => {
    dispatch(setTempStorage(row));
    dispatch(setTriggerModal("edit-account-row"));
    dispatch(setAddAccountModalState());
  };

  const handleSelected = ({ event, row }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(row));
    }
  };

  return (
    <div className="account-table-container">
      <div className="account-table-stick-header">
        <div>#</div>
        <div>Login</div>
        <div>Password</div>
        <div>
          {selectedItem?.length > 0 &&
            `${selectedItem?.length} Account Selected`}
        </div>
      </div>
      <div className="account-table-scroll">
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
              <AccountsTableRow
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
            onClick={handleSelectDeleted}
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

export default AccountsTabel;
