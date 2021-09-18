import { SIGNUP_SUCCESS, SIGNIN_SUCCESS } from "./actionTypes";
import { setSnackbar } from "../alert/actions";

import { auth } from "@helpers/firebaseHelper";

import { signUpAPI, signUpFacebookAPI } from "@api/userAPI";
import firebase from "@services/firebase";

export const signup = (data, callback) => async (dispatch) => {
  try {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: `${data.name} ${data.surname}`,
        });
        userCredential.user.sendEmailVerification();
        data.IdToken = userCredential.user.getIdToken();
      });
    const response = await signUpAPI(data);

    dispatch({
      type: SIGNUP_SUCCESS,
      displayName: `${response.data.displayName || ""}`,
      isLoggedIn: true,
      isSendingRequest: false,
      isActive: false,
    });
    dispatch(setSnackbar("success", "SnackBar.confirmEmail"));
    callback();
  } catch (error) {
    switch (error.response?.status) {
      case 409: {
        return dispatch(setSnackbar("error", "SnackBar.userExists"));
      }
      case 422: {
        return dispatch(setSnackbar("error", "SnackBar.incorrectData"));
      }
      default: {
        return dispatch(setSnackbar("error", "SnackBar.signUpFail"));
      }
    }
  }
};
export const login = (email, password, callback) => async (dispatch) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);

    dispatch({
      type: SIGNIN_SUCCESS,
      displayName: response.user.displayName,
      isLoggedIn: true,
      isActive: response.user.emailVerified,
    });
    dispatch(setSnackbar("success", "SnackBar.successfulLogginIn"));
    callback();
  } catch (error) {
    switch (error.response?.status) {
      case 401: {
        return dispatch(
          setSnackbar("error", "SnackBar.incorrectEmailOrPassword")
        );
      }
      default: {
        dispatch(setSnackbar("error", "SnackBar.loginError"));
      }
    }
  }
};

export const loginFacebook = () => async (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  try {
    const response = await auth.signInWithPopup(provider);

    if (response.additionalUserInfo.isNewUser) {
      signUpFacebookAPI(response);
    }
    dispatch({
      type: SIGNIN_SUCCESS,
      displayName: response.user.displayName,
      isLoggedIn: true,
      isActive: true,
      photoURL: response.user.photoURL,
    });
    dispatch(setSnackbar("success", "SnackBar.successfulLogginIn"));
  } catch (error) {
    dispatch(setSnackbar("error", "SnackBar.loginError"));
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: "LOGOUT" });
};

export const fetchUser = () => async (dispatch) => {
  try {
    await auth.onAuthStateChanged(async (user) => {
      if (user) {
        user.getIdToken(true);
        let emailVerified;
        let photoURL = "";
        if (user.providerData[0]?.providerId === "facebook.com") {
          emailVerified = true;

          photoURL = user.photoURL;
        } else {
          emailVerified = user.emailVerified;
        }

        dispatch({
          type: "FETCH_USER",
          isLoggedIn: true,
          displayName: user.displayName,
          isSendingRequest: false,
          isActive: emailVerified,
          photoURL: photoURL,
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

export const resendVerificationEmail = () => async (dispatch) => {
  try {
    await auth.currentUser.sendEmailVerification();
    dispatch(setSnackbar("success", "SnackBar.emailWasResent"));
  } catch (error) {
    dispatch(setSnackbar("error", "SnackBar.errorResendingEmail"));
  }
};

export const resetPassword = async (email) => {
  await auth.sendPasswordResetEmail(email);
};

export const updateEmail = async (email) => {
  await auth.currentUser?.updateEmail(email);
};

export const updatePassword = async (password) => {};
