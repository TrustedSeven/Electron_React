import React from "react";
import "./captcha.css";
import {
  CaptchaPageCardWrapper,
  CaptchaPagetop,
  CaptchaPageTopBtnsWrapper,
} from "../../pages-component";
import { AppSpacer } from "../../component";
import { disableEditOption } from "../../features/logic/captcha-reducer-logic";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaptchaList } from "../../features/counterSlice";
import { triggerInstanceCreation } from "../../helper/electron-bridge";

function Captcha() {
  const dispatch = useDispatch();
  const list = useSelector(fetchCaptchaList);

  React.useEffect(() => {
    return () => {
      dispatch(disableEditOption());
      triggerInstanceCreation();
    };
  }, [dispatch]);

  return (
    <div className="captcha-page-container">
      <div className="captcha-top-sticky">
        <AppSpacer space={20} />
        <CaptchaPagetop />
        <AppSpacer space={60} />
        <CaptchaPageTopBtnsWrapper {...{ list }} />
      </div>
      <CaptchaPageCardWrapper {...{ list }} />
    </div>
  );
}

export default Captcha;
