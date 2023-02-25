import { v4 as uuid } from "uuid";
import {
  appendTaskGroupList,
  fetchSelectedItem,
  fetchSelectedItemList,
  fetchTaskGroupListState,
  setSelectedItemList,
  setSelectItem,
  setTriggerModal,
} from "../counterSlice";
import {
  deleteAllTasks,
  createTaskGroup,
  updateTaskGroupValues,
  deleteTaskGroupID,
} from "../../helper/electron-bridge";

/**
 * Created new task group
 * @param  taskgroup
 */
export const addDataInTaskGroup = (taskGroup) => (dispatch, getState) => {
  const currentGroup = fetchTaskGroupListState(getState());
  let tempGroup = { ...currentGroup };
  let tempObj = { ...taskGroup };
  const id = uuid();
  tempObj["id"] = id;
  createTaskGroup(tempObj);
  let combiner = { ...tempGroup, [id]: tempObj };
  dispatch(appendTaskGroupList(combiner));
};

/**
 * Deleted task group
 * @param  taskgroup
 */
export const deleteTaskGroup = (taskGroup) => (dispatch, getState) => {
  const currentGroup = fetchTaskGroupListState(getState());
  let tempGroup = { ...currentGroup };
  let tempObj = { ...taskGroup };
  if (tempObj["type"] === "task-group") {
    deleteTaskGroupID(tempObj["id"]);
    delete tempGroup[tempObj["id"]];
    dispatch(appendTaskGroupList(tempGroup));
    dispatch(setSelectItem({}));
  }
};

/**
 * Add new task in  group
 * @param  task
 */
export const addTaskInGroup = (task) => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    let createdTask = { ...task };
    createdTask["id"] = uuid();
    createdTask.taskGroupID = selectedGroup.id;
    let combiner = { ...selectedGroupTable, [createdTask["id"]]: createdTask };
    tempSelectedObj["taskTable"] = combiner;
    tempGroupList[tempSelectedObj["id"]] = {
      ...tempGroupList[tempSelectedObj["id"]],
      taskTable: combiner,
    };
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Delete task from  group
 * @param  task
 */
export const deleteTaskGroupRow = (task) => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    let deletedTask = { ...task };
    delete selectedGroupTable[deletedTask.id];
    tempSelectedObj["taskTable"] = selectedGroupTable;
    tempGroupList[tempSelectedObj["id"]] = {
      ...tempGroupList[tempSelectedObj["id"]],
      taskTable: selectedGroupTable,
    };
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Copy single task
 * @param  task
 */
export const copySingleTaskRow = (task) => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    let tempObj = { ...task };
    tempObj["id"] = uuid();
    let combiner = { ...selectedGroupTable, [tempObj["id"]]: tempObj };
    tempSelectedObj["taskTable"] = combiner;
    tempGroupList[tempSelectedObj["id"]] = {
      ...tempGroupList[tempSelectedObj["id"]],
      taskTable: combiner,
    };
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Duplicate selected task from group
 */
export const duplicateSelectedTask = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(copySingleTaskRow(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

/**
 * Deleted selected task from group
 */
export const deleteSelectedTask = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(deleteTaskGroupRow(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

/**
 * Edit task
 * @param  editedTask
 */
export const editSingleTaskRow = (updatedRow) => (dispatch, getState) => {
  const { data, loop } = updatedRow;
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  let replaceUpdatedRow = null;
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    if (loop === false) {
      selectedGroupTable[data["id"]] = data;
      replaceUpdatedRow = selectedGroupTable;
    } else {
      let tempData = { ...data };
      tempData["id"] = uuid();
      delete selectedGroupTable[data["id"]];
      replaceUpdatedRow = { ...selectedGroupTable, [tempData["id"]]: tempData };
    }
    tempSelectedObj["taskTable"] = replaceUpdatedRow;
    tempGroupList[tempSelectedObj["id"]] = tempSelectedObj;
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Update selected group
 * @param  task
 */
export const updateTaskGroup = (taskGroup) => (dispatch, getState) => {
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let updateTaskGroup = { ...taskGroup };
  let formattedUpdateTaskGroup = {
    errorDelay: updateTaskGroup.errorDelay,
    taskGroupID: updateTaskGroup.id,
    monitorDelay: updateTaskGroup.monitorDelay,
    monitorProxy: updateTaskGroup.monitorProxyID,
    taskGroupName: updateTaskGroup.taskGroupName,
    taskProxy: updateTaskGroup.taskProxyID,
    taskSite: updateTaskGroup.taskSite,
  };
  updateTaskGroupValues(formattedUpdateTaskGroup);
  tempGroupList[updateTaskGroup["id"]] = updateTaskGroup;
  dispatch(setSelectItem(updateTaskGroup));
  dispatch(appendTaskGroupList(tempGroupList));
};

/**
 * Edit all task from selected
 * @param  task
 */
export const editAllTask = (taskData) => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    let editedTaskGroup = { ...taskData };
    let afterUpdated = {};
    let afterEditedAllTask = {};
    Object.keys(editedTaskGroup).forEach((key) => {
      if (editedTaskGroup[key].length > 0) {
        afterUpdated[key] = editedTaskGroup[key];
      }
    });
    Object.keys(selectedGroupTable).forEach((key) => {
      let obj = { ...selectedGroupTable[key], ...afterUpdated };
      afterEditedAllTask[key] = obj;
    });
    tempSelectedObj["taskTable"] = afterEditedAllTask;
    tempGroupList[tempSelectedObj["id"]] = tempSelectedObj;
    dispatch(setTriggerModal(""));
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Deleted all task from group
 * @param  task
 */
export const deletAllTasksRows = () => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    deleteAllTasks(Object.keys(tempSelectedObj["taskTable"]));
    tempSelectedObj["taskTable"] = [];
    tempGroupList[tempSelectedObj["id"]] = tempSelectedObj;
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};

/**
 * Updated task status field
 * @param  task
 */
export const updateSingleTaskStatus = (data) => (dispatch, getState) => {
  const [status, color, id] = data?.split("::");
  if (id !== undefined && data !== undefined && id !== null && data !== null) {
    const selectedGroup = fetchSelectedItem(getState());
    // const currentGroupList = fetchTaskGroupListState(getState());
    // let tempGroupList = { ...currentGroupList };
    let tempSelectedObj = { ...selectedGroup };
    if (tempSelectedObj["type"] === "task-group") {
      let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
      if (id in selectedGroupTable) {
        selectedGroupTable[id] = { ...selectedGroupTable[id], status, color };
        tempSelectedObj["taskTable"] = selectedGroupTable;
        dispatch(setSelectItem(tempSelectedObj));
      }
    }
  }
};

export const updateMultipleTaskStatus = (obj) => (dispatch, getState) => {
  const currentGroup = fetchTaskGroupListState(getState());
  const selectedGroup = fetchSelectedItem(getState());
  if (selectedGroup["type"] === "task-group") {
    let tempSelectedObj = JSON.parse(JSON.stringify(currentGroup));
    for (let x = 0; x < obj.length; x++) {
      if (
        !tempSelectedObj[obj[x].taskGroupID] ||
        !tempSelectedObj[obj[x].taskGroupID].taskTable[obj[x].id]
      )
        continue;
      tempSelectedObj[obj[x].taskGroupID].taskTable[obj[x].id] = {
        ...tempSelectedObj[obj[x].taskGroupID].taskTable[obj[x].id],
        status: obj[x].status,
        color: obj[x].color,
        active: true || obj[x].active,
        keyword: obj[x].title,
        size: obj[x].size,
      };
    }
    tempSelectedObj[selectedGroup.id].type = "task-group";
    dispatch(setSelectItem(tempSelectedObj[selectedGroup.id]));
    dispatch(appendTaskGroupList(tempSelectedObj));
  }
};

export const resetAllTaskGroupStatus = () => (dispatch, getState) => {
  console.log("RESET ALL TASKS");
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempCurrentGroupList = JSON.parse(JSON.stringify(currentGroupList));
  for (let groupID in tempCurrentGroupList) {
    for (let taskID in tempCurrentGroupList[groupID].taskTable) {
      tempCurrentGroupList[groupID].taskTable[taskID].active = false;
      tempCurrentGroupList[groupID].taskTable[taskID].status = "Idle";
    }
  }
  dispatch(appendTaskGroupList(tempCurrentGroupList));
};

export const selctedTaskGroupUpdater = (group) => (dispatch, getState) => {
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  tempGroupList[group.id] = group;
  dispatch(setSelectItem(group));
  dispatch(appendTaskGroupList(tempGroupList));
};

// this function et the active value in store
export const setStartStopAllValue = (value) => (dispatch, getState) => {
  const selectedGroup = fetchSelectedItem(getState());
  const currentGroupList = fetchTaskGroupListState(getState());
  let tempGroupList = { ...currentGroupList };
  let tempSelectedObj = { ...selectedGroup };
  if (tempSelectedObj["type"] === "task-group") {
    let selectedGroupTable = { ...tempSelectedObj["taskTable"] };
    for (let tableID in selectedGroupTable) {
      selectedGroupTable[tableID] = {
        ...selectedGroupTable[tableID],
        active: value,
      };
    }
    tempSelectedObj["taskTable"] = selectedGroupTable;
    tempGroupList[tempSelectedObj["id"]] = tempSelectedObj;
    dispatch(setSelectItem(tempSelectedObj));
    dispatch(appendTaskGroupList(tempGroupList));
  }
};
