import React from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import {
  fetchCurrentAppVersion,
  fetchSettingPageState,
} from "../../features/counterSlice";
import {
  SettingPageAPI,
  SettingPageLeftTop,
  SettingPageRightSection,
  SettingPageLeftNotification,
} from "../../pages-component";
import "./setting.css";

function Setting() {
  const version = useSelector(fetchCurrentAppVersion);
  const settingState = useSelector(fetchSettingPageState);

  return (
    <div className="setting-container">
      <div className="setting-container-inner-left">
        <AppSpacer space={20} />
        <SettingPageLeftTop {...{ settingState }} />
        <AppSpacer space={70} />
        <SettingPageLeftNotification {...{ settingState }} />
        <SettingPageAPI {...{ version, settingState }} />
      </div>
      <div className="setting-container-inner-right">
        <AppSpacer space={40} />
        <SettingPageRightSection {...{ settingState }} />
      </div>
    </div>
  );
}

export default Setting;
