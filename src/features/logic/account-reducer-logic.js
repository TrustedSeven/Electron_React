import { v4 as uuid } from "uuid";
import { selectedSessionGroup } from "../../helper/electron-bridge";
import {
  appendAccountsGroupList,
  appendSessionsGroupList,
  fetchGroupAccountsList,
  fetchGroupSessionsList,
  fetchSelectedItem,
  fetchSelectedItemList,
  setSelectedItemList,
  setSelectItem,
  fetchEditModalState,
  fetchTempStorageState,
} from "../counterSlice";

export const extractAccountsFromString =
  (accountGroup) => (dispatch, getState) => {
    const { data, list } = accountGroup;
    const item = fetchSelectedItem(getState());
    const isEdit = fetchEditModalState(getState());
    let tempObj = { ...item };
    const { account } = data;
    if (tempObj["type"] === "account-group") {
      const accountList = fetchGroupAccountsList(getState());
      let tempList = [...accountList];
      let prevAccountList = [...tempObj["accountList"]];
      let accountArr = list.map((account) => {
        let obj = {};
        obj["id"] = uuid();
        obj["account"] = account;
        return obj;
      });
      let combiner = [...prevAccountList, ...accountArr];
      if (isEdit !== "edit-account") {
        tempObj["accountList"] = combiner;
        tempObj["account"] = combiner.map((data) => data["account"]).join("\n");
      } else {
        tempObj["accountList"] = [...accountArr];
        tempObj["account"] = account;
      }
      let afterFilter = tempList.map((filter) => {
        if (filter["id"] === tempObj["id"]) {
          return tempObj;
        }
        return filter;
      });
      dispatch(setSelectItem(tempObj));
      dispatch(appendAccountsGroupList(afterFilter));
    } else if (tempObj["type"] === "session-group") {
      const sessionList = fetchGroupSessionsList(getState());
      let tempList = [...sessionList];
      let preSessionList = [...tempObj["sessionList"]];
      let accountArr = list.map((account) => {
        let obj = {};
        obj["id"] = uuid();
        obj["account"] = account;
        obj["status"] = "Idle";
        return obj;
      });
      let combiner = [...preSessionList, ...accountArr];
      if (isEdit !== "edit-account") {
        tempObj["sessionList"] = combiner;
        tempObj["account"] = combiner.map((data) => data["account"]).join("\n");
      } else {
        tempObj["sessionList"] = [...accountArr];
        tempObj["account"] = account;
      }
      let afterFilter = tempList.map((filter) => {
        if (filter["id"] === tempObj["id"]) {
          return tempObj;
        }
        return filter;
      });
      selectedSessionGroup(tempObj);
      dispatch(setSelectItem(tempObj));
      dispatch(appendSessionsGroupList(afterFilter));
    }
  };

export const deleteAccountRowFromGroup = (row) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  let tempObj = { ...item };
  if (tempObj["type"] === "account-group") {
    const accountList = fetchGroupAccountsList(getState());
    let tempList = [...accountList];
    let tempGroupAccountList = [...tempObj["accountList"]];
    let afterDel = tempGroupAccountList.filter(
      (data) => data["id"] !== row["id"]
    );
    tempObj["account"] = afterDel.map((data) => data["account"]).join("\n");
    tempObj["accountList"] = afterDel;
    let afterFilter = tempList.map((filter) => {
      if (filter["id"] === tempObj["id"]) {
        return tempObj;
      }
      return filter;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendAccountsGroupList(afterFilter));
  } else if (tempObj["type"] === "session-group") {
    const sessionList = fetchGroupSessionsList(getState());
    let tempList = [...sessionList];
    let tempGroupAccountList = [...tempObj["sessionList"]];
    let afterDel = tempGroupAccountList.filter(
      (data) => data["id"] !== row["id"]
    );
    tempObj["account"] = afterDel.map((data) => data["account"]).join("\n");
    tempObj["sessionList"] = afterDel;
    let afterFilter = tempList.map((filter) => {
      if (filter["id"] === tempObj["id"]) {
        return tempObj;
      }
      return filter;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendSessionsGroupList(afterFilter));
  }
};

export const deleteSelectedAccount = () => (dispatch, getState) => {
  const list = fetchSelectedItemList(getState());
  let tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    dispatch(deleteAccountRowFromGroup(tempList[i]));
  }
  dispatch(setSelectedItemList([]));
};

export const togglePassword = () => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  let tempObj = { ...item };
  if (tempObj["type"] === "account-group") {
    const accountList = fetchGroupAccountsList(getState());
    let tempList = [...accountList];
    if (tempObj["passwordStatus"]) {
      tempObj["passwordStatus"] = false;
    } else {
      tempObj["passwordStatus"] = true;
    }
    let afterFilter = tempList.map((filter) => {
      if (filter["id"] === tempObj["id"]) {
        return tempObj;
      }
      return filter;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendAccountsGroupList(afterFilter));
  } else if (tempObj["type"] === "session-group") {
    const sessionList = fetchGroupSessionsList(getState());
    let tempList = [...sessionList];
    if (tempObj["passwordStatus"]) {
      tempObj["passwordStatus"] = false;
    } else {
      tempObj["passwordStatus"] = true;
    }
    let afterFilter = tempList.map((filter) => {
      if (filter["id"] === tempObj["id"]) {
        return tempObj;
      }
      return filter;
    });
    dispatch(setSelectItem(tempObj));
    dispatch(appendSessionsGroupList(afterFilter));
  }
};

export const editSingleAccountRow = (row) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const accountList = fetchGroupAccountsList(getState());
  const tempStorage = fetchTempStorageState(getState());
  let tempAccountList = [...accountList];
  let tempItem = { ...item };
  let tempList = [...tempItem["accountList"]];
  // here we get edit row and its id will remain same
  let obj = { ...row };
  let afterEdit = tempList.map((data) => {
    if (data["id"] === tempStorage["id"]) {
      return { ...tempStorage, account: obj["account"] };
    }
    return data;
  });
  tempItem["accountList"] = afterEdit;
  tempItem["account"] = afterEdit.map((data) => data["account"]).join("\n");
  let afterAccountList = tempAccountList.map((data) => {
    if (data["id"] === tempItem["id"]) {
      return tempItem;
    }
    return data;
  });
  dispatch(setSelectItem(tempItem));
  dispatch(appendAccountsGroupList(afterAccountList));
};

export const editSingleSessionRow = (sessionRow) => (dispatch, getState) => {
  const item = fetchSelectedItem(getState());
  const sessionList = fetchGroupSessionsList(getState());
  const tempStorage = fetchTempStorageState(getState());
  let tempAccountList = [...sessionList];
  let tempItem = { ...item };
  let tempList = [...tempItem["sessionList"]];
  let obj = { ...sessionRow };
  let afterEdit = tempList.map((data) => {
    if (data["id"] === tempStorage["id"]) {
      return { ...tempStorage, account: obj["account"] };
    }
    return data;
  });
  tempItem["sessionList"] = afterEdit;
  tempItem["account"] = afterEdit.map((data) => data["account"]).join("\n");
  let afterAccountList = tempAccountList.map((data) => {
    if (data["id"] === tempItem["id"]) {
      return tempItem;
    }
    return data;
  });
  dispatch(setSelectItem(tempItem));
  dispatch(appendSessionsGroupList(afterAccountList));
};

export const updateSessionStatus = (group) => (dispatch, getState) => {
  const sessionList = fetchGroupSessionsList(getState());
  let tempList = [...sessionList];
  let tempGroup = { ...group };
  let afterUpdate = tempList.map((d) => {
    if (d["id"] === tempGroup["id"]) return tempGroup;
    return d;
  });
  dispatch(setSelectItem(tempGroup));
  dispatch(appendSessionsGroupList(afterUpdate));
};
