import React from "react";
import "./styles.css";
import key from "../../../assests/images/key.svg";
import opener from "../../../assests/images/bopener.svg";
import { AppInputField, AppSwitchButton, AppSpacer } from "../../../component";
import { useDispatch } from "react-redux";
import { updateAppSettingState } from "../../../features/logic/setting-reducer-logic";

function SettingApi({ version, settingState }) {
  const dispatch = useDispatch();

  const handleCaptchaServiceChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      updateAppSettingState({
        key: "captchaSolvingServiceConfig",
        change: { name, value },
      })
    );
  };

  const handleAYCDChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      updateAppSettingState({
        key: "aycdKeyConfig",
        change: { name, value },
      })
    );
  };

  const handleAYCDSwitchChange = (e) => {
    const { checked, name, type } = e.target;
    dispatch(
      updateAppSettingState({
        key: "aycdKeyConfig",
        change: { name, type, checked },
      })
    );
  };

  const handleCaptchaSwitchChange = (e) => {
    const { checked, name, type } = e.target;
    dispatch(
      updateAppSettingState({
        key: "captchaSolvingServiceConfig",
        change: { name, type, checked },
      })
    );
  };

  return (
    <div>
      <div className="flex-row setting-api">
        <div className="flex-half">
          <div className="flex-row align-center">
            <p>Captcha Solving Services</p>
            <AppSwitchButton
              id="captcha-service-toggle"
              onChange={handleCaptchaSwitchChange}
              name="isCaptchaSolvingService"
              checked={
                settingState?.captchaSolvingServiceConfig
                  ?.isCaptchaSolvingService
              }
            />
          </div>
        </div>
        <div className="flex-half">
          <div className="flex-row align-center">
            <p>AYCD</p>
            <AppSwitchButton
              name="isAYCD"
              id="aycd-config-toggle"
              onChange={handleAYCDSwitchChange}
              checked={settingState?.aycdKeyConfig?.isAYCD}
            />
          </div>
        </div>
      </div>
      <AppSpacer space={30} />
      <div className="flex-row ">
        <div className="flex-half">
          <AppInputField
            fieldTitle="Anticaptcha"
            placeholderText="Enter API Key"
            name="antiCaptchaKey"
            onChange={handleCaptchaServiceChange}
            value={settingState?.captchaSolvingServiceConfig?.antiCaptchaKey}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            name="aycdApiKey"
            fieldTitle="API Key"
            placeholderText="Enter API Key"
            onChange={handleAYCDChange}
            value={settingState?.aycdKeyConfig?.aycdApiKey}
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row ">
        <div className="flex-half">
          <AppInputField
            name="captcha2Key"
            fieldTitle="2Captcha"
            placeholderText="Enter API Key"
            onChange={handleCaptchaServiceChange}
            value={settingState?.captchaSolvingServiceConfig?.captcha2Key}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            name="aycdApiAccessToken"
            fieldTitle="Access Token"
            placeholderText="Enter Access Token"
            onChange={handleAYCDChange}
            value={settingState?.aycdKeyConfig?.aycdApiAccessToken}
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row ">
        <div className="flex-half">
          <AppInputField
            name="capMonster"
            fieldTitle="CapMonster"
            placeholderText="Enter API Key"
            onChange={handleCaptchaServiceChange}
            value={settingState?.captchaSolvingServiceConfig?.capMonster}
          />
        </div>
        <div className="flex-half margin-left">
          <div className="flex-row align-center full-width">
            <div>
              <p id="other-text">Other</p>
              <div className="setting-open-logs">
                <span>Open Logs</span>
                <img
                  style={{ height: "14px" }}
                  className="btn"
                  src={opener}
                  alt="logs-opener-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppSpacer space={70} />
      <div className="flex-half  setting-bottom">
        <div className="setting-sound-btns">
          <div className="setting-sound-btn deactivation-key btn">
            <img src={key} alt="music-icon" />
            <span>Deactivate Key</span>
          </div>
          <div className=" current-version">
            <span>Current Version: {version}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingApi;
