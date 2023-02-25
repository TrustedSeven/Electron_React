const { ToastInfo } = require("../toaster");
const ipcRenderer = window.require("electron").ipcRenderer;

const COMM_CHANNEL = {
  error: "error",
  warning: "warning",
};
const subscribeListener = () => {
  Object.keys(COMM_CHANNEL).forEach((channel) => {
    ipcRenderer.on(COMM_CHANNEL[channel], (e, data) => {
      let decodeMsg = data.split(":");
      ToastInfo(decodeMsg[0]);
    });
  });
};

const unsSubscribeListener = () => {
  // Object.keys(COMM_CHANNEL).forEach((channel) => {
  //   ipcRenderer.removeListener(COMM_CHANNEL[channel]);
  // });
};
const handleCloseApp = () => ipcRenderer.send("close");

const handleMinimizeApp = () => ipcRenderer.send("minimize");

const authenticateTheUser = (key) => ipcRenderer.invoke("user-auth", key);

// CAPTCHA
const openSolverWindow = (captcha) => ipcRenderer.send("open-solver", captcha);

const deleteSingleCaptcha = (id) => ipcRenderer.send("delete-captcha", id);

const changeCaptchaData = (data) => ipcRenderer.send("captcha-change", data);

const triggerInstanceCreation = () => ipcRenderer.send("create-instance");

const deleteAllCaptchaInstance = () => ipcRenderer.send("delete-all-instance");

// Task ipc renderer
const startSingleTask = (task) => ipcRenderer.send("task-start", task);

const stopSingleTask = (task) => ipcRenderer.send("task-stop", task);

const updateSingleTask = (callback) =>
  ipcRenderer.on("task-status-update", (_, data) => callback(data));

// Task status ipc events
const selectedTaskGroup = (group) =>
  ipcRenderer.send("selected-task-group", group);

const updateTaskGroup = (callback) =>
  ipcRenderer.on("update-selected-task-group", (_, group) => callback(group));

const updateDisplayedTaskID = (tasks) =>
  ipcRenderer.send("update-displayed-taskID", tasks);

const updateDisplayedTasks = (tasks) =>
  ipcRenderer.send("update-displayed-tasks", tasks);

const multipleTasksUpdated = (callback) =>
  ipcRenderer.on("multiple-task-update", (_, list) => callback(list));

const dontUpdateHideTasks = (tasks) =>
  ipcRenderer.send("dont-update-hide-tasks", tasks);

const stopAllTasks = (tasks) => ipcRenderer.send("stop-all-tasks", tasks);

const startAllTasks = (tasks) => ipcRenderer.send("start-all-tasks", tasks);

const stopTask = (id) => ipcRenderer.send("stop-task", id);

const deleteTask = (id) => ipcRenderer.send("delete-task", id);

const deleteAllTasks = (tasks) => ipcRenderer.send("delete-all-tasks", tasks);

const getCurrentAppVersion = () =>
  ipcRenderer.invoke("get-app-version").then((version) => version);

const updateTaskGroupValues = (taskGroupValues) =>
  ipcRenderer.send("update-task-group", taskGroupValues);

const createTaskGroup = (taskGroupValues) =>
  ipcRenderer.send("create-task-group", taskGroupValues);

const deleteTaskGroupID = (taskGroupID) =>
  ipcRenderer.send("delete-task-group", taskGroupID);

const updateCurrentState = (currentState) =>
  ipcRenderer.send("current-state", currentState);
// setting
const updateSetting = (settings) =>
  ipcRenderer.send("update-setting", settings);
// get initial state from MAIN
const getSettingInitData = (callback) =>
  ipcRenderer.send("get-setting-init-data", (_, data) => callback(data));

const setSettingInitData = (callback) =>
  ipcRenderer.on("set-setting-init-data", (_, state) => callback(state));

// elctron updateCurrentState
const checkForUpdate = () => ipcRenderer.send("checkForUpdate");

const updateAvailable = (callback) =>
  ipcRenderer.on("arc-update-available", (_, ver) => callback(ver));
// dasboard
const checkoutListener = (callback) =>
  ipcRenderer.on("checkout-success", (_, checkout) => callback(checkout));

const getDashboardData = () => ipcRenderer.send("get-dashboard-init-data");

const setDashboardAnalyticData = (callback) =>
  ipcRenderer.on("set-dashboard-analytic-data", (_, data) => callback(data));

const setDashboardStatisticsData = (callback) =>
  ipcRenderer.on("set-dashboard-statistics-data", (_, data) => callback(data));

// account session renderer
const selectedSessionGroup = (group) =>
  ipcRenderer.send("selcted-session-group", group);

const updateSelectedSession = (callback) =>
  ipcRenderer.on("updated-selected-session-group", (_, data) => callback(data));

module.exports = {
  stopTask,
  deleteTask,
  deleteAllTasks,
  stopAllTasks,
  startAllTasks,
  createTaskGroup,
  updateTaskGroupValues,
  deleteTaskGroupID,
  updateCurrentState,
  handleCloseApp,
  startSingleTask,
  stopSingleTask,
  updateSingleTask,
  openSolverWindow,
  handleMinimizeApp,
  changeCaptchaData,
  subscribeListener,
  dontUpdateHideTasks,
  deleteSingleCaptcha,
  updateDisplayedTasks,
  updateDisplayedTaskID,
  getCurrentAppVersion,
  multipleTasksUpdated,
  unsSubscribeListener,
  triggerInstanceCreation,
  deleteAllCaptchaInstance,
  updateSetting,
  getSettingInitData,
  setSettingInitData,
  getDashboardData,
  authenticateTheUser,
  updateAvailable,
  checkForUpdate,
  checkoutListener,
  setDashboardAnalyticData,
  setDashboardStatisticsData,
  selectedTaskGroup,
  updateTaskGroup,
  selectedSessionGroup,
  updateSelectedSession,
};

// ### Task group Proxy usage workflow
// Step 1 : Initial on app start we get entire store from renderer
// Step 2 : so we can loop through all proxy group object
// Step 3 : and add proxy usage of individual task group ,and total decline ,checkout ,cart value
// Step 4 : and send the all task updated task group
