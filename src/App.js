import React, { useEffect } from "react";
import "./App.css";
import {
  TASKS,
  CAPTCHA,
  PROFILE,
  PROXIES,
  ACCOUNTS,
  SETTINGS,
  DASHBOARD,
} from "./config/routes";
import {
  AppTasksPage,
  AppLoginPage,
  AppCaptchaPage,
  AppProfilePage,
  AppProxiesPage,
  AppSettingPage,
  AppAccountsPage,
  AppDashBoardPage,
} from "./pages";
import {
  ProfileModal,
  TaskGroupModal,
  BestBuyCaModal,
  ProxyGroupModal,
  SSenseTaskModal,
  AmazonTaskModal,
  AddAccountsModal,
  ProfileGroupModal,
  EditTaskGroupModal,
  EditGroupNameModal,
  EditSingleProxyModal,
  CanadaComputersTaskModal,
} from "./modals";
import { Routes, Route } from "react-router-dom";
import {
  AppControlButtons,
  AppSidebar,
  CeckoutToasterContainer,
} from "./component";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppVersion,
  fetchSelectedItem,
  fetchEditModalState,
  setSelectedItemList,
  fetchLoggedUserState,
  fetchProfileModalState,
  fetchBestBuyCaModlaState,
  fetchTaskGroupModalState,
  fetchEditGroupModalState,
  fetchSEditProxyModalSate,
  fetchAddAccountModalState,
  fetchProxyGroupModalState,
  fetchSsenseTaskModalState,
  fetchAmazonTaskModalState,
  fetchProfileGroupModalState,
  fetchEditTaskGroupModalState,
  fetchCanadaComputersTaskModalState,
  getCurrentState,
  setSelectItem,
  // setSettingState,
  setUpdateAvailabledVersion,
  setDashboardAnalytics,
  setDashboardStatistics,
  showCustomToaster,
  setSettingState,
} from "./features/counterSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MAX_TOAST_LIMIT } from "./toaster";
import {
  resetAllTaskGroupStatus,
  selctedTaskGroupUpdater,
  updateMultipleTaskStatus,
  updateSingleTaskStatus,
} from "./features/logic/task-reducer-logic";
import { addNewCheckout } from "./features/logic/dashboard-reducer";
import { updateSessionStatus } from "./features/logic/account-reducer-logic";
const {
  handleCloseApp,
  updateSingleTask,
  handleMinimizeApp,
  subscribeListener,
  unsSubscribeListener,
  getCurrentAppVersion,
  multipleTasksUpdated,
  setSettingInitData,
  updateAvailable,
  checkForUpdate,
  checkoutListener,
  setDashboardStatisticsData,
  setDashboardAnalyticData,
  getDashboardData,
  updateTaskGroup,
  updateSelectedSession,
} = require("./helper/electron-bridge");

function App() {
  const dispatch = useDispatch();
  const data = useSelector(fetchSelectedItem);
  const edit = useSelector(fetchEditModalState);
  const userState = useSelector(fetchLoggedUserState);
  const groupState = useSelector(fetchEditGroupModalState);
  const bestcaModal = useSelector(fetchBestBuyCaModlaState);
  const editProxyState = useSelector(fetchSEditProxyModalSate);
  const profileModalState = useSelector(fetchProfileModalState);
  const amazonAmazonModal = useSelector(fetchAmazonTaskModalState);
  const taskgroupModlaState = useSelector(fetchTaskGroupModalState);
  const ssenseTaskModalState = useSelector(fetchSsenseTaskModalState);
  const proxyGroupModalState = useSelector(fetchProxyGroupModalState);
  const addAccountModalState = useSelector(fetchAddAccountModalState);
  const editTaskGroupModal = useSelector(fetchEditTaskGroupModalState);
  const taskModalState = useSelector(fetchCanadaComputersTaskModalState);
  const profileGroupModalState = useSelector(fetchProfileGroupModalState);

  useEffect(() => {
    subscribeListener();
    dispatch(resetAllTaskGroupStatus());
    dispatch(getCurrentState());
    dispatch(setSelectItem({}));
    dispatch(setSelectedItemList([]));
    // uncomment  after implemet the setting store update in main
    setSettingInitData((settingState) => {
      dispatch(setSettingState(settingState));
    });
    // UPDATER LISTENER
    checkForUpdate();
    updateAvailable((newVersion) => {
      dispatch(setUpdateAvailabledVersion(newVersion));
    });
    // DASHBOARD LISTENER
    getDashboardData();
    setDashboardAnalyticData((analytic) => {
      dispatch(setDashboardAnalytics(analytic));
    });
    setDashboardStatisticsData((stats) => {
      dispatch(setDashboardStatistics(stats));
    });
    checkoutListener((check) => {
      if ("id" in check && check.id !== undefined) {
        dispatch(addNewCheckout(check));
        dispatch(showCustomToaster(check));
      }
    });

    (async function () {
      const version = await getCurrentAppVersion();
      if (version !== undefined) {
        dispatch(setAppVersion(version));
      }
    })();
    // TASK LISTENER
    updateSingleTask((update) => {
      if (update?.split("::")?.length === 3) {
        dispatch(updateSingleTaskStatus(update));
      }
    });
    multipleTasksUpdated((list) => {
      dispatch(updateMultipleTaskStatus(list));
    });
    updateTaskGroup((group) => {
      dispatch(selctedTaskGroupUpdater(group));
    });
    // session LISTENERS
    updateSelectedSession((session) => {
      dispatch(updateSessionStatus(session));
    });
    return () => {
      unsSubscribeListener();
    };
  }, [dispatch]);

  if (Object.keys(userState).length === 0) {
    return <AppLoginPage />;
  }

  return (
    <div className="app">
      {bestcaModal && <BestBuyCaModal />}
      {amazonAmazonModal && <AmazonTaskModal />}
      {editProxyState && <EditSingleProxyModal />}
      {editTaskGroupModal && <EditTaskGroupModal />}
      {profileModalState && <ProfileModal {...{ edit, data }} />}
      {taskgroupModlaState && <TaskGroupModal {...{ edit, data }} />}
      {ssenseTaskModalState && <SSenseTaskModal {...{ edit, data }} />}
      {proxyGroupModalState && <ProxyGroupModal {...{ edit, data }} />}
      {addAccountModalState && <AddAccountsModal {...{ edit, data }} />}
      {groupState["state"] && <EditGroupNameModal {...{ groupState }} />}
      {taskModalState && <CanadaComputersTaskModal {...{ edit, data }} />}
      {profileGroupModalState && <ProfileGroupModal {...{ edit, data }} />}
      <div className="app-static-side">
        <AppSidebar />
      </div>
      <div className="app-dynamic-side">
        <div className="app-dgraggable-tab" />

        <Routes>
          <Route path={SETTINGS} element={<AppSettingPage />} />
          <Route path={CAPTCHA} element={<AppCaptchaPage />} />
          <Route path={PROXIES} element={<AppProxiesPage />} />
          <Route path={ACCOUNTS} element={<AppAccountsPage />} />
          <Route path={PROFILE} element={<AppProfilePage />} />
          <Route path={TASKS} element={<AppTasksPage />} />
          <Route path={DASHBOARD} element={<AppDashBoardPage />} />
        </Routes>
        <AppControlButtons
          onClose={handleCloseApp}
          onMinimize={handleMinimizeApp}
        />
      </div>
      <ToastContainer
        limit={MAX_TOAST_LIMIT}
        className="react-toastify-container"
      />
      <CeckoutToasterContainer />
    </div>
  );
}

export default App;
