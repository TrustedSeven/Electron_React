import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditModalState,
  fetchSelectedItem,
  setProxyGroupModalState,
  setTriggerModal,
} from "../../features/counterSlice";
import { AppSpacer, AppInputField, AppButtonWithicon } from "../../component";
import {
  addProxyGroup,
  updateProxyGroup,
} from "../../features/logic/proxy-group-reducer-logic";
import add from "../../assests/images/add.svg";
import check from "../../assests/images/wcheck.svg";
import { ToastSuccess } from "../../toaster";

const regex = /\w+.\w+.\w+.\w+:\d{4,}:?\w*:?\w*/;
const localFormat = /(local|localhost)$/i;

function ProxyGroup() {
  const dispatch = useDispatch();
  const item = useSelector(fetchSelectedItem);
  const state = useSelector(fetchEditModalState);
  const [invalid] = useState(false);
  const [proxyGroup, setProxyGroup] = useState({
    proxies: "",
    groupName: "",
  });

  React.useEffect(() => {
    if (state === "edit-proxy" && item["type"] === "proxy-group") {
      setProxyGroup(() => {
        return { proxies: item["proxies"], groupName: item["groupName"] };
      });
    }
    return () => {
      dispatch(setTriggerModal(""));
    };
  }, [state, item, dispatch]);

  const handleProxyGroupModal = () => {
    dispatch(setProxyGroupModalState());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProxyGroup((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = [];
    proxyGroup.proxies.split("\n").forEach((line) => {
      if (localFormat.test(line)) {
        valid.push(line);
      } else {
        if (regex.test(line)) {
          valid.push(line);
        }
      }
    });
    if (state === "edit-proxy") {
      dispatch(updateProxyGroup({ data: proxyGroup, list: valid }));
    } else {
      dispatch(addProxyGroup({ data: proxyGroup, list: valid }));
      ToastSuccess(`Proxy Group created`);
    }
    handleProxyGroupModal();
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-inner">
        <div className="modal-top">
          <h3>
            {state === "edit-proxy" ? "Edit Proxy Group" : "New Proxy Group"}
          </h3>
        </div>
        <AppSpacer space={50} />
        <AppInputField
          required
          name="groupName"
          onChange={handleChange}
          value={proxyGroup.groupName}
          fieldTitle="Proxy Group Name"
          placeholderText="Enter Proxy Group Name"
        />
        <AppSpacer space={10} />
        <AppInputField
          value={proxyGroup.proxies}
          fieldTitle="Proxy Group"
          placeholderText="Enter Proxy"
          isMulti={true}
          onChange={handleChange}
          name="proxies"
          multiHeight="200px"
          invalid={invalid}
        />
        <AppSpacer space={30} />
        <div className="custom-profile-bottom">
          <div onClick={handleProxyGroupModal} className="modal-cancel-btn btn">
            <span>Cancel</span>
          </div>
          <div className="profile-address-same">
            <AppButtonWithicon
              image={state === "edit-proxy" ? check : add}
              type="submit"
              btnTitle={
                state === "edit-proxy" ? "Save Proxy Group" : "New Proxy Group"
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProxyGroup;
