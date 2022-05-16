import { createContext, useContext, useEffect, useState } from "react";

import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@services/firebase";

import { deleteUserAPI, getUserApi, signUpAPI } from "@api/userAPI";

const AuthContext = createContext({
  currentUser: {
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    photoURL: "",
    provider: "",
    isAdmin: false,
    isApproved: false,
    isSupervisor: false,
    isAwaitingApproval: false,
    isRejected: false,
  },
  signup: (data) => Promise,
  login: (email, password) => Promise,
  logout: (redirectCallback) => Promise,
  forgotPassword: () => Promise,
  deleteAccount: (password) => Promise,
  resetPassword: (email) => Promise,
  setUpdatedPassword: (currentPassword, newPassword) => Promise,
  updateDisplayName: (displayName) => Promise,
  requestAdmin: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const dispatch = () => {
    return null;
  };
  const setSnackbar = () => {
    return null;
  };

  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    isAdmin: false,
    isApproved: false,
    isSupervisor: false,
    isAwaitingApproval: false,
    isRejected: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let _user;
      if (user) {
        const userResponse = await getUserApi();
        _user = userResponse.data.user;
      }

      setCurrentUser(
        user && _user
          ? {
              displayName: user.displayName,
              isLoggedIn: true,
              isActive: user.emailVerified,
              isSendingRequest: false,
              isAdmin: _user.isAdmin,
              isApproved: _user.isApproved,
              isSupervisor: _user.isSupervisor,
              isAwaitingApproval: _user.isAwaitingApproval,
              isRejected: _user.isRejected,
            }
          : {
              displayName: "",
              isLoggedIn: false,
              isActive: false,
              isSendingRequest: false,
              isAdmin: false,
              isApproved: false,
              isSupervisor: false,
              isAwaitingApproval: false,
              isRejected: false,
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
      let additionalInfo = getAdditionalUserInfo(response);

      await updateProfile(user, {
        displayName: data.fullName,
      });

      newData.IdToken = await user.getIdToken();
      newData.provider = additionalInfo.providerId;

      await signUpAPI(newData).catch((error) => {
        deleteUser(user);
        throw new Error();
      });
      await sendEmailVerification(auth.currentUser);

      dispatch(setSnackbar("success", "SnackBar.confirmEmail"));

      setCurrentUser((currentUser) => {
        return {
          ...currentUser,
          displayName: data.fullName,
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
    await sendPasswordResetEmail(auth, email);
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

  async function logout(redirectCallback) {
    await signOut(auth);
    if (redirectCallback) redirectCallback();
  }

  async function deleteAccount(currentPassword) {
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await deleteUserAPI();
      await deleteUser(user);
      dispatch(setSnackbar("success", "Account deleted successfully"));
    } catch (error) {
      dispatch(setSnackbar("error", "Account couldnt be deleted"));
    }
  }

  async function reauthenticate(currentPassword) {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }

  async function updateDisplayName(displayName) {
    const user = auth.currentUser;

    await updateProfile(user, {
      displayName: displayName,
    });
    setCurrentUser((currentUser) => {
      return {
        ...currentUser,
        displayName: displayName,
      };
    });
  }

  async function requestAdmin() {
    await requestAdminAPI();
  }
  const value = {
    currentUser,
    login,
    signup,
    resetPassword,
    logout,
    deleteAccount,
    setUpdatedPassword,
    updateDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
