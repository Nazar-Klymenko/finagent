import { createContext, useContext, useEffect, useState } from "react";
import { firebase, auth } from "@services/firebase";
import { setSnackbar } from "@redux/alert/actions";
import { signUpAPI, signUpFacebookAPI } from "@api/userAPI";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: {
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    photoURL: "",
  },
  signup: () => Promise,
  login: (email, password, callback) => Promise,
  loginFacebook: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: false,
    photoURL: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      let emailVerified;
      let photoURL = "";
      if (user) {
        user.getIdToken(true);

        if (user.providerData[0]?.providerId === "facebook.com") {
          emailVerified = true;

          photoURL = user.photoURL;
        } else {
          emailVerified = user.emailVerified;
        }
      }

      setCurrentUser(
        user
          ? {
              displayName: user.displayName,
              isLoggedIn: true,
              isActive: emailVerified,
              isSendingRequest: false,
              photoURL: photoURL,
            }
          : null
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  const signup = (data, callback) => async (dispatch) => {
    try {
      await auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: `${data.name} ${data.surname}`,
          });
          userCredential.user.sendEmailVerification();
          data.IdToken = userCredential.user.getIdToken();
          data.provider = userCredential.additionalUserInfo.providerId;
        });
      const response = await signUpAPI(data);

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

  const login = (email, password, callback) => async (dispatch) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

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

  const loginFacebook = () => async (dispatch) => {
    const provider = new FacebookAuthProvider();
    try {
      const response = await signInWithPopup(provider);

      if (response.additionalUserInfo.isNewUser) {
        signUpFacebookAPI(response);
      }

      dispatch(setSnackbar("success", "SnackBar.successfulLogginIn"));
    } catch (error) {
      dispatch(setSnackbar("error", "SnackBar.loginError"));
    }
  };

  const resendVerificationEmail = () => async (dispatch) => {
    try {
      await auth.currentUser.sendEmailVerification();
      dispatch(setSnackbar("success", "SnackBar.emailWasResent"));
    } catch (error) {
      dispatch(setSnackbar("error", "SnackBar.errorResendingEmail"));
    }
  };

  const resetPassword = async (email) => {
    await auth.sendPasswordResetEmail(email);
  };

  const updateEmail = async (email) => {
    await auth.currentUser?.updateEmail(email);
  };

  const value = {
    currentUser,
    signup,
    resetPassword,
    updateEmail,
    login,
    loginFacebook,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
