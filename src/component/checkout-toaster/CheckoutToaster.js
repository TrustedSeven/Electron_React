import React, { useEffect, useState } from "react";
import "./styles.css";
import xbox from "../../assests/images/xbox.svg";
import close from "../../assests/images/close.svg";
import { useSelector } from "react-redux";
import { fetchLatestToasterState } from "../../features/counterSlice";
import { MAX_TOAST_LIMIT } from "../../toaster";
function CheckoutToaster() {
  const [list, setList] = useState([]);
  const latestToaster = useSelector(fetchLatestToasterState);

  useEffect(() => {
    if (Object.keys(latestToaster).length > 0) {
      setList((pre) => {
        if (pre.length < MAX_TOAST_LIMIT) {
          return [...pre, latestToaster];
        } else {
          return [...pre];
        }
      });
      setTimeout(() => {
        setList((pre) => {
          let arr = [...pre];
          arr.shift();
          return [...arr];
        });
      }, 5000);
    }
  }, [latestToaster]);

  return (
    <div className={`notification-container `}>
      {list?.map((key) => (
        <div className={`notification ${"toast"} `}>
          <div className="notification-image">
            <img src={key["productImage"] || xbox} alt="" />
          </div>
          <div className="notification-content">
            <p className="notification-title">Successful Checkout!</p>
            <p className="notification-item">{key["productName"]}</p>
          </div>
          <div className="notification-close-btn">
            <img src={close} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckoutToaster;
