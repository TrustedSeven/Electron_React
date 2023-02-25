import { toast } from "react-toastify";

export const MAX_TOAST_LIMIT = 3;

const TOAST_CONFIGURATION = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const ToastSuccess = (msg = "🦄 Wow so easy!") => {
  toast.success(msg, TOAST_CONFIGURATION);
};

export const ToastWarning = (msg = "🦄 Wow so easy!", time = 5000) => {
  toast.warn(msg, { ...TOAST_CONFIGURATION, autoClose: time });
};

export const ToastInfo = (msg = "🦄 Wow so easy!") => {
  toast.info(msg, TOAST_CONFIGURATION);
};

export const hideToaster = () => {
  toast.clearWaitingQueue();
  toast.dismiss();
};
