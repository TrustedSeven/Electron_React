import React from "react";
import {
  setSelectItem,
  setProxyGroupModalState,
} from "../../../features/counterSlice";
import { useDispatch } from "react-redux";
import add from "../../../assests/images/gadd.svg";

function ProxyCardWrapper({ data, list }) {
  const dispatch = useDispatch();

  const handleProxyGroupModal = () => {
    dispatch(setProxyGroupModalState());
  };

  const handleGroup = (group) => {
    dispatch(setSelectItem(group));
  };

  return (
    <div className="profile-left-top-card-container">
      <div
        onClick={handleProxyGroupModal}
        className="profile-left-top-card-add-profile"
      >
        <img src={add} alt="add-icon" />
        <span className="btn">New Proxy Group</span>
      </div>
      <div className="profile-scroll-height proxies">
        {list.map((proxy, i) => (
          <div
            key={proxy.id}
            onClick={() => handleGroup({ ...proxy, type: "proxy-group" })}
            className={`profile-left-card button ${
              proxy.id === data.id && "active-profile"
            }`}
          >
            <h2>{proxy.groupName}</h2>
            <div className="profile-counter">
              <span>{proxy.list.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProxyCardWrapper;
