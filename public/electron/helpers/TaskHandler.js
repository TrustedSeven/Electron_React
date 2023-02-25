// Task Handler

"use strict";

const { randomBytes, randomUUID, createHash } = require("crypto");
const { getRandomInt } = require("./Tools");

setInterval(() => {
  // Fix frontend lag
  if (global.mainWin === null) return;
  let tasksToUpdate = [];
  for (let taskID in global.TaskStatuses) {
    if (
      global.CachedTaskStatues[taskID] &&
      global.TaskStatuses[taskID].title ===
        global.CachedTaskStatues[taskID].title &&
      global.TaskStatuses[taskID].size ===
        global.CachedTaskStatues[taskID].size &&
      global.TaskStatuses[taskID].status ===
        global.CachedTaskStatues[taskID].status
    )
      continue;
    global.CachedTaskStatues[taskID] = {
      title: global.TaskStatuses[taskID].title,
      size: global.TaskStatuses[taskID].size,
      status: global.TaskStatuses[taskID].status,
    };
    tasksToUpdate.push({
      title: global.TaskStatuses[taskID].title,
      size: global.TaskStatuses[taskID].size,
      status: global.TaskStatuses[taskID].status,
      color: global.TaskStatuses[taskID].color,
      id: taskID,
      taskGroupID: global.TaskStatuses[taskID].taskGroupID,
      active: !!global.TaskToProcess[taskID],
    });
  }

  if (tasksToUpdate.length === 0) return;
  global.mainWin.webContents.send("multiple-task-update", tasksToUpdate);
  /*
  
      let tasksToUpdate = [];
      for (let x = 0; x < global.DisplayedTasks.length; x++) {
          if (!TaskStatuses[global.DisplayedTasks[x]]) continue;
          tasksToUpdate.push({
              title: global.TaskStatuses[global.DisplayedTasks[x]].title,
              size: global.TaskStatuses[global.DisplayedTasks[x]].size,
              status: global.TaskStatuses[global.DisplayedTasks[x]].status,
              color: global.TaskStatuses[global.DisplayedTasks[x]].color,
              id: global.DisplayedTasks[x],
              active: true
          });
      }
      if (tasksToUpdate.length === 0) return;
      global.mainWin.webContents.send("multiple-task-update", tasksToUpdate);*/
}, 200);

/*setInterval(() => {
    for (let TaskID in global.TaskStatuses) {
        if (Math.random() < 0.5) continue;
        global.TaskStatuses[TaskID].status = randomBytes(5).toString("hex");
        global.TaskStatuses[TaskID].title = randomBytes(5).toString("hex");
    };
}, 350);*/

function startTask(task) {
  let taskID = task.id,
    monitorWaterfallHash = createHash("md5")
      .update(task.site + task.keyword)
      .digest("hex"); // Adjust for random store ranges and shit

  // Task Site not being set

  task.taskID = taskID;
  task.monitorDelay = global.TaskGroups[task.taskGroupID].monitorDelay;
  task.errorDelay = global.TaskGroups[task.taskGroupID].errorDelay;
  task.moduleFormattedName = task.site;
  if (["Footlocker CA", "Champs CA"].includes(task.site))
    task.moduleFormattedName = "Footsites";

  /*
    task.monitorWaterfallHash = monitorWaterfallHash;

    // task.useAycd = global.useAycd; Set this as global variables
    // task.captchaServiceKeys = global.CaptchaServicesKeys;

    // Get Profile

    if (task.oneCheckoutProfile) {
        let oneCheckoutProfileHash = createHash('md5').update(task.site + task.keyword + JSON.stringify(task.profile)).digest('hex');
        if (!global.OneCheckoutProfileTasks[oneCheckoutProfileHash]) global.OneCheckoutProfileTasks[oneCheckoutProfileHash] = [];
        global.OneCheckoutProfileTasks[oneCheckoutProfileHash].push(taskID);
        task.oneCheckoutProfileHash = oneCheckoutProfileHash;
    };

    if (!global.WaterfallTasks[monitorWaterfallHash]) global.WaterfallTasks[monitorWaterfallHash] = [];
    global.WaterfallTasks[monitorWaterfallHash].push(taskID);

    if (task.site === "Bestbuy CA") {
        task.BestbuyCAStoreIDs = BestbuyCAStoreIDs;
        task.BestbuyCAStoreInfo = BestbuyCAStoreInfo;
        task.maxRange = global.SiteConfigs[task.site].maxRange;
        task.StoreIDFilter = global.SiteConfigs[task.site].StoreIDFilter;
        task.SMSVerificationPhoneNumber = global.SiteConfigs[task.site].SMSVerificationPhoneNumber;
        task.SMSAnyOrder = global.SiteConfigs[task.site].SMSAnyOrder;
        task.SMSAutoSolve = global.SiteConfigs[task.site].SMSAutoSolve;
        if ((task.taskMode === 4 || task.taskMode === 5 || task.taskMode === 6 || task.taskMode === 7) && !OpenedURL) {
            OpenedURL = true;
            await open(`http://localhost:${SMSPort}/`);
            setTimeout(() => {
                updateApplicationTitle(true);
            }, 1000);
        };
    } else if (task.site === "Ssense") {
        task.account = global.Accounts[task.site].shift();
        global.Accounts[task.site].push(task.account);
        task.accountSession = global.SsenseSessions[task.account];
    } else if (task.site === "The Source") {
        task.SourceStoreIDs = global.SiteConfigs[task.site].StoreIDFilter;
        task.waterfallMode = global.SiteConfigs[task.site].waterfallMode;
    } else if (task.site === "Microsoft CA" || task.site === "Microsoft CA Filler") {
        task.account = global.Accounts["Microsoft CA"].shift();
        global.Accounts["Microsoft CA"].push(task.account);
        //  task.rotateOnDecline = global.SiteConfigs[task.site].rotateOnDecline;
    };

    task.moduleFormattedName = task.site;
    if ([
            "Footlocker CA",
            "Champs CA"
        ].includes(task.site)) task.moduleFormattedName = "Footsites";

    task.discordWebhook = clientConfig.discordWebhook;
    task.discordID = global.licenseInfo.discordID;
    task.logDeclineNotifications = global.clientConfig.logDeclineNotifications;
    task.sendUserWebhook = global.sendUserWebhook;
    task.logSuccessToCSV = clientConfig.logSuccessToCSV;
    task.apiAccessToken = global.apiAccessToken;
    task.clientKey = global.clientConfig.clientKey;*/

  // global.TaskToProcess[taskID] =
  //   AvailableForkProcesses[CurrentForkProcessCounter];
  // CurrentForkProcessCounter++;
  // if (CurrentForkProcessCounter >= AvailableForkProcesses.length)
  //   CurrentForkProcessCounter = 0;

  // ForkedProcesses[global.TaskToProcess[taskID]].send({
  //   taskEngineEventType: 1,
  //   task: task,
  // });

  global.TaskStatuses[taskID] = {
    status: "Idle",
    title: task.keyword,
    size: task.size,
    color: getTaskColorValue(1),
    taskGroupID: task.taskGroupID,
    active: true,
  };

  global.TaskGroups[task.taskGroupID].taskIDs.push(taskID);

  /*ForkedProcesses[AvailableForkProcesses[CurrentForkProcessCounter]].send({
        taskEngineEventType: 1,
        task: task
    });
    
    CurrentForkProcessCounter++;
    if (CurrentForkProcessCounter >= AvailableForkProcesses.length) CurrentForkProcessCounter = 0;
    */
  setInterval(() => {
    global.TaskStatuses[taskID].status = randomBytes(5).toString("hex");
    global.TaskStatuses[taskID].color = getTaskColorValue(getRandomInt(1, 5));
  }, 150);
}

function stopTask(taskID) {
  console.log("Task Stopped");
  console.log(TaskToProcess[taskID]);
  if (!TaskToProcess[taskID]) return;
  ForkedProcesses[TaskToProcess[taskID]].send({
    eventType: 16,
    taskID: taskID,
  });
  delete TaskToProcess[taskID];
}

function handleTaskEvent(message) {
  console.log(message);
}

function getTaskColorValue(ColorValue) {
  switch (ColorValue) {
    case 1:
      return "#FFFFFF";
      break;
    case 2: // Warning
      return "#FCD369";
      break;
    case 3: // Error
      return "#F86057";
      break;
    case 4: // Processing
      return "#5397CC";
      break;
    case 5: // Success
      return "#8CDA76";
      break;
  }
}

module.exports = {
  startTask,
  stopTask,
  handleTaskEvent,
};
