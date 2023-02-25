import { v4 as uuid } from "uuid";
import {
  appendProxyGroup,
  fetchProxyGroupList,
  fetchSelectedItem,
  fetchSelectedItemList,
  setSelectedItemList,
  setSelectItem,
} from "../counterSlice";

export const addProxyGroup = (group) => (dispatch, getState) => {
  const { list, data } = group;
  const currentList = fetchProxyGroupList(getState());
  let tempList = [...currentList];
  let tempObj = { ...data };
  tempObj["list"] = list.map((proxy) => {
    let obj = {};
    obj["title"] = proxy;
    obj["id"] = uuid();
    return obj;
  });
  tempObj["id"] = uuid();
  console.log(tempObj);
  tempObj["proxies"] = list.map((data) => data).join("\n");
  let combiner = [...tempList, tempObj];
  dispatch(appendProxyGroup(combiner));
};

export const deleteProxyGroup = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let tempList = [...currentList];
  let tempObj = { ...group };
  if (tempObj["type"] === "proxy-group") {
    let afterFilter = tempList.filter((data) => data.id !== tempObj["id"]);
    dispatch(setSelectItem({}));
    dispatch(appendProxyGroup(afterFilter));
  }
};

export const deleteSingleRow = (row) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let currentItem = { ...item };
  let listArray = [...currentItem.list];
  let afterFilter = listArray.filter((data) => data.id !== row.id);
  currentItem["proxies"] = afterFilter
    .map((proxy) => proxy["title"])
    .join("\n");
  currentItem["list"] = afterFilter;
  let update = tempList.map((proxy) => {
    if (proxy["id"] === currentItem["id"]) {
      return currentItem;
    }
    return proxy;
  });
  dispatch(setSelectItem(currentItem));
  dispatch(appendProxyGroup(update));
};

export const copySingleProxyRow = (row) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let currentItem = { ...item };
  let listArray = [...currentItem["list"]];
  let obj = { ...row };
  obj["id"] = uuid();
  let combiner = [...listArray, obj];
  currentItem["list"] = combiner;
  currentItem["proxies"] = combiner.map((c) => c["title"]).join("\n");
  let update = tempList.map((proxy) => {
    if (proxy["id"] === currentItem["id"]) {
      return currentItem;
    }
    return proxy;
  });
  dispatch(setSelectItem(currentItem));
  dispatch(appendProxyGroup(update));
};

export const deleteSelectedProxy = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(deleteSingleRow(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

export const deleteAllProxyRow = () => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let currentItem = { ...item };
  currentItem["list"] = [];
  currentItem["proxies"] = "";
  let update = tempList.map((proxy) => {
    if (proxy["id"] === currentItem["id"]) {
      return currentItem;
    }
    return proxy;
  });
  dispatch(setSelectItem(currentItem));
  dispatch(appendProxyGroup(update));
};

export const updateProxyGroup = (group) => (dispatch, getState) => {
  const { list } = group;
  const currentList = fetchProxyGroupList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let currentItem = { ...item };
  currentItem["list"] = list.map((proxy) => {
    let obj = {};
    obj["title"] = proxy;
    obj["id"] = uuid();
    return obj;
  });
  currentItem["proxies"] = currentItem["list"]
    .map((proxy) => proxy["title"])
    .join("\n");

  let afterFilter = tempList.map((obj) => {
    if (obj["id"] === currentItem["id"]) {
      return currentItem;
    }
    return obj;
  });
  dispatch(setSelectItem(currentItem));
  dispatch(appendProxyGroup(afterFilter));
};

export const editSingleProxy = (singleproxy) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const item = fetchSelectedItem(getState());
  let tempList = [...currentList];
  let currentItem = { ...item };
  let tempItemList = [...currentItem["list"]];
  let tempObj = { ...singleproxy };
  let afterUpdate = tempItemList.map((list) => {
    if (list["id"] === tempObj["id"]) {
      return tempObj;
    }
    return list;
  });
  currentItem["proxies"] = afterUpdate.map((pro) => pro["title"]).join("\n");
  currentItem["list"] = afterUpdate;
  let afterFilter = tempList.map((data) => {
    if (data["id"] === currentItem["id"]) {
      return currentItem;
    }
    return data;
  });
  dispatch(setSelectItem(currentItem));
  dispatch(appendProxyGroup(afterFilter));
};
