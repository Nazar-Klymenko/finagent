import { getAuthenticationStatus } from "@helpers/firebaseHelper";

import {
  FETCH_USER,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const initialAuthState = {
  displayName: "",
  isLoggedIn: !!getAuthenticationStatus(),
  isActive: false,
  isSendingRequest: true,
  photoURL: "",
};

export const user = (state = initialAuthState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        displayName: action.displayName,
        isLoggedIn: action.isLoggedIn,
        isActive: action.isActive,
        isSendingRequest: action.isSendingRequest,
        photoURL: action.photoURL,
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
        photoURL: action.photoURL,
      };

    default:
      return state;
  }
};
