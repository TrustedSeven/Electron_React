const path = require("path");
const electron = require("electron");
const captchaManager = require("./script/captcha-resolver-manager");
const TaskHandler = require("./helpers/TaskHandler");
const { formatProxy } = require("./helpers/Tools");

const { randomBytes } = require("crypto");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let gotInitialState = false;

global.mainWin = null;
global.isDev = require("electron-is-dev");
global.TaskToProcess = {};
global.TaskStatuses = {};
global.CachedTaskStatues = {};
global.OneCheckoutProfileTasks = {};
global.WaterfallTasks = {};
global.TaskGroups = {};
global.TaskLogs = [];
global.ProxyGroups = {};
global.settingState = {};
global.sessionState = {};
if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname);
}

function createWindow() {
  global.mainWin = new BrowserWindow({
    width: 1516,
    height: 947,
    minWidth: 1516,
    minHeight: 947,
    maxWidth: 1516,
    maxHeight: 947,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
    },
    transparent: true,
    frame: false,
    devTools: false,
  });
  mainWin.setMenu(null);
  mainWin.webContents.openDevTools();
  mainWin.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
  mainWin.on("closed", () => {
    // Kill forked processes
    global.mainWin = null;
  });
}

/**
 * App Necessary Listener
 */
app.on("ready", () => {
  /* require(path.join(__dirname, "./helpers/TaskEngine.js"));
  global.AvailableForkProcesses = Object.keys(global.ForkedProcesses);
  global.CurrentForkProcessCounter = 0;*/
  createWindow();
});

app.on("window-all-closed", () => {
  // Kill forked processes
  if (process.platform !== "darwin") {
    captchaManager.deleteAllInstance();
    app.quit();
  }
});

app.on("activate", () => {
  // Fix Key login
  if (mainWin === null) {
    createWindow();
  }
});

/**
 * IPC EVENT LISTENERS
 */
ipcMain.on("minimize", () => {
  mainWin.minimize();
});
ipcMain.on("close", () => {
  mainWin.close();
});
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.on("current-state", (_, data) => {
  if (gotInitialState) return;
  gotInitialState = true;
  // console.log(data)
  for (let x = 0; x < data.proxyGroupList.length; x++) {
    let formattedProxies = [];
    for (let y = 0; y < data.proxyGroupList[x].list.length; y++) {
      let tempProxy = formatProxy(data.proxyGroupList[x].list[y].title);
      if (!tempProxy) continue;
      formattedProxies.push(tempProxy);
    }
    global.ProxyGroups[data.proxyGroupList[x].id] = {
      proxies: formattedProxies,
      proxyCounter: 0,
    };
  }

  for (let taskGroupID in data.taskGroupList) {
    global.TaskGroups[taskGroupID] = {
      taskIDs: [],
      errorDelay: parseInt(data.taskGroupList[taskGroupID].errorDelay),
      monitorDelay: parseInt(data.taskGroupList[taskGroupID].monitorDelay),
      monitorProxyID: data.taskGroupList[taskGroupID].monitorProxyID,
      taskProxyID: data.taskGroupList[taskGroupID].taskProxyID,
      proxyUsage: data.taskGroupList[taskGroupID].proxyUsage,
      totalTaskCheckout: data.taskGroupList[taskGroupID].totalTaskCheckout,
      totalTaskDecline: data.taskGroupList[taskGroupID].totalTaskDecline,
      totalTaskCart: data.taskGroupList[taskGroupID].totalTaskCart,
    };
  }

  global.settingState = data.settingState;
  //console.log(global.TaskGroups)
});

/**
 * CAPTCHA  IPC EVENT
 */
ipcMain.on("captcha-change", (event, data) => {
  captchaManager.addtask(data);
});

ipcMain.on("create-instance", () => {
  captchaManager.createAllInstance(mainWin);
});

ipcMain.on("open-solver", (event, data) => {
  captchaManager.openWindow(data, mainWin);
});

ipcMain.on("delete-captcha", (event, id) => {
  captchaManager.deleteWindow(id, mainWin);
});

ipcMain.on("delete-all-instance", () => {
  captchaManager.deleteAllInstance();
});

// TASK IPC EVENT
ipcMain.on("task-start", (_, task) => {
  TaskHandler.startTask(task);
});

ipcMain.on("task-stop", (_, task) => {
  TaskHandler.stopTask(task);
});

ipcMain.on("delete-all-tasks", (_, tasks) => {
  for (let x = 0; x < tasks.length; x++) {
    TaskHandler.stopTask(tasks[x]);
  }
});

ipcMain.on("stop-all-tasks", (_, tasks) => {
  for (let x = 0; x < tasks.length; x++) {
    TaskHandler.stopTask(tasks[x]);
  }
});

ipcMain.on("start-all-tasks", (_, tasks) => {
  for (let x = 0; x < tasks.length; x++) {
    TaskHandler.startTask(tasks[x]);
  }
});

// this channel update selxcted task group data like proxyUsage , totaldecline ,checkout
ipcMain.on("selected-task-group", (event, group) => {
  let taskGroupValues = group;
  global.TaskGroups[taskGroupValues.id] = {
    taskIDs: [],
    errorDelay: parseInt(taskGroupValues.errorDelay),
    monitorDelay: parseInt(taskGroupValues.monitorDelay),
    monitorProxyID: taskGroupValues.monitorProxyID,
    taskProxyID: taskGroupValues.taskProxyID,
    taskProxyCounter: 0,
    monitorProxyCounter: 0,
    proxyUsage: taskGroupValues.proxyUsage,
    totalTaskCheckout: taskGroupValues.totalTaskCheckout,
    totalTaskDecline: taskGroupValues.totalTaskDecline,
    totalTaskCart: taskGroupValues.totalTaskCart,
  };
  let obj = { ...group };
  obj["proxyUsage"] = Math.random() * 100 + 1;
  obj["totalTaskCheckout"] = Math.floor(Math.random() * 100 + 1);
  obj["totalTaskDecline"] = Math.floor(Math.random() * 100 + 1);
  obj["totalTaskCart"] = Math.floor(Math.random() * 100 + 1);
  event.sender.send("update-selected-task-group", obj);
});

ipcMain.on("update-displayed-tasks", (_, tasks) => {
  // Need to implement initial update as well as searching tasks
  return;
  for (let x = 0; x < tasks.length; x++) {
    if (global.DisplayedTasks.length === 40) global.DisplayedTasks.pop();
    global.DisplayedTasks.unshift(tasks[x]);
  }
  console.log(global.DisplayedTasks);
});

ipcMain.on("update-displayed-taskID", (_, taskID) => {
  // Need to implement initial update as well as searching tasks
  return;
  if (global.DisplayedTasks.length === 40) global.DisplayedTasks.pop();
  global.DisplayedTasks.unshift(taskID);
  console.log(global.DisplayedTasks);
});

ipcMain.on("create-task-group", (_, taskGroupValues) => {
  global.TaskGroups[taskGroupValues.id] = {
    taskIDs: [],
    errorDelay: parseInt(taskGroupValues.errorDelay),
    monitorDelay: parseInt(taskGroupValues.monitorDelay),
    monitorProxyID: taskGroupValues.monitorProxyID,
    taskProxyID: taskGroupValues.taskProxyID,
    taskProxyCounter: 0,
    monitorProxyCounter: 0,
    proxyUsage: taskGroupValues.proxyUsage,
    totalTaskCheckout: taskGroupValues.totalTaskCheckout,
    totalTaskDecline: taskGroupValues.totalTaskDecline,
    totalTaskCart: taskGroupValues.totalTaskCart,
  };
});

ipcMain.on("update-task-group", (_, taskGroupValues) => {
  global.TaskGroups[taskGroupValues.taskGroupID].errorDelay = parseInt(
    taskGroupValues.errorDelay
  );
  global.TaskGroups[taskGroupValues.taskGroupID].monitorDelay = parseInt(
    taskGroupValues.monitorDelay
  );
  global.TaskGroups[taskGroupValues.taskGroupID].monitorProxyID =
    taskGroupValues.monitorProxy;
  global.TaskGroups[taskGroupValues.taskGroupID].taskProxyID =
    taskGroupValues.taskProxy;
});

ipcMain.on("delete-task-group", (_, taskGroupID) => {
  if (!global.TaskGroups[taskGroupID]) return;
  for (let x = 0; x < global.TaskGroups[taskGroupID].taskIDs.length; x++) {
    TaskHandler.stopTask(global.TaskGroups[taskGroupID].taskIDs[x]);
  }
  delete global.TaskGroups[taskGroupID];
});

/*

Dashboard
  Updating everything


Task Dashboard
    Proxy Usage
    Cart/Checkout/Decline Events
    Search won't update the displayed tasks
    Edit All
    Edit Single
  
  

*/
const pause = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 10000);
  });

// LOGIN IPC EVENT
ipcMain.handle("user-auth", async (_, userKey) => {
  console.log("Authenticating....", userKey);
  // if we send true then only user can logged in elese we toast error
  await pause();
  console.log("Complete");
  return true;
});

// SEETING IPC CHANGE
ipcMain.on("update-setting", (_, state) => {
  console.log(state);
  global.settingState = state;
});

ipcMain.on("get-setting-init-data", (event, d) => {
  // here we send setting entire object data ,
  event.sender.send("set-setting-init-data", global.settingState);
});

// DASHBOARD IPC EVENT
// on "checkout-success" this channel we can append new checkout in list and display in table
ipcMain.on("get-dashboard-init-data", (event, d) => {
  let statisticsSchema = {
    totalCheckout: 20,
    totalCarts: 50,
    totaldecline: 30,
  };
  let analyticsSchema = {
    xAxis: ["Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9"],
    yAxis: [22, 15, 10, 40, 45, 50, 30, 20],
  };
  event.sender.send("set-dashboard-analytic-data", analyticsSchema);
  event.sender.send("set-dashboard-statistics-data", statisticsSchema);
});

// ELECTRON UPDATER IPC
ipcMain.on("checkForUpdate", (event, _) => {
  // on this channel we update update available in bottom of sidebar
  const updateVersionAvailable = "0.5.0";
  event.sender.send("arc-update-available", updateVersionAvailable);
});

// SESSION IPC
ipcMain.on("selcted-session-group", (event, group) => {
  global.sessionState[group.id] = group;
  let updateSession = [];
  let tempGroup = { ...group };
  let table = tempGroup["sessionList"];
  for (let i = 0; i < table.length; i++) {
    let obj = { ...table[i] };
    obj["status"] = randomBytes(5).toString("hex");
    updateSession.push(obj);
  }
  tempGroup["sessionList"] = updateSession;
  event.sender.send("updated-selected-session-group", tempGroup);
});
