import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../assests/images/logo.svg";
import user from "../../assests/images/user.svg";
import update from "../../assests/images/update.svg";
import corner from "../../assests/images/corner.svg";
/* DEFAULT ICON IMPORT*/
import task from "../../assests/images/task.svg";
import proxy from "../../assests/images/profile.svg";
import profile from "../../assests/images/proxy.svg";
import account from "../../assests/images/account.svg";
import captcha from "../../assests/images/captcha.svg";
import setting from "../../assests/images/setting.svg";
import dash from "../../assests/images/dashboard.svg";
/* ACTIVE ICON IMPORT*/
import atask from "../../assests/images/atask.svg";
import aproxy from "../../assests/images/aproxy.svg";
import aprofile from "../../assests/images/aprofile.svg";
import aaccount from "../../assests/images/aaccount.svg";
import acaptcha from "../../assests/images/acaptcha.svg";
import asetting from "../../assests/images/asetting.svg";
import adash from "../../assests/images/adashboard.svg";
/* COMPONENT IMPORT */
import { AppButtonWithicon } from "..";
import AppSidebarOption from "./sidebar-option/SidebarOption";
/* APP ROUTES IMPORT */
import {
  ACCOUNTS,
  DASHBOARD,
  TASKS,
  PROFILE,
  PROXIES,
  SETTINGS,
  CAPTCHA,
} from "../../config/routes";
import { useDispatch } from "react-redux";
import {
  fetchNewVersionAvailable,
  fetchSettingPageState,
  setTaskGroupModalState,
} from "../../features/counterSlice";
import { AppSpacer } from "../../component";
import { useSelector } from "react-redux";
import { checkForUpdate } from "../../helper/electron-bridge";
function Sidebar() {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [active, setActive] = useState(0);
  const settingState = useSelector(fetchSettingPageState);
  const newVersion = useSelector(fetchNewVersionAvailable);

  const handleTaskGroupModal = () => {
    dispatch(setTaskGroupModalState());
  };

  const handleActiveLink = (index) => {
    setActive(index);
  };

  React.useEffect(() => {
    let timer;
    timer = setInterval(() => {
      const d = new Date();
      setDate(d.toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [date]);
  return (
    <div className="sidebar-container">
      <img src={corner} alt="corner" />
      <div className="sidebar-container-inner">
        <img src={logo} className="padding-horizontal" alt="app-logo" />
        <div className="sidebar-container-inner-margintop">
          <div className="sidebar-time-container">
            <span className="text-500">{date}</span>
          </div>
          <div className="padding-horizontal custom">
            <AppButtonWithicon
              isCustomStyleButton={true}
              onClick={handleTaskGroupModal}
            />
          </div>
          <AppSpacer space={10} />
          <div className="sidebar-link-container">
            {SidebarOptionsList.map(
              ({ activeImage, defaultImage, title, id, linkTo }, index) => (
                <AppSidebarOption
                  key={id}
                  activeImage={activeImage}
                  image={defaultImage}
                  title={title}
                  linkTo={linkTo}
                  onClick={() => handleActiveLink(index)}
                  isActive={index === active}
                />
              )
            )}
          </div>

          <div className="sidebar-container-bottom-fixed">
            <div
              onClick={checkForUpdate}
              className="sidebar-container-bottom-version btn "
            >
              <img src={update} alt="update-icon" />
              <span className="text-700">Update to {newVersion}</span>
            </div>
            <AppSpacer space={20} />
            <div className="sidebar-container-bottom-user-profile">
              <img src={user} alt="" />
              <div className="sidebar-user-name-wrapper">
                <p className="text-700">{settingState.user.userName}</p>
                <p className="text-400">{settingState.user.discriminator}</p>
              </div>
              <span className="user-status-indicator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

const SidebarOptionsList = [
  {
    id: "sidebar-12",
    title: "Dashboard",
    defaultImage: dash,
    activeImage: adash,
    linkTo: DASHBOARD,
  },
  {
    id: "sidebar-123",
    title: "Tasks",
    defaultImage: task,
    activeImage: atask,
    linkTo: TASKS,
  },
  {
    id: "sidebar-125",
    title: "Profiles",
    defaultImage: profile,
    activeImage: aprofile,
    linkTo: PROFILE,
  },
  {
    id: "sidebar-126",
    title: "Accounts",
    defaultImage: account,
    activeImage: aaccount,
    linkTo: ACCOUNTS,
  },
  {
    id: "sidebar-127",
    title: "Proxies",
    defaultImage: proxy,
    activeImage: aproxy,
    linkTo: PROXIES,
  },
  {
    id: "sidebar-128",
    title: "Captcha",
    defaultImage: captcha,
    activeImage: acaptcha,
    linkTo: CAPTCHA,
  },
  {
    id: "sidebar-124",
    title: "Settings",
    defaultImage: setting,
    activeImage: asetting,
    linkTo: SETTINGS,
  },
];
