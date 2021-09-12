import { SIGNUP_SUCCESS, SIGNIN_SUCCESS } from "./actionTypes";
import { setSnackbar } from "../alert/actions";

import { auth } from "@helpers/firebaseHelper";

import { fetchUserAPI, signUpAPI } from "@api/userAPI";

export const signup = (data, callback) => async (dispatch) => {
  try {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: `${data.name} ${data.surname}`,
        });

        data.IdToken = userCredential.user.getIdToken();
      });
    const response = await signUpAPI(data);
    dispatch({
      type: SIGNUP_SUCCESS,
      displayName: `${response.data.displayName || ""}`,
      isLoggedIn: true,
      isSendingRequest: false,
      isApproved: false,
    });
    dispatch(setSnackbar("success", "Signed up successfully"));
    callback();
  } catch (error) {
    switch (error.response?.status) {
      case 409: {
        return dispatch(setSnackbar("error", "This user already exists"));
      }
      case 422: {
        return dispatch(setSnackbar("error", "You have entered incorect data"));
      }
      default: {
        return dispatch(setSnackbar("error", "failed to sign up"));
      }
    }
  }
};
export const login = (email, password, callback) => async (dispatch) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);

    const { data } = await fetchUserAPI();
    dispatch({
      type: SIGNIN_SUCCESS,
      displayName: response.user.displayName,
      isSendingRequest: false,
      isLoggedIn: true,
      role: data?.admin?.role,
      isApproved: data?.admin?.isApproved,
    });
    dispatch(setSnackbar("success", "logged in successfully"));
    callback();
  } catch (error) {
    switch (error.response?.status) {
      case 401: {
        return dispatch(setSnackbar("error", "Incorrect email or password"));
      }
      default: {
        dispatch(setSnackbar("error", "error logging in"));
      }
    }
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: "LOGOUT" });
};

export const fetchUser = () => async (dispatch) => {
  try {
    await auth.onAuthStateChanged(async function (user) {
      const { data } = await fetchUserAPI();
      console.log(data);
      if (user) {
        dispatch({
          type: "FETCH_USER",
          isLoggedIn: true,
          displayName: user.displayName,
          isSendingRequest: false,
          role: data?.admin?.role || "admin",
          isApproved: data?.admin?.isApproved,
        });
      } else {
        dispatch({
          type: "FETCH_USER",
          isLoggedIn: false,
        });
      }
    });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
  }
};

export function resetPassword(email) {
  auth.sendPasswordResetEmail(email);
}

export async function updateEmail(email) {
  await auth.currentUser?.updateEmail(email);
}

export function updatePassword(password) {}
