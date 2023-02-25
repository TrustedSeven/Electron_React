import React from "react";
import "./styles.css";
import CaptchaPageCard from "../captcha-card/CaptchaCard";

function CaptchaCardWrapper({ list }) {
  return (
    <div className="captcha-card-wrapper">
      {list.map((captcha, i) => (
        <CaptchaPageCard
          captchaCard={captcha}
          key={`captcha-card-key-${captcha.id || i}`}
        />
      ))}
    </div>
  );
}

export default CaptchaCardWrapper;
