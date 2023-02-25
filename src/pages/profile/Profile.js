import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import {
  fetchDisplayCardStyles,
  fetchProfileList,
  fetchSelectedItem,
  setSelectedItemList,
  setSelectItem,
} from "../../features/counterSlice";
import {
  ProfilePageCardWrapper,
  ProfilePageLeftProfilesCard,
  ProfilePageLeftTop,
  ProfilePageRightTop,
  ProfilePageRightTopBtnWrapper,
  ProfilePageScrollTable,
} from "../../pages-component";
import { searchInArrayFunction } from "../../hooks/fuse-search";
import { hideToaster } from "../../toaster";

function Profile() {
  const list = useSelector(fetchProfileList);
  const data = useSelector(fetchSelectedItem);
  const style = useSelector(fetchDisplayCardStyles);
  const dispatch = useDispatch();
  const [sortTable, setSorTable] = useState([]);

  React.useEffect(() => {
    if (list.length > 0) {
      dispatch(setSelectItem({ ...list[0], type: "profile-group" }));
    }

    return () => {
      hideToaster();
      dispatch(setSelectItem({}));
      dispatch(setSelectedItemList([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    if (data["type"] === "profile-group") {
      setSorTable(() => [...data["list"]]);
    } else setSorTable([]);
  }, [data]);

  const handleTriggerSort = (value, list) => {
    if (value?.length > 0) {
      const result = searchInArrayFunction({
        searchText: value,
        searchKey: "PROFILE",
        searchInList: sortTable || list,
      });
      if (result.length > 0) {
        setSorTable(result);
      } else setSorTable([]);
    } else setSorTable(() => [...data["list"]]);
  };

  return (
    <div className="task-container">
      <div
        style={{ backgroundColor: "rgba(255, 255, 255, 0.01)" }}
        className="task-container-left "
      >
        <AppSpacer space={20} />
        <ProfilePageLeftTop />
        <ProfilePageLeftProfilesCard {...{ list, data }} />
      </div>
      <div
        style={{ padding: "10px 20px 0px" }}
        className="task-container-right profile-right"
      >
        <AppSpacer space={20} />
        <ProfilePageRightTop {...{ data, style }} />
        <AppSpacer space={10} />
        <ProfilePageRightTopBtnWrapper {...{ style, handleTriggerSort }} />
        {style === "flex" ? (
          <ProfilePageCardWrapper {...{ data, style, sortTable }} />
        ) : (
          <ProfilePageScrollTable {...{ data, style, sortTable }} />
        )}
      </div>
    </div>
  );
}

export default Profile;
