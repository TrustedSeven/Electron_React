import React from "react";
import "./sidebar-option.css";
import { NavLink as Link } from "react-router-dom";

function SidebarOption({
  image,
  activeImage,
  title,
  linkTo = "/",
  isActive = false,
  ...props
}) {
  return (
    <Link
      to={linkTo}
      {...props}
      className={`sidebar-option-container ${isActive && "active-link"}`}
    >
      <div className="sidebar-wrapper-details">
        <div className="sidebar-option-image-container">
          <img src={image} alt={`${title}-icon`} />
          <img src={activeImage} alt={`${title}-active-icon`} />
        </div>
        <span className="text-600">{title}</span>
      </div>
      <div className="active-indicator" />
    </Link>
  );
}

export default SidebarOption;
