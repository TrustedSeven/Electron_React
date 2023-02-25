import { v4 as uuid } from "uuid";
import { fetchCaptchaList, appendCaptchaCardList } from "../counterSlice";

const CAPTCHA_CARD_SCHEMA = {
  isSolverOpen: false,
  captchaSite: "",
  captchaSolver: "",
  captchaProxy: "",
  captchaTitle: "",
  isEditable: true,
  editTitle: true,
};

export const addNewCaptchaCardInList = () => (dispatch, getState) => {
  const captchaList = fetchCaptchaList(getState());
  let obj = { ...CAPTCHA_CARD_SCHEMA };
  obj["id"] = uuid();
  obj["captchaTitle"] = `Captcha ${captchaList.length + 1}`;
  let combiner = [...captchaList, obj];
  dispatch(appendCaptchaCardList(combiner));
};

export const deleteSingleCard = (card) => (dispatch, getState) => {
  const captchaList = fetchCaptchaList(getState());
  let tempList = [...captchaList];
  let tempCard = { ...card };
  let afterUpdate = tempList.filter((data) => data["id"] !== tempCard["id"]);
  dispatch(appendCaptchaCardList(afterUpdate));
};

export const updateCaptchaCard = (card) => (dispatch, getState) => {
  const captchaList = fetchCaptchaList(getState());
  let tempList = [...captchaList];
  let tempCard = { ...card };
  let afterUpdate = tempList.map((preCard) => {
    if (preCard["id"] === tempCard["id"]) {
      return tempCard;
    }
    return preCard;
  });
  dispatch(appendCaptchaCardList(afterUpdate));
};

export const deleteAllCaptchaCard = () => (dispatch, _) => {
  dispatch(appendCaptchaCardList([]));
};

export const disableEditOption = () => (dispatch, getState) => {
  const captchaList = fetchCaptchaList(getState());
  let tempList = [...captchaList];
  let disableCaptch = tempList.map((captcha) => {
    let obj = { ...captcha };
    obj["isEditable"] = false;
    obj["editTitle"] = false;
    return obj;
  });
  dispatch(appendCaptchaCardList(disableCaptch));
};
