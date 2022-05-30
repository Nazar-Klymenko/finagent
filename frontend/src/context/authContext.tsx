import { createContext, useContext, useEffect, useState } from "react";

import { FirebaseError } from "@firebase/util";
import { AdditionalUserInfo, AuthError, User } from "firebase/auth";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  getRedirectResult,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithRedirect,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@services/firebase";

import { deleteUserAPI, signUpAPI, signUpFacebookAPI } from "@api/userAPI";

import { useSnackbar } from "@context/snackbarContext";

type Props = {
  children: React.ReactElement;
};
type UserState = {
  displayName: string;
  isLoggedIn: boolean;
  isActive: boolean;
  isSendingRequest: boolean;
  photoURL: string;
  provider: string;
};
type SignUpData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  language: string;
  terms: boolean;
  IdToken?: string;
  provider?: string | null;
};

type AuthContextTypes = {
  currentUser: UserState;
  signup: (data: SignUpData) => void;
  login: (email: string, password: string) => void;
  loginFacebook: () => void;
  logout: () => void;
  deleteAccount: (password: string) => void;
  deleteAccountFacebook: () => void;
  resetPassword: (email: string) => void;
  setUpdatedPassword: (currentPassword: string, newPassword: string) => void;
  updateDisplayName: (displayName: string) => void;
  resendVerificationEmail: () => void;
};

const defaultState = {
  displayName: "",
  isLoggedIn: false,
  isActive: false,
  isSendingRequest: true,
  photoURL: "",
  provider: "",
} as UserState;

export const AuthContextProvider = ({ children }: Props) => {
  const { setSnackbar } = useSnackbar();

  const [currentUser, setCurrentUser] = useState(defaultState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // facebook sign up on the backend
      async function signupFacebook(
        additionalInfo: AdditionalUserInfo,
        user: User
      ) {
        try {
          await signUpFacebookAPI({ additionalInfo, uid: user.uid }).catch(
            (error) => {
              deleteUser(user);
              localStorage.setItem("onSignIn", "false");
              throw new Error();
            }
          );
          setSnackbar({
            severity: "success",
            message: "SnackBar.successfulLogginIn",
          });
        } catch (error) {
          setSnackbar({
            severity: "error",
            message: "SnackBar.loginError",
          });
        }
      }

      let emailVerified = false;
      let photoURL = "";
      if (user) {
        localStorage.setItem("onSignIn", "false");

        user.getIdToken(true);
        if (user.providerData[0]?.providerId === "facebook.com") {
          emailVerified = true;
          photoURL = user.photoURL || "";
        } else {
          emailVerified = user.emailVerified;
        }
      }
      const redirectResult = await getRedirectResult(auth);
      if (redirectResult) {
        const additionalInfo = getAdditionalUserInfo(redirectResult);
        if (additionalInfo && additionalInfo.isNewUser) {
          const _user = auth.currentUser;
          if (_user) {
            signupFacebook(additionalInfo, _user);
          }
        }
      }

      if (user) {
        setCurrentUser({
          displayName: user.displayName!,
          isLoggedIn: true,
          isActive: emailVerified,
          isSendingRequest: false,
          photoURL: photoURL,
          provider: user.providerData[0]?.providerId,
        });
      } else {
        setCurrentUser({
          ...defaultState,
          isSendingRequest: false,
        });
      }

      localStorage.setItem("onSignIn", "false");
    });

    return () => {
      unsubscribe();
    };
  }, [setSnackbar]);

  async function signup(data: SignUpData) {
    let newData = data;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = auth.currentUser;
      let additionalInfo = getAdditionalUserInfo(response);

      await updateProfile(user!, {
        displayName: data.fullName,
      });

      newData.IdToken = await user!.getIdToken();
      newData.provider = additionalInfo!.providerId;

      await signUpAPI(newData).catch(async (error) => {
        await deleteUser(user!);
        throw new Error();
      });
      await sendEmailVerification(auth.currentUser!);

      setSnackbar({
        severity: "success",
        message: "SnackBar.confirmEmail",
      });
      setCurrentUser((currentUser) => {
        return {
          ...currentUser,
          displayName: data.fullName,
        };
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/too-many-requests": {
            return setSnackbar({
              severity: "error",
              message: "too many attempts, try later",
            });
          }
          case "auth/account-exists-with-different-credential": {
            return setSnackbar({
              severity: "error",
              message: "account exists with different credential",
            });
          }
          case "auth/wrong-password": {
            return setSnackbar({
              severity: "error",
              message: "SnackBar.incorrectData",
            });
          }
          case "auth/email-already-in-use": {
            return setSnackbar({
              severity: "error",
              message: "SnackBar.userExists",
            });
          }
          default: {
            return setSnackbar({
              severity: "error",
              message: "SnackBar.signUpFail",
            });
          }
        }
      } else {
        setSnackbar({
          severity: "error",
          message: "SnackBar.signUpFail",
        });
      }
    }
  }

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSnackbar({
        severity: "success",
        message: "SnackBar.successfulLogginIn",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found": {
            setSnackbar({
              severity: "error",
              message: "SnackBar.incorrectEmailOrPassword",
            });
          }
          default: {
            setSnackbar({
              severity: "error",
              message: "SnackBar.loginError",
            });
          }
        }
      } else {
        setSnackbar({
          severity: "error",
          message: "SnackBar.loginError",
        });
      }
    }
  }

  async function loginFacebook() {
    localStorage.setItem("onSignIn", "true");
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ auth_type: "rerequest" });
    try {
      await signInWithRedirect(auth, provider);
      setSnackbar({
        severity: "success",
        message: "SnackBar.successfulLogginIn",
      });
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "SnackBar.loginError",
      });
      localStorage.setItem("onSignIn", "false");
    }
  }

  async function resendVerificationEmail() {
    try {
      await sendEmailVerification(auth.currentUser!);
      setSnackbar({
        severity: "success",
        message: "SnackBar.emailWasResent",
      });
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "SnackBar.errorResendingEmail",
      });
    }
  }
  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbar({ severity: "info", message: "Snackbar.confirm" });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found": {
            setSnackbar({
              severity: "error",
              message: "SnackBar.userNotFound",
            });
          }
          default: {
            setSnackbar({
              severity: "error",
              message: "SnackBar.error",
            });
          }
        }
      } else {
        setSnackbar({
          severity: "error",
          message: "SnackBar.error",
        });
      }
      return false;
    }
  }
  async function setUpdatedPassword(
    currentPassword: string,
    newPassword: string
  ) {
    await reauthenticate(currentPassword).catch((error) => {
      setSnackbar({
        severity: "error",
        message: "Settings.ChangePassword.errorInvalidPassword",
      });
    });
    await updatePassword(auth.currentUser!, newPassword);
    setSnackbar({
      severity: "success",
      message: "Settings.ChangePassword.alertSuccess",
    });
  }

  async function logout() {
    await signOut(auth);
  }

  async function deleteAccount(currentPassword: string) {
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await deleteUserAPI();
      await deleteUser(user!);
      // setSnackbar("success", "Account deleted successfully");
    } catch (error) {
      // setSnackbar("error", "Account couldnt be deleted");
    }
  }
  async function deleteAccountFacebook() {
    try {
      if (auth.currentUser!.providerData[0]?.providerId === "facebook.com") {
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({ auth_type: "rerequest" });
        const user = auth.currentUser;
        await reauthenticateWithRedirect(user!, provider);

        await deleteUserAPI();
        await deleteUser(user!);
      }
      setSnackbar({
        severity: "success",
        message: "Account deleted successfully",
      });
    } catch (error) {
      // setSnackbar("error", "ERROR");
    }
  }
  async function reauthenticate(currentPassword: string) {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user?.email!, currentPassword);
    return reauthenticateWithCredential(user!, cred);
  }

  async function updateDisplayName(displayName: string) {
    const user = auth.currentUser;

    await updateProfile(user!, {
      displayName: displayName,
    });
    setCurrentUser((currentUser) => {
      return {
        ...currentUser,
        displayName: displayName,
      };
    });
  }

  const value = {
    currentUser,
    signup,
    resetPassword,
    login,
    loginFacebook,
    logout,
    resendVerificationEmail,
    deleteAccount,
    deleteAccountFacebook,
    setUpdatedPassword,
    updateDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const AuthContext = createContext<AuthContextTypes>({
  currentUser: {
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    photoURL: "",
    provider: "",
  },
  signup: (data: SignUpData) => Promise,
  login: (email: string, password: string) => Promise,
  loginFacebook: () => Promise,
  logout: () => Promise,
  deleteAccount: (password: string) => Promise,
  deleteAccountFacebook: () => Promise,
  resetPassword: (email: string) => Promise,
  setUpdatedPassword: (currentPassword: string, newPassword: string) => Promise,
  updateDisplayName: (displayName: string) => Promise,
  resendVerificationEmail: () => Promise,
});

export const useAuth = () => useContext(AuthContext);
