import { fetchSettingPageState, setSettingState } from "../counterSlice";
import { updateSetting } from "../../helper/electron-bridge";

export const updateAppSettingState = (state) => (dispatch, getState) => {
  const settingState = fetchSettingPageState(getState());
  let tempState = { ...settingState };
  const {
    change: { name, value, checked, type },
    key,
  } = state;
  if (key === "root") {
    tempState[key] = type === "checkbox" ? checked : value;
  } else {
    let tempObj = { ...tempState[key] };
    tempObj[name] = type === "checkbox" ? checked : value;
    tempState[key] = tempObj;
  }
  updateSetting(tempState);
  console.log(tempState);
  dispatch(setSettingState(tempState));
};
