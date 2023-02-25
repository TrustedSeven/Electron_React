import {
  appendNewCheckoutInList,
  fetchCheckoutTableState,
} from "../counterSlice";

export const addNewCheckout = (checkout) => (dispatch, getState) => {
  const currentList = fetchCheckoutTableState(getState());
  let combiner = [...currentList, checkout];
  dispatch(appendNewCheckoutInList(combiner));
};
