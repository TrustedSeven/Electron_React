import React from "react";
import { useDispatch } from "react-redux";
import add from "../../../assests/images/add.svg";
import trash from "../../../assests/images/trash.svg";
import {
  addNewCaptchaCardInList,
  deleteAllCaptchaCard,
} from "../../../features/logic/captcha-reducer-logic";
import { deleteAllCaptchaInstance } from "../../../helper/electron-bridge";

function CaptchaTopBtns({ list }) {
  const dispatch = useDispatch();

  const handleAddCaptchaCard = () => {
    dispatch(addNewCaptchaCardInList());
  };

  const handleDeleteAllCaptchaCard = () => {
    deleteAllCaptchaInstance();
    dispatch(deleteAllCaptchaCard());
  };

  return (
    <div className="task-right-top-btns-wrapper">
      <div className="task-right-top-btns-left">
        <div
          style={{ height: "35px" }}
          onClick={handleAddCaptchaCard}
          className="task-right-top-btn-container btn"
        >
          <img src={add} alt="" />
          <span>New Solver</span>
        </div>
      </div>
      <div className="task-right-top-btns-right">
        {list?.length > 0 && (
          <div
            style={{
              backgroundColor: "rgba(240, 85, 85, 0.05)",
              height: "35px",
            }}
            onClick={handleDeleteAllCaptchaCard}
            className="task-scrollable-bottom-btn btn"
          >
            <img src={trash} alt="" />
            <span>Delete All Solvers</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaptchaTopBtns;
