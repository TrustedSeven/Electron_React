import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { updateCurrentState } from "../helper/electron-bridge";

export const STATE_KEY = "arcState";

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    setToasterCounter: (state, action) => {
      state.toasterCounter = state.toasterCounter + 1;
    },
    resetToasterCounter: (state) => {
      state.toasterCounter = 0;
    },
    setAppVersion: (state, action) => {
      state.appVersion = action.payload;
    },
    setUpdateAvailabledVersion: (state, action) => {
      state.updateAvailableVersion = action.payload;
    },
    setSelectItem: (state, action) => {
      state.selectItem = action.payload;
    },
    setUserState: (state, action) => {
      state.loggedUser = action.payload;
    },
    setTaskModalState: (state, action) => {
      const { payload } = action;
      state.taskModalState[payload] = !state.taskModalState[payload];
    },
    setEditTaskGroupModal: (state) => {
      state.editTaskGroupModlaState = !state.editTaskGroupModlaState;
    },
    setProfileModalState: (state) => {
      state.profileModalState = !state.profileModalState;
    },
    setProfileGroupModalState: (state) => {
      state.profileGroupModalState = !state.profileGroupModalState;
    },
    setProxyGroupModalState: (state) => {
      state.proxyGroupModalState = !state.proxyGroupModalState;
    },
    setAddAccountModalState: (state) => {
      state.addAcountModalState = !state.addAcountModalState;
    },
    setTaskGroupModalState: (state) => {
      state.taskGroupModalState = !state.taskGroupModalState;
    },
    setEditGroupNameModalState: (state, action) => {
      state.editGroupNameModal = action.payload;
    },
    setEditSingleProxyModalState: (state, action) => {
      state.editSingleProxyModalState = !state.editSingleProxyModalState;
    },
    appendProxyGroup: (state, action) => {
      state.proxyGroupList = action.payload;
    },
    appendProfileList: (state, action) => {
      state.profileList = action.payload;
    },
    appendTaskGroupList: (state, action) => {
      state.taskGroupList = action.payload;
    },
    appendAccountsGroupList: (state, action) => {
      state.accountsGroupList = action.payload;
    },
    appendSessionsGroupList: (state, action) => {
      state.sessionsGroupList = action.payload;
    },
    appendCaptchaCardList: (state, action) => {
      state.captchaCardsList = action.payload;
    },
    addOpenCaptchaSolver: (state, action) => {
      state.openSolverModal = action.payload;
    },
    togglerTextPassword: (state, action) => {
      state.displayPassword = action.payload;
    },
    toggleProfilCardDisplay: (state, action) => {
      state.profileCardDisplay = action.payload;
    },
    setTriggerModal: (state, action) => {
      state.editModalTrigered = action.payload;
    },
    setSelectedItemList: (state, action) => {
      state.selectedItemList = action.payload;
    },
    setTempStorage: (state, action) => {
      state.tempStorage = action.payload;
    },
    getCurrentState: (state) => {
      updateCurrentState(JSON.parse(JSON.stringify(state)));
    },
    setSettingState: (state, action) => {
      state.settingState = action.payload;
    },
    appendNewCheckoutInList: (state, action) => {
      state.dashboardState.checkoutTable = action.payload;
    },
    setDashboardAnalytics: (state, action) => {
      state.dashboardState.analytics = action.payload;
    },
    setDashboardStatistics: (state, action) => {
      state.dashboardState.statistics = action.payload;
    },
    showCustomToaster: (state, action) => {
      state.sendToaster = action.payload;
    },
    setToggleStartStopTask: (state) => {
      state.isStartAllTasks = !state.isStartAllTasks;
    },
    setSettingNotificationState: (state, action) => {
      state.settingState.notification = action.payload;
      console.log(state.settingState);
    },
    setTempTaskGroupStorage: (state, action) => {
      state.tempTaskStorage = action.payload;
    },
  },
});

export const {
  setAppVersion,
  setToasterCounter,
  resetToasterCounter,
  setSelectItem,
  setUserState,
  setTaskModalState,
  setEditTaskGroupModal,
  setProfileModalState,
  setProfileGroupModalState,
  setProxyGroupModalState,
  setAddAccountModalState,
  setTaskGroupModalState,
  setEditGroupNameModalState,
  setEditSingleProxyModalState,
  setUpdateAvailabledVersion,
  appendProxyGroup,
  appendProfileList,
  appendTaskGroupList,
  appendAccountsGroupList,
  appendSessionsGroupList,
  appendCaptchaCardList,
  addOpenCaptchaSolver,
  togglerTextPassword,
  toggleProfilCardDisplay,
  setTriggerModal,
  setSelectedItemList,
  setTempStorage,
  getCurrentState,
  setSettingState,
  appendNewCheckoutInList,
  setDashboardAnalytics,
  setDashboardStatistics,
  showCustomToaster,
  setToggleStartStopTask,
  setSettingNotificationState,
  setTempTaskGroupStorage,
} = counterSlice.actions;

export const fetchLatestToasterState = (state) => state[STATE_KEY].sendToaster;
export const fetchNewVersionAvailable = (state) =>
  state[STATE_KEY].updateAvailableVersion;
export const fetchToasterCounterState = (state) =>
  state[STATE_KEY].toasterCounter;
export const fetchSEditProxyModalSate = (state) =>
  state[STATE_KEY].editSingleProxyModalState;
export const fetchEditGroupModalState = (state) =>
  state[STATE_KEY].editGroupNameModal;
export const fetchSelectedItem = (state) => state[STATE_KEY].selectItem;
export const fetchTempStorageState = (state) => state[STATE_KEY].tempStorage;
export const fetchPasswordTogglerState = (state) =>
  state[STATE_KEY].displayPassword;
export const fetchLoggedUserState = (state) => state[STATE_KEY].loggedUser;
export const fetchEditModalState = (state) =>
  state[STATE_KEY].editModalTrigered;
export const fetchSelectedItemList = (state) =>
  state[STATE_KEY].selectedItemList;
export const fetchCurrentAppVersion = (state) => state[STATE_KEY].appVersion;
// Task  Selector
export const fetchtempTaskStorageState = (state) =>
  state[STATE_KEY].tempTaskStorage;
export const fetchStartStopAlltaskState = (state) =>
  state[STATE_KEY].isStartAllTasks;
export const fetchCanadaComputersTaskModalState = (state) =>
  state[STATE_KEY].taskModalState.canadiancomputers;
export const fetchCanadianTireModalState = (state) =>
  state[STATE_KEY].taskModalState.canadiantire;
export const fetchSsenseTaskModalState = (state) =>
  state[STATE_KEY].taskModalState.ssense;
export const fetchEbGamesModalState = (state) =>
  state[STATE_KEY].taskModalState.ebgames;
export const fetchSdmModalState = (state) =>
  state[STATE_KEY].taskModalState.sdm;
export const fetchTruModalState = (state) =>
  state[STATE_KEY].taskModalState.tru;
export const fetchChaptersModalState = (state) =>
  state[STATE_KEY].taskModalState.chapters;
export const fetchTaskGroupModalState = (state) =>
  state[STATE_KEY].taskGroupModalState;
export const fetchTaskGroupListState = (state) =>
  state[STATE_KEY].taskGroupList;
export const fetchEditTaskGroupModalState = (state) =>
  state[STATE_KEY].editTaskGroupModlaState;
export const fetchAmazonTaskModalState = (state) =>
  state[STATE_KEY].taskModalState.amazon;
export const fetchBestBuyCaModlaState = (state) =>
  state[STATE_KEY].taskModalState.bestbuyca;

// Profile  Selector
export const fetchProfileModalState = (state) =>
  state[STATE_KEY].profileModalState;
export const fetchProfileGroupModalState = (state) =>
  state[STATE_KEY].profileGroupModalState;
export const fetchProfileList = (state) => state[STATE_KEY].profileList;
export const fetchDisplayCardStyles = (state) =>
  state[STATE_KEY].profileCardDisplay;

// Proxy  Selector
export const fetchProxyGroupModalState = (state) =>
  state[STATE_KEY].proxyGroupModalState;
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroupList;

//  Account  Selector
export const fetchAddAccountModalState = (state) =>
  state[STATE_KEY].addAcountModalState;
export const fetchGroupAccountsList = (state) =>
  state[STATE_KEY].accountsGroupList;
export const fetchGroupSessionsList = (state) =>
  state[STATE_KEY].sessionsGroupList;

// Captcha Selector
export const fetchCaptchaList = (state) => state[STATE_KEY].captchaCardsList;

export default counterSlice.reducer;

// ADDING LOGIC FOR SELECT TABLE ROW
export const addingRowInArray = (obj) => (dispatch, getState) => {
  const selectedItem = fetchSelectedItemList(getState());
  let tempList = [...selectedItem];
  let index = tempList.findIndex((data) => data.id === obj["id"]);
  if (index === -1) {
    tempList.push(obj);
  } else {
    tempList = tempList.filter((data) => data["id"] !== obj["id"]);
  }
  dispatch(setSelectedItemList(tempList));
};

export const removeSelectedItem = (item) => (dispatch, getState) => {
  const selectedItem = fetchSelectedItemList(getState());
  let tempList = [...selectedItem];
  tempList = tempList.filter((data) => data["id"] !== item["id"]);
  dispatch(setSelectedItemList(tempList));
};

//  fetch hse ssense account listArray
export const fetchSsenseAccountList = (state) =>
  state[STATE_KEY].accountsGroupList[1]["accountList"];

export const fetchMicrosoftSessionArray = (state) =>
  state[STATE_KEY].sessionsGroupList[1]["sessionList"];

export const fetchAmazonSessionArray = (state) =>
  state[STATE_KEY].sessionsGroupList[0]["sessionList"];

// setting selector;
export const fetchSettingPageState = (state) => state[STATE_KEY].settingState;
// dashboard
export const fetchCheckoutTableState = (state) =>
  state[STATE_KEY].dashboardState.checkoutTable;
export const fetchDasboardStatisticsState = (state) =>
  state[STATE_KEY].dashboardState.statistics;
export const fetchDashboardAnalyticsState = (state) =>
  state[STATE_KEY].dashboardState.analytics;
