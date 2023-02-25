import { v4 as uuid } from "uuid";
import {
  appendProfileList,
  fetchProfileList,
  fetchSelectedItem,
  fetchSelectedItemList,
  setSelectedItemList,
  setSelectItem,
} from "../counterSlice";

export const addProfileInList = (group) => (dispatch, getState) => {
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...group };
  tempObj["id"] = uuid();
  let combiner = [...tempList, tempObj];
  dispatch(appendProfileList(combiner));
};

export const deleteProfileGroup = (group) => (dispatch, getState) => {
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...group };
  if (tempObj["type"] === "profile-group") {
    let afterFilter = tempList.filter((data) => data.id !== tempObj["id"]);
    dispatch(appendProfileList(afterFilter));
    dispatch(setSelectItem({}));
  }
};

export const addProfileInGroup = (group) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...item };
  if (tempObj["type"] === "profile-group") {
    let tempItemList = [...tempObj["list"]];
    let currentProfile = { ...group };
    currentProfile["id"] = uuid();
    let itemCombiner = [...tempItemList, currentProfile];
    tempObj["list"] = itemCombiner;
    let update = tempList.map((profile) => {
      if (profile["id"] === tempObj["id"]) {
        return tempObj;
      }
      return profile;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendProfileList(update));
  }
};

export const deleteProfileRowFromTable = (row) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...item };
  if (tempObj["type"] === "profile-group") {
    let currentProfile = [...tempObj["list"]];
    let afterRemove = currentProfile.filter((data) => data["id"] !== row["id"]);
    tempObj["list"] = afterRemove;
    let update = tempList.map((profile) => {
      if (profile["id"] === tempObj["id"]) {
        return tempObj;
      }
      return profile;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendProfileList(update));
  }
};

export const copySingleRowFromTable = (row) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...item };
  if (tempObj["type"] === "profile-group") {
    let currentProfile = [...tempObj["list"]];
    let copyItem = { ...row };
    copyItem["id"] = uuid();
    let combiner = [...currentProfile, copyItem];
    tempObj["list"] = combiner;
    let update = tempList.map((profile) => {
      if (profile["id"] === tempObj["id"]) {
        return tempObj;
      }
      return profile;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendProfileList(update));
  }
};

export const updateProfileGroupName = (taskGroup) => (dispatch, getState) => {
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...taskGroup };
  let after = tempList.map((p) => {
    if (p["id"] === tempObj["id"]) {
      return tempObj;
    }
    return p;
  });
  dispatch(setSelectItem(tempObj));
  dispatch(appendProfileList(after));
};

export const duplicateSelectedProfile = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(copySingleRowFromTable(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

export const deletedSelectedProfile = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(deleteProfileRowFromTable(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

export const deletAllRowFromTable = () => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const currentList = fetchProfileList(getState());
  let tempList = [...currentList];
  let tempObj = { ...item };
  tempObj["list"] = [];
  let afterDel = tempList.map((p) => {
    if (p["id"] === tempObj["id"]) {
      return tempObj;
    }
    return p;
  });
  dispatch(setSelectItem(tempObj));
  dispatch(appendProfileList(afterDel));
};

export const editSingleProfile = (profile) => (dispatch, getState) => {
  const currentList = fetchProfileList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let tempObj = { ...item };
  let editedProfile = { ...profile };
  let prevItemList = [...tempObj["list"]];
  let afterReplace = prevItemList.map((data) => {
    if (data["id"] === editedProfile["id"]) {
      return editedProfile;
    }
    return data;
  });
  tempObj["list"] = afterReplace;
  let afterDel = tempList.map((p) => {
    if (p["id"] === tempObj["id"]) {
      return tempObj;
    }
    return p;
  });
  dispatch(setSelectItem(tempObj));
  dispatch(appendProfileList(afterDel));
};
