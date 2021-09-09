import { SET_SNACKBAR, CLOSE_SNACKBAR } from "./actionTypes";

export const setSnackbar = (severity = "success", message = "") => async (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_SNACKBAR,
    alertInfo: { severity, message },
  });
};

export const closeSnackbar = () => (dispatch) => {
  dispatch({
    type: CLOSE_SNACKBAR,
  });
};
