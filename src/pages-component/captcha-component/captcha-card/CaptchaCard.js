import React, { useState, useRef } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import trash from "../../../assests/images/trash.svg";
import edit from "../../../assests/images/edit.svg";
import rplay from "../../../assests/images/rplay.svg";
import {
  deleteSingleCard,
  updateCaptchaCard,
} from "../../../features/logic/captcha-reducer-logic";
import opener from "../../../assests/images/opener.svg";
import { DefaultOptions } from "../../../config/sites-config";
import { TaskModalSiteLists } from "../../../config/modal-config";
import { AppInputField, AppSpacer as Spacer } from "../../../component";
const {
  openSolverWindow,
  deleteSingleCaptcha,
  changeCaptchaData,
} = require("../../../helper/electron-bridge");

function CaptchaCard({ captchaCard, style }) {
  const [captcha, setCaptcha] = useState(captchaCard);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    let obj = { ...captcha };
    obj[name] = value;
    setCaptcha(obj);
    changeCaptchaData(obj);
    handleSave(obj);
  };

  const handleSiteSelect = ({ value }) => {
    let obj = { ...captcha };
    obj["captchaSite"] = value;
    setCaptcha(obj);
    changeCaptchaData(obj);
    handleSave(obj);
  };

  const handleSolverSelect = ({ value }) => {
    let obj = { ...captcha };
    obj["captchaSolver"] = value;
    setCaptcha(obj);
    changeCaptchaData(obj);
    handleSave(obj);
  };

  const handleSave = (obj) => {
    dispatch(updateCaptchaCard(obj));
  };

  const handleDeleteCard = () => {
    deleteSingleCaptcha(captcha["id"] || captchaCard["id"]);
    dispatch(deleteSingleCard(captchaCard));
  };

  const handleSolverWindow = () => {
    openSolverWindow(captcha);
  };

  const handleEdit = () => {
    setCaptcha((pre) => {
      return { ...pre, editTitle: !pre.editTitle };
    });
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  };

  return (
    <div className="captcha-card-container">
      <div className="captcha-card-inner">
        <div className="captcha-card-top">
          <div className="captcha-card-title">
            <input
              readOnly={
                captcha.isEditable ? captcha.editTitle : !captcha.editTitle
              }
              ref={inputRef}
              name="captchaTitle"
              onChange={handleChange}
              type="text"
              value={captcha.captchaTitle}
              style={{
                width: `${captcha?.captchaTitle?.length * 11 + 15}px`,
              }}
            />
            <img
              className="btn"
              onClick={handleEdit}
              src={edit}
              alt="edit-card"
            />
          </div>
          <div
            onClick={handleDeleteCard}
            className="captcha-card-top-trash btn"
          >
            <img src={trash} alt="trash-card" />
          </div>
        </div>
        <Spacer space={10} />
        <AppInputField
          value={TaskModalSiteLists.filter(
            (site) => site.value === captcha.captchaSite
          )}
          onChange={handleSiteSelect}
          isSelect={true}
          selectOptions={TaskModalSiteLists}
          isSelectDisable={!captcha?.isEditable}
        />
        <Spacer space={10} />
        <AppInputField
          isSelect={true}
          fieldTitle="Solver"
          onChange={handleSolverSelect}
          placeholderText="Select Solver"
          isSelectDisable={!captcha?.isEditable}
          selectOptions={DefaultOptions}
          value={DefaultOptions.filter(
            (option) => option.value === captcha.captchaSolver
          )}
        />
        <Spacer space={10} />
        <AppInputField
          value={captcha?.captchaProxy}
          fieldTitle="Proxy"
          onChange={handleChange}
          name="captchaProxy"
          placeholderText="Enter Proxy"
          disabled={!captcha?.isEditable}
        />
        <Spacer space={10} />
        <div className="captcha-card-bottom">
          <div onClick={handleSolverWindow} className="captcha-card-opener btn">
            <img src={opener} alt="" />
            <span>Open Solver</span>
          </div>
          <div className="captcha-card-opener btn">
            <img src={rplay} alt="" />
            <span>Open Youtube</span>
          </div>
        </div>
        <Spacer space={10} />
      </div>
    </div>
  );
}

export default CaptchaCard;
