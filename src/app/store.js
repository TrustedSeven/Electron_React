import { configureStore } from "@reduxjs/toolkit";
import arcAioReducer, { STATE_KEY } from "../features/counterSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "ARC-AIO-New",
  storage,
  blacklist: [
    "profileModalState",
    "profileGroupModalState",
    "proxyGroupModalState",
    "addAcountModalState",
    "taskGroupModalState",
    "taskModalState",
    "displayPassword",
    "editGroupNameModal",
    "editSingleProxyModalState",
    "editTaskGroupModlaState",
    "sendToaster",
  ],
};

const persistArcAioReducer = persistReducer(persistConfig, arcAioReducer);

export const store = configureStore({
  reducer: {
    [STATE_KEY]: persistArcAioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
