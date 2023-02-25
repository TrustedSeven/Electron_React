import React from "react";
import { useDispatch, useSelector } from "react-redux";
import amazon from "../../../assests/images/amazon.svg";
import micro from "../../../assests/images/microsoft.svg";
import { AppSpacer } from "../../../component";
import {
  fetchGroupSessionsList,
  setSelectItem,
  setSelectedItemList,
  togglerTextPassword,
} from "../../../features/counterSlice";
import { selectedSessionGroup } from "../../../helper/electron-bridge";

function AccountLeftSessionsList({ data }) {
  const list = useSelector(fetchGroupSessionsList);
  const dispatch = useDispatch();

  const handleSessionSelection = (session) => {
    selectedSessionGroup(session);
    dispatch(setSelectItem(session));
    dispatch(togglerTextPassword(false));
    dispatch(setSelectedItemList([]));
  };

  return (
    <div className="account-left-account-list session">
      <h2>Sessions</h2>
      <AppSpacer space={10} />
      <div className="accounts-list-scroll">
        {list?.map((session, i) => (
          <div
            onClick={() =>
              handleSessionSelection({ ...session, type: "session-group" })
            }
            key={session.id}
            className={`accounts-small-card ${
              session.id === data.id && "active-account-card"
            }  `}
          >
            <img src={i === 0 ? amazon : micro} alt="company-icon" />
            <div className="account-details">
              <p className="company-name">{session.title}</p>
              <AppSpacer space={5} />
              <p>{session.sessionList.length} Accounts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountLeftSessionsList;
