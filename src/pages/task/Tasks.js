import React, { useState } from "react";
import "./tasks.css";
import {
  TaskPageRightTop,
  TasksPageDataUsage,
  TaskPageScrollableTable,
  TaskPageRightTopBtnsWrapper,
  TaskPageLeftSmallCardContainer,
} from "../../pages-component";
import {
  setSelectItem,
  fetchSelectedItem,
  setSelectedItemList,
  fetchStartStopAlltaskState,
} from "../../features/counterSlice";
import { hideToaster } from "../../toaster";
import { AppSpacer } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { searchInArrayFunction } from "../../hooks/fuse-search";

function Tasks() {
  const item = useSelector(fetchSelectedItem);
  const isStartAll = useSelector(fetchStartStopAlltaskState);
  const dispatch = useDispatch();
  const [sortTable, setSorTable] = useState([]);
  const [counter, setCounter] = useState(0);

  React.useEffect(() => {
    return () => {
      hideToaster();
      dispatch(setSelectItem({}));
      dispatch(setSelectedItemList([]));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (item["type"] === "task-group") {
      let arr =
        Object.keys(item["taskTable"]).map((key) => item["taskTable"][key]) ||
        [];
      setSorTable(() => {
        return [...arr];
      });
    } else setSorTable([]);
  }, [item]);

  const handleTriggerSort = (value) => {
    if (value?.length > 0) {
      const result = searchInArrayFunction({
        searchText: value,
        searchKey: "TASKS",
        searchInList: sortTable || [],
      });
      if (result.length > 0) {
        setSorTable(result);
      } else setSorTable([]);
    } else {
      let arr =
        Object.keys(item["taskTable"]).map((key) => item["taskTable"][key]) ||
        [];
      setSorTable([...arr]);
    }
  };

  return (
    <div className="task-container">
      <div className="task-container-left">
        <AppSpacer space={20} />
        <TasksPageDataUsage {...{ item }} />
        <TaskPageLeftSmallCardContainer {...{ item }} />
      </div>
      <div className="task-container-right">
        <AppSpacer space={20} />
        <TaskPageRightTop {...{ item }} />
        <TaskPageRightTopBtnsWrapper {...{ item, handleTriggerSort }} />
        <TaskPageScrollableTable
          {...{ item, sortTable, counter, setCounter, isStartAll }}
        />
      </div>
    </div>
  );
}

export default Tasks;
