import React, { useState } from "react";
import {
  AccountsPageLeftTop,
  AccountsPageRightTop,
  AccountPageSessionTable,
  AccountsPageScrollableTable,
  AccountsPageLeftAccountsList,
  AccountsPageleftSessionsList,
  AcountsPageTopRightBtnsWrapper,
} from "../../pages-component";
import {
  setSelectItem,
  fetchSelectedItem,
  setSelectedItemList,
  fetchGroupAccountsList,
} from "../../features/counterSlice";
import { hideToaster } from "../../toaster";
import { AppSpacer } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { searchInArrayFunction } from "../../hooks/fuse-search";

function Accounts() {
  const dispatch = useDispatch();
  const data = useSelector(fetchSelectedItem);
  const [sortTable, setSorTable] = useState([]);
  const list = useSelector(fetchGroupAccountsList);

  React.useEffect(() => {
    if (data["type"] === "account-group") {
      setSorTable(() => [...data["accountList"]]);
    } else if (data["type"] === "session-group") {
      setSorTable(() => [...data["sessionList"]]);
    } else setSorTable([]);
  }, [data]);

  React.useEffect(() => {
    dispatch(setSelectItem({ ...list[0], type: "account-group" }));
    return () => {
      hideToaster();
      dispatch(setSelectItem({}));
      dispatch(setSelectedItemList([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleTriggerSort = (value, list) => {
    if (value?.length > 0) {
      const result = searchInArrayFunction({
        searchText: value,
        searchKey: "ACCOUNT",
        searchInList: sortTable || list,
      });
      if (result.length > 0) {
        setSorTable(result);
      } else setSorTable([]);
    } else if (data["type"] === "account-group") {
      setSorTable(() => [...data["accountList"]]);
    } else if (data["type"] === "session-group") {
      setSorTable(() => [...data["sessionList"]]);
    }
  };

  return (
    <div style={{ overflow: "hidden" }} className="task-container">
      <div className="task-container-left">
        <AppSpacer space={20} />
        <AccountsPageLeftTop />
        <AccountsPageLeftAccountsList {...{ data, list }} />
        <AppSpacer space={20} />
        <AccountsPageleftSessionsList {...{ data }} />
      </div>
      <div className="task-container-right">
        <AppSpacer space={20} />
        <AccountsPageRightTop {...{ data }} />
        <AcountsPageTopRightBtnsWrapper {...{ data, handleTriggerSort }} />
        {/* HERE WE RENDER TABLE ON TYPE OS SELECTE GROUP  */}
        {Object.keys(data).length > 0 && data["type"] === "account-group" ? (
          <AccountsPageScrollableTable {...{ data, sortTable }} />
        ) : (
          <AccountPageSessionTable {...{ data, sortTable }} />
        )}
      </div>
    </div>
  );
}

export default Accounts;
