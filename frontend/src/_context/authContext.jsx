import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "@services/firebase";
import { setSnackbar } from "@redux/alert/actions";
import { useDispatch } from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
  confirmPasswordReset,
  sendEmailVerification,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import { signUpAPI, signUpFacebookAPI } from "@api/userAPI";

const AuthContext = createContext({
  currentUser: {
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    photoURL: "",
  },
  signup: () => Promise,
  login: (email, password) => Promise,
  loginFacebook: () => Promise,
  logout: (redirectCallback) => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
          : {
              displayName: "",
              isLoggedIn: false,
              isActive: false,
              isSendingRequest: false,
              photoURL: "",
            }
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  async function signup(data) {
    let newData = data;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = auth.currentUser;
      let additionalInfo = await getAdditionalUserInfo(response);

      await updateProfile(user, {
        displayName: `${data.name} ${data.surname}`,
      });

      newData.IdToken = await user.getIdToken();
      newData.provider = additionalInfo.providerId;

      const backendResponse = await signUpAPI(newData).catch((error) => {
        deleteUser(user);
        throw new Error();
      });
      await sendEmailVerification(auth.currentUser);

      dispatch(setSnackbar("success", "SnackBar.confirmEmail"));

      setCurrentUser((currentUser) => {
        return {
          ...currentUser,
          displayName: `${data.name} ${data.surname}`,
        };
      });
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
  }

  async function login(email, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      dispatch(setSnackbar("success", "SnackBar.successfulLogginIn"));
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
  }

  async function loginFacebook() {
    const provider = new FacebookAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      const additionalInfo = await getAdditionalUserInfo(response);

      const user = auth.currentUser;

      if (additionalInfo.isNewUser) {
        await signUpFacebookAPI({ additionalInfo, uid: user.uid }).catch(
          (error) => {
            deleteUser(user);
            throw new Error();
          }
        );
      }

      dispatch(setSnackbar("success", "SnackBar.successfulLogginIn"));
    } catch (error) {
      dispatch(setSnackbar("error", "SnackBar.loginError"));
    }
  }

  async function resendVerificationEmail() {
    try {
      await sendEmailVerification(auth.currentUser);
      dispatch(setSnackbar("success", "SnackBar.emailWasResent"));
    } catch (error) {
      dispatch(setSnackbar("error", "SnackBar.errorResendingEmail"));
    }
  }
  async function resetPassword(email) {
    await auth.sendPasswordResetEmail(email);
  }

  async function updateEmail(email) {
    await auth.currentUser?.updateEmail(email);
  }

  async function logout(redirectCallback) {
    await signOut(auth);
    redirectCallback();
  }

  const value = {
    currentUser,
    signup,
    resetPassword,
    updateEmail,
    login,
    loginFacebook,
    logout,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
