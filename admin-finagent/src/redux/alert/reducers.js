import { CLOSE_SNACKBAR, SET_SNACKBAR } from "./actionTypes";

const initialAlertState = {
  alertInfo: {
    isOpen: false,
    severity: "success",
    message: "",
  },
};

export const alerts = (state = initialAlertState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        alertInfo: {
          isOpen: true,
          severity: action.alertInfo.severity,
          message: action.alertInfo.message,
        },
      };
    case CLOSE_SNACKBAR:
      return {
        alertInfo: {
          isOpen: false,
          severity: state.alertInfo.severity,
          message: state.alertInfo.message,
        },
      };
    default:
      return state;
  }
};
