import { getAuthenticationStatus } from "@helpers/authHelper";

import {
  FETCH_USER,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const initialAlertState = {
  displayName: "",
  isLoggedIn: !!getAuthenticationStatus(),
  isActive: false,
  isApproved: false,
  role: "admin",
  isSendingRequest: true,
};

export const user = (state = initialAlertState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        displayName: action.displayName,
        isLoggedIn: action.isLoggedIn,
        isActive: action.isActive,
        isSendingRequest: action.isSendingRequest,
        role: action.role,
      };
    case LOGOUT:
      return {
        ...state,
        displayName: "",
        isLoggedIn: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        displayName: action.displayName,
        isLoggedIn: action.isLoggedIn,
        isActive: action.isActive,
        isSendingRequest: false,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        displayName: action.displayName,
        isLoggedIn: action.isLoggedIn,
        isActive: action.isActive,
        role: action.role,
      };

    default:
      return state;
  }
};
