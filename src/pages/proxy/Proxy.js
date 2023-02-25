import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import {
  fetchProxyGroupList,
  fetchSelectedItem,
  setSelectedItemList,
  setSelectItem,
} from "../../features/counterSlice";
import {
  ProxyPageLeftCardList,
  ProxyPageLeftTop,
  ProxyPageRightTop,
  ProxyPageScrollableTable,
} from "../../pages-component";
import { hideToaster } from "../../toaster";

function Proxy() {
  const data = useSelector(fetchSelectedItem);
  const list = useSelector(fetchProxyGroupList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (list?.length) {
      dispatch(setSelectItem({ ...list[0], type: "proxy-group" }));
    }
    return () => {
      hideToaster();
      dispatch(setSelectItem({}));
      dispatch(setSelectedItemList([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="task-container">
      <div className="task-container-left">
        <AppSpacer space={20} />
        <ProxyPageLeftTop />
        <ProxyPageLeftCardList {...{ data, list }} />
      </div>
      <div className="task-container-right">
        <AppSpacer space={20} />
        <ProxyPageRightTop {...{ data }} />
        <ProxyPageScrollableTable {...{ data }} />
      </div>
    </div>
  );
}

export default Proxy;
