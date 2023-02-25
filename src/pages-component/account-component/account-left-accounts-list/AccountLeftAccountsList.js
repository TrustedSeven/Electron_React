import React from "react";
import "./styles.css";
import {
  setSelectItem,
  togglerTextPassword,
  setSelectedItemList,
} from "../../../features/counterSlice";
import { useDispatch } from "react-redux";
import canada from "../../../assests/images/canada.svg";
import ssense from "../../../assests/images/ssense.svg";
import walmart from "../../../assests/images/walmart.svg";
import { AppSpacer } from "../../../component";

function AccountLeftAccountsList({ data, list }) {
  const dispatch = useDispatch();

  const handleAccount = (accounts) => {
    dispatch(setSelectItem(accounts));
    dispatch(togglerTextPassword(false));
    dispatch(setSelectedItemList([]));
  };
  return (
    <div className="account-left-account-list">
      <AppSpacer space={20} />
      <h2>Accounts</h2>
      <AppSpacer space={10} />
      <div className="accounts-list-scroll">
        {list?.map((account, i) => (
          <div
            onClick={() => handleAccount({ ...account, type: "account-group" })}
            key={account.id}
            className={`accounts-small-card ${
              account.id === data.id && "active-account-card"
            }  `}
          >
            <img
              src={i === 0 ? canada : i === 1 ? ssense : walmart}
              alt="company-icon"
            />
            <div className="account-details">
              <p className="company-name">{account.title}</p>
              <AppSpacer space={5} />
              <p>{account.accountList.length} Accounts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountLeftAccountsList;
