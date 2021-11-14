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
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
  updatePassword,
  deleteUser,
  updateProfile,
} from "firebase/auth";

import { fetchUserAPI, signUpAPI } from "@api/auth";

const AuthContext = createContext({
  currentUser: {
    displayName: "",
    isLoggedIn: false,
    isApproved: false,
    role: "admin",
    isSendingRequest: true,
  },
  signup: () => Promise,
  login: (email, password) => Promise,
  logout: (redirectCallback) => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    isLoggedIn: false,
    isApproved: false,
    role: "admin",
    isSendingRequest: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let data;

      if (user) {
        const response = await fetchUserAPI();
        data = response.data;
      }

      setCurrentUser(
        user
          ? {
              displayName: user.displayName,
              isLoggedIn: true,
              role: data?.admin?.role,
              isApproved: data?.admin?.isApproved,
              isSendingRequest: false,
            }
          : {
              displayName: "",
              isLoggedIn: false,
              isApproved: false,
              role: "admin",
              isSendingRequest: true,
            }
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signup(data) {
    let newData = data;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: `${data.name} ${data.surname}`,
      });

      newData.IdToken = await user.getIdToken();

      const backendResponse = await signUpAPI(newData).catch((error) => {
        deleteUser(user);
        throw new Error();
      });

      dispatch(setSnackbar("success", "SnackBar.success"));

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

  async function resetPassword(email) {
    await auth.sendPasswordResetEmail(email);
  }

  async function setUpdatedPassword(currentPassword, newPassword) {
    await reauthenticate(currentPassword).catch((error) => {
      dispatch(
        setSnackbar("error", "Settings.ChangePassword.errorInvalidPassword")
      );
    });
    await updatePassword(auth.currentUser, newPassword);
    setSnackbar("success", "Settings.ChangePassword.alertSuccess");
  }

  async function logout() {
    await signOut(auth);
  }

  async function updateDisplayName(name, surname) {
    const user = auth.currentUser;

    await updateProfile(user, {
      displayName: `${name} ${surname}`,
    });
    setCurrentUser((currentUser) => {
      return {
        ...currentUser,
        displayName: `${name} ${surname}`,
      };
    });
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function reauthenticate(currentPassword) {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }

  const value = {
    currentUser,
    signup,
    resetPassword,
    login,
    setUpdatedPassword,
    updateDisplayName,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
