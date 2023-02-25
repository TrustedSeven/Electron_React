import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  setTempStorage,
  setTriggerModal,
  addingRowInArray,
  setTaskModalState,
  fetchSelectedItemList,
} from "../../../features/counterSlice";
import {
  copySingleTaskRow,
  deletAllTasksRows,
  deleteSelectedTask,
  deleteTaskGroupRow,
  duplicateSelectedTask,
} from "../../../features/logic/task-reducer-logic";
import Table from "react-base-table";
import wcopy from "../../../assests/images/wcopy.svg";
import trash from "../../../assests/images/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  startSingleTask,
  stopSingleTask,
} from "../../../helper/electron-bridge";
import { ToastInfo, MAX_TOAST_LIMIT, hideToaster } from "../../../toaster";
import { SameTaskModalForDifferentSites } from "../../../config/modal-config";
import ActionColumn from "../task-table-row/TaskTableRow";
const {
  updateDisplayedTasks,
  updateDisplayedTaskID,
} = require("../../../helper/electron-bridge");
let sentFirstRow = false;

function TaskScrollabletable({ item, sortTable, isStartAll }) {
  sentFirstRow = false;
  let count = 0;
  const dispatch = useDispatch();
  const tableHeaderRef = useRef(null);
  const [data, setData] = useState([]);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);
  const selectedItem = useSelector(fetchSelectedItemList);
  /**
   * code run when componenet did mount
   */
  useEffect(() => {
    let width = tableHeaderRef.current.offsetWidth;
    let height = tableHeaderRef.current.offsetHeight;
    setTableWidth(width);
    setTableHeight(height);
  }, [tableHeaderRef]);

  useEffect(() => {
    let taskTableData = Object.keys(sortTable).map((key) => sortTable[key]);
    setData(taskTableData);
  }, [sortTable]);

  /**
   * handler to delete row
   */
  const handleDeleteRow = (data) => {
    count++;
    if (count <= MAX_TOAST_LIMIT) {
      ToastInfo("1 Task deleted!!");
    } else {
      hideToaster();
    }
    dispatch(deleteTaskGroupRow(data));
  };

  /**
   * handler to copy row
   */
  const handleCopyTaskRow = (row) => {
    count++;
    if (count <= MAX_TOAST_LIMIT) {
      ToastInfo("1 Task copied!!");
    } else {
      hideToaster();
    }
    dispatch(copySingleTaskRow(row));
  };

  /**
   * handler to copy selected  row
   */
  const handleCopySelectRow = () => {
    dispatch(duplicateSelectedTask());
  };

  /**
   * handler to delete selected  row
   */
  const handleDeleteSelectRow = () => {
    dispatch(deleteSelectedTask());
  };

  /**
   * handler to edit  row
   */
  const handleEditRow = (row) => {
    const { taskSite } = item;
    dispatch(setTriggerModal("edit-task-row"));
    dispatch(setTempStorage(row));
    if (SameTaskModalForDifferentSites.includes(taskSite)) {
      dispatch(setTaskModalState("ssense"));
    } else if (taskSite === "amazon") {
      dispatch(setTaskModalState(taskSite));
    } else if (taskSite === "bestbuyca") {
      dispatch(setTaskModalState(taskSite));
    } else {
      dispatch(setTaskModalState("canadiancomputers"));
    }
  };

  /**
   * handler to delete All  row
   */
  const handleDeleteAlltask = () => {
    dispatch(deletAllTasksRows());
  };

  /**
   * handler to  select  row
   */
  const handleClick = ({ event, task }) => {
    if (event.shiftKey) {
      dispatch(addingRowInArray(task));
    }
  };

  /**
   * handler to start task
   */
  const handleStartTask = (task) => {
    startSingleTask(task);
  };

  /**
   * handler to send displayed task id
   */
  const extractDisplayedTask = (props) => {
    const { startIndex, stopIndex } = props;
    if (data && data.length > 0) {
      let currentTasksOnScreen = data
        ?.slice(startIndex, stopIndex + 1)
        .map((tempTask) => tempTask.id);
      updateDisplayedTasks(currentTasksOnScreen);
    }
  };

  // here we handle stop task event and send ipc to main
  const handleStopTask = (task) => {
    stopSingleTask(task.id);
  };

  const handleRowRendered = (taskID) => {
    //if (sentFirstRow) return;
    //  sentFirstRow = true;
    updateDisplayedTaskID(taskID);
  };

  const getColumnRendrer = (state) => {
    return state === "amazon"
      ? [
          {
            key: "index",
            title: "#",
            width: 100,
            cellRenderer: ({ rowIndex }) => {
              return <div>{rowIndex + 1}</div>;
            },
          },
          {
            dataKey: "keyword",
            key: "keyword",
            title: "Title",
            width: 150,
          },
          {
            dataKey: "mode",
            key: "mode",
            title: "Mode",
            width: 200,
          },
          {
            dataKey: "",
            key: "profileName",
            title: "profile",
            width: 151,
            cellRenderer: ({ rowData }) => {
              return <div>{rowData["selectedAccount"]?.split(":")[0]}</div>;
            },
          },
          {
            dataKey: "size",
            key: "size",
            title: "Sizes",
            width: 151,
          },
          {
            dataKey: "status",
            key: "status",
            title: "Status",
            width: 300,
            cellRenderer: ({ rowData }) => {
              return (
                <div
                  style={{
                    color:
                      rowData.color !== undefined ? rowData.color : "#ffffff",
                  }}
                >
                  {`${rowData.status}`.length > 30
                    ? `${rowData.status}`.substring(0, 30) + "..."
                    : rowData.status}
                </div>
              );
            },
          },
          {
            key: "actions",
            title: "",
            width: 150,
            cellRenderer: ({ rowData }) => {
              return (
                <ActionColumn
                  data={rowData}
                  onStop={handleStopTask}
                  onEdit={handleEditRow}
                  onDelete={handleDeleteRow}
                  onCopy={handleCopyTaskRow}
                  onStart={handleStartTask}
                  //onRendered={handleRowRendered}
                />
              );
            },
          },
        ]
      : [
          {
            key: "index",
            title: "#",
            width: 100,
            cellRenderer: ({ rowIndex }) => {
              return <div>{rowIndex + 1}</div>;
            },
          },
          {
            dataKey: "keyword",
            key: "keyword",
            title: "Title",
            width: 150,
          },
          {
            dataKey: "mode",
            key: "mode",
            title: "Mode",
            width: 200,
          },
          {
            dataKey: "profileName",
            key: "profileName",
            title: "profile",
            width: 151,
          },
          {
            dataKey: "size",
            key: "size",
            title: "Sizes",
            width: 151,
          },
          {
            dataKey: "status",
            key: "status",
            title: "Status",
            width: 300,
            cellRenderer: ({ rowData }) => {
              return (
                <div
                  style={{
                    color:
                      rowData.color !== undefined ? rowData.color : "#ffffff",
                  }}
                >
                  {`${rowData.status}`.length > 30
                    ? `${rowData.status}`.substring(0, 30) + "..."
                    : rowData.status}
                </div>
              );
            },
          },
          {
            key: "actions",
            title: "",
            width: 150,
            cellRenderer: ({ rowData }) => {
              return (
                <ActionColumn
                  data={rowData}
                  onStop={handleStopTask}
                  onEdit={handleEditRow}
                  onDelete={handleDeleteRow}
                  onCopy={handleCopyTaskRow}
                  onStart={handleStartTask}
                  //onRendered={handleRowRendered}
                />
              );
            },
          },
        ];
  };

  return (
    <div className="task-scrollable-container" ref={tableHeaderRef}>
      <div className="task-scrollable-sticky-header">
        <div>#</div>
        <div>Keywords/ID</div>
        <div>Mode</div>
        <div>{item["taskSite"] === "amazon" ? "Account" : "Profile"}</div>
        <div>Sizes</div>
        <div>Status</div>
        <div style={{ paddingRight: "12px" }}>
          {selectedItem?.length > 0 && `${selectedItem?.length} Tasks Selected`}
        </div>
      </div>
      <div className="task-scrollable-height task-table-smart-scroll-baseid">
        {data.length > 0 && (
          <Table
            fixed
            data={data}
            headerHeight={0}
            width={tableWidth}
            height={tableHeight - 90}
            // onRowsRendered={extractDisplayedTask}
            columns={getColumnRendrer(item["taskSite"])}
            rowEventHandlers={{
              onClick: ({ rowData, event }) => {
                handleClick({ event, task: rowData });
              },
            }}
            rowClassName={({ rowData }) =>
              selectedItem?.filter((item) => item.id === rowData.id).length > 0
                ? "selected-table-row"
                : ""
            }
          />
        )}
      </div>
      {selectedItem?.length > 0 ? (
        <div className="task-scrollable-bottom-btns-wrapper">
          <div
            onClick={handleCopySelectRow}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={wcopy} alt="" />
            <span>Duplicate Selected Tasks</span>
          </div>
          <div
            style={{ background: "rgba(240, 85, 85, 0.05)" }}
            onClick={handleDeleteSelectRow}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={trash} alt="" />
            <span>Delete Selected Tasks</span>
          </div>
        </div>
      ) : (
        Object.keys(item).length > 0 && (
          <div className="task-scrollable-bottom-btns-wrapper">
            <div
              onClick={handleDeleteAlltask}
              style={{ background: "rgba(240, 85, 85, 0.05)" }}
              className="task-scrollable-bottom-btn btn"
            >
              <img src={trash} alt="" />
              <span>Delete All Tasks</span>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default TaskScrollabletable;
