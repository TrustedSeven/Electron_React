import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import right from "../../assests/images/right.svg";
import logo from "../../assests/images/big-logo.svg";
import { setUserState } from "../../features/counterSlice";
import { AppInputField, AppButtonWithicon, AppSpacer } from "../../component";
import { authenticateTheUser } from "../../helper/electron-bridge";
import { ToastWarning } from "../../toaster";

function Login() {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const result = await authenticateTheUser(key);
      if (result) {
        dispatch(setUserState({ user: "test", key }));
      } else ToastWarning("Invalid key");
    } catch (e) {
      ToastWarning("Error" + e.message);
    }
  };

  const handleKeyChange = (e) => {
    const { value } = e.target;
    setKey(value);
  };

  return (
    <div className="login-page-wrapper">
      <form onSubmit={handleLogIn} className="login-page-inner">
        <AppSpacer space={60} />
        <div className="login-page-logo-container">
          <img src={logo} alt="arc-login-icon" />
        </div>
        <AppSpacer space={50} />
        <div className="login-page-inputfield">
          <AppInputField
            required
            value={key}
            onChange={handleKeyChange}
            hideLabel={true}
            placeholderText="Enter Key"
          />
        </div>
        <AppSpacer space={40} />
        <div className="login-page-btn-wrapper">
          <AppButtonWithicon
            type="submit"
            image={right}
            isReverse={true}
            btnTitle="Login to Arc AIO"
          />
        </div>
        <AppSpacer space={70} />
        <div className="login-page-helper-text">
          <span>Forgot Key?</span>
          <span className="btn"> Dashboard</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
