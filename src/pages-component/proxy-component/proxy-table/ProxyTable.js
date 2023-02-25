import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import trash from "../../../assests/images/trash.svg";
import ProxyTableRow from "../proxy-table-row/ProxyTableRow";
import {
  copySingleProxyRow,
  deleteSingleRow,
  deleteSelectedProxy,
  deleteAllProxyRow,
} from "../../../features/logic/proxy-group-reducer-logic";
import { hideToaster, MAX_TOAST_LIMIT, ToastInfo } from "../../../toaster";
import {
  fetchSelectedItemList,
  setTempStorage,
  setEditSingleProxyModalState,
  addingRowInArray,
} from "../../../features/counterSlice";
import { FixedSizeList as List } from "react-window";

function ProxyTable({ data }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(fetchSelectedItemList);
  const [toasterCounter, setToasterCounter] = useState(0);

  const handleDeleteRow = (row) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(deleteSingleRow(row));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 proxy deleted!!");
    } else {
      hideToaster();
    }
  };

  const handleCopyProxy = (proxy) => {
    setToasterCounter((pre) => pre + 1);
    dispatch(copySingleProxyRow(proxy));
    if (toasterCounter < MAX_TOAST_LIMIT) {
      ToastInfo("1 proxy copied!!");
    } else {
      hideToaster();
    }
  };

  const handleSelectedDelete = () => {
    dispatch(deleteSelectedProxy());
  };

  const handleDeleteAllProxy = () => {
    dispatch(deleteAllProxyRow());
  };

  const handleEditSingleProxy = (proxy) => {
    dispatch(setTempStorage(proxy));
    dispatch(setEditSingleProxyModalState());
  };

  const handleSelected = ({ event, row }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(row));
    }
  };

  return (
    <div id="proxy-table-container" className="account-table-container">
      <div className="proxy-table-stick-header proxy">
        <div>Proxy</div>
        <div style={{ marginLeft: "-3px" }}>User</div>
        <div style={{ marginLeft: "-3px" }}>Password</div>
        <div>
          {selectedItem?.length > 0 &&
            `${selectedItem?.length} Proxies Selected`}
        </div>
      </div>
      <div className="account-table-scroll proxy">
        <List
          itemData={data?.list}
          className="List"
          height={685}
          itemCount={data?.list?.length}
          itemSize={45}
          width="100%"
        >
          {({ data, index, style, isScrolling }) => {
            return (
              <ProxyTableRow
                {...{ data, index, style, isScrolling }}
                onDelete={handleDeleteRow}
                onEdit={handleEditSingleProxy}
                onCopy={handleCopyProxy}
                onPress={handleSelected}
                activeRow={selectedItem?.filter(
                  (item) => item.id === data[index].id
                )}
                key={`task-table-row-${data[index].id}`}
              />
            );
          }}
        </List>
      </div>
      {data["type"] === "proxy-group" && (
        <div className="task-scrollable-bottom-btns-wrapper">
          {selectedItem?.length > 0 ? (
            <div
              style={{ background: "rgba(240, 85, 85, 0.05)" }}
              onClick={handleSelectedDelete}
              className="task-scrollable-bottom-btn btn"
            >
              <img src={trash} alt="trash-icon" />
              <span>Delete Selected Proxies</span>
            </div>
          ) : (
            <div
              style={{ background: "rgba(240, 85, 85, 0.05)" }}
              onClick={handleDeleteAllProxy}
              className="task-scrollable-bottom-btn btn"
            >
              <img src={trash} alt="trash-icon" />
              <span>Delete All Proxies</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProxyTable;
