import React, { useState } from "react";
import "./styles.css";
import eye from "../../../assests/images/eye.svg";
import closeEye from "../../../assests/images/close-eye.svg";
import right from "../../../assests/images/right.svg";
import discord from "../../../assests/images/discord.svg";
import twitter from "../../../assests/images/twitter.svg";
import check from "../../../assests/images/wcheck.svg";
import biguser from "../../../assests/images/big-user.svg";
import bottom from "../../../assests/images/bottom-svg.svg";
import { AppSpacer } from "../../../component";

function SettingRight({ settingState }) {
  const [hide, setHide] = useState(false);

  const handleTogglePassword = () => {
    setHide(!hide);
  };

  return (
    <div className="setting-right-container">
      <div className="setting-right-container-inner">
        <AppSpacer space={30} />
        <div className="setting-right-inner-user-avatar">
          <img src={biguser} alt="user-name-avatar" />
          <AppSpacer space={20} />
          <div className="user-name-wrapper">
            <span>{settingState.user.userName}</span>
            <span>{settingState.user.discriminator}</span>
          </div>
          <AppSpacer space={10} />
          <p>FNF</p>
        </div>
        <AppSpacer space={20} />
        <div className="setting-right-api-key-display">
          <p id="api-key-making-wrapper">
            {maskingAPIkey(settingState.user.licenseKey).map(({ w, id }, i) =>
              hide ? (
                <span
                  key={id}
                  className="api-key-masking-dot"
                  style={{
                    marginRight: (i === 2 || i === 9 || i === 17) && "5px",
                  }}
                />
              ) : (
                <span
                  style={{
                    marginRight: (i === 2 || i === 9 || i === 17) && "5px",
                  }}
                  key={id}
                >
                  {w}
                </span>
              )
            )}
          </p>
          <img
            onClick={handleTogglePassword}
            src={hide ? eye : closeEye}
            alt="eye-icon"
            className="btn"
          />
        </div>
        <AppSpacer space={5} />
        <div className="validity-container">
          <span>Renew {settingState.user.licenseRenewDate}</span>
          <span>{settingState.user.licenseExpireInDays} Days Remaining</span>
        </div>
        <AppSpacer space={30} />
        <div className="setting-right-divider" />
        <AppSpacer space={30} />
        <div className="setting-share">
          <span>Share your success with us</span>
          <img src={check} alt="" />
        </div>
        <AppSpacer space={10} />
        <div className="share-btn discord btn">
          <img src={discord} alt="discord-icon" />
          <span>Connect to Discord</span>
          <img src={right} alt="right-icon" />
        </div>
        <AppSpacer space={5} />
        <div className=" share-btn twitter btn">
          <img src={twitter} alt="discord-icon" /> <span>Tweet at Arc AIO</span>
          <img src={right} alt="right-icon" />
        </div>
        <AppSpacer space={10} />
      </div>
      <img src={bottom} alt="bottom-svg" />
    </div>
  );
}

export default SettingRight;

const maskingAPIkey = (apiKey = "123 123456 12345678 12345") => {
  let spliArr = apiKey.split("");
  let list = spliArr.map((data, i) => {
    let obj = {};
    obj["w"] = data;
    obj["id"] = i;
    return obj;
  });
  return list;
};
