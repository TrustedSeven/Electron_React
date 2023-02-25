import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import music from "../../../assests/images/music.svg";
import acheck from "../../../assests/images/wcheck.svg";
import change from "../../../assests/images/change.svg";
import { AppInputField, AppSpacer, AppSwitchButton } from "../../../component";
import { updateAppSettingState } from "../../../features/logic/setting-reducer-logic";
import { setSettingNotificationState } from "../../../features/counterSlice";

function SettingNotification({ settingState }) {
  const dispatch = useDispatch();

  const handleWbhookChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateAppSettingState({
        key: "webhook",
        change: { name, type, checked, value },
      })
    );
  };

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateAppSettingState({
        key: "notification",
        change: { name, type, checked, value },
      })
    );
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    let obj = { ...settingState.notification };
    obj["currentSound"] = files[0].name;
    obj["soundLocation"] = files[0].path;
    obj["soundType"] = files[0].type;
    obj["soundFileSize"] = files[0].size;
    dispatch(setSettingNotificationState(obj));
  };

  return (
    <div className="setting-notification-container">
      <h2>Discord</h2>
      <AppInputField
        onChange={handleWbhookChange}
        placeholderText="Enter Discord Webhook"
        hideLabel={true}
        name="webhook"
        value={settingState.webhook.webhook}
      />
      <div className="setting-notification-actions">
        <div className="setting-test-btn btn">
          <img src={acheck} alt="" />
          <span>Test Webhook</span>
        </div>
        <span>Decline webhooks</span>
        <AppSwitchButton
          onChange={handleWbhookChange}
          id="discord-webhook-decline"
          name="isWebhookDecline"
          checked={settingState.webhook.isWebhookDecline}
        />
      </div>
      <AppSpacer space={30} />
      <h2 id="notification">Notifications</h2>
      <div className="flex-row ">
        <div className="flex-half flex-between">
          <h4>Sounds</h4>
          <AppSwitchButton
            onChange={handleNotificationChange}
            name="isNotification"
            checked={settingState.notification.isNotification}
            id="app-notification-sound"
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row ">
        <div className="flex-half">
          <div className="setting-sound-details">
            <span>Current Sound</span>{" "}
            <span>{settingState.notification.currentSound}</span>
            <div className="setting-sound-change btn">
              <img src={change} className="btn" alt="music-change" />
              <input
                accept="audio/*"
                onChange={handleFileChange}
                id="setting-change-sound"
                type="file"
              />
              <label htmlFor="setting-change-sound" />
            </div>
          </div>
        </div>
        <div className="flex-half">
          <div className="setting-sound-btns">
            <div className="setting-sound-btn btn">
              <img src={music} alt="music-icon" />
              <span>Test Sound</span>
            </div>
            <div className="setting-sound-btn btn">
              <span>Reset to Default</span>
            </div>
          </div>
        </div>
      </div>
      <AppSpacer space={10} />
    </div>
  );
}

export default SettingNotification;
