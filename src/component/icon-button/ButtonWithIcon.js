import React from "react";
import "./button.css";
import add from "../../assests/images/add.svg";
import { Link } from "react-router-dom";
function ButtonWithIcon({
  image = add,
  btnTitle = "New Task Group",
  btnColor = "",
  isReverse = false,
  isLink = false,
  isCustomStyleButton = false,
  to = "/",
  ...props
}) {
  return !isLink ? (
    !isCustomStyleButton ? (
      <button
        {...props}
        style={{
          backgroundColor: btnColor,
          flexDirection: isReverse ? "row-reverse" : "row",
        }}
        className="button-container"
      >
        <img src={image} alt="add-icon" />
        <span className="text-700">{btnTitle}</span>
      </button>
    ) : (
      <button {...props} className="button-container custom-btn">
        <img src={image} alt="add-icon" />
        <span className="text-700">{btnTitle}</span>
      </button>
    )
  ) : (
    <Link
      to={to}
      style={{
        backgroundColor: btnColor,
        flexDirection: isReverse ? "row-reverse" : "row",
      }}
      className="button-container"
    >
      <img src={image} alt="add-icon" />
      <span className="text-700">{btnTitle}</span>
    </Link>
  );
}

export default ButtonWithIcon;
