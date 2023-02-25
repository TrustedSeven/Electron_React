import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppButtonWithicon, AppInputField, AppSpacer } from "../../component";
import { ToastSuccess } from "../../toaster";
import tick from "../../assests/images/wcheck.svg";
import {
  fetchTempStorageState,
  setEditSingleProxyModalState,
  setTempStorage,
} from "../../features/counterSlice";
import { editSingleProxy } from "../../features/logic/proxy-group-reducer-logic";

function EditProxy() {
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useState(false);
  const [data, setData] = useState("");
  const editedRow = useSelector(fetchTempStorageState);

  useEffect(() => {
    if (editedRow !== undefined && Object.keys(editedRow).length > 0) {
      setData(editedRow["title"]);
    }
    return () => {
      dispatch(setTempStorage({}));
    };
  }, [editedRow, dispatch]);

  const handleProxyEditModal = () => {
    dispatch(setEditSingleProxyModalState());
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length > 0) {
      let obj = { ...editedRow };
      obj["title"] = data;
      dispatch(editSingleProxy(obj));
      handleProxyEditModal();
      ToastSuccess("Proxy Updated");
    } else setInvalid(true);
  };
  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-inner">
        <div className="modal-top">
          <h3>Edit Proxy</h3>
        </div>
        <AppSpacer space={50} />
        <AppInputField
          value={data}
          onChange={handleChange}
          fieldTitle="Proxy"
          placeholderText="Enter Proxy"
          invalid={invalid}
        />
        <AppSpacer space={30} />
        <div className="custom-profile-bottom">
          <div onClick={handleProxyEditModal} className="modal-cancel-btn btn">
            <span>Cancel</span>
          </div>
          <div className="profile-address-same">
            <AppButtonWithicon
              image={tick}
              type="submit"
              btnTitle="Save Proxy"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProxy;
