import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@services/firebase";
import { setSnackbar } from "@redux/alert/actions";
import { useDispatch } from "react-redux";
import { deleteUserAPI } from "@api/userAPI";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  onAuthStateChanged,
  FacebookAuthProvider,
  signOut,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
  signInWithRedirect,
  deleteUser,
  updatePassword,
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
    provider: "",
  },
  signup: () => Promise,
  login: (email, password) => Promise,
  loginFacebook: () => Promise,
  logout: (redirectCallback) => Promise,
  forgotPassword: () => Promise,
  deleteAccount: () => Promise,
  deleteAccountFacebook: () => Promise,
  resetPassword: (email) => Promise,
  setUpdatedPassword: (currentPassword, newPassword) => Promise,
  updateEmail: () => Promise,
  updateDisplayName: (displayName) => Promise,
  updatePassword: () => Promise,
  resendVerificationEmail: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    isLoggedIn: false,
    isActive: false,
    isSendingRequest: true,
    photoURL: "",
    provider: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      let emailVerified;
      let photoURL = "";
      if (user) {
        localStorage.setItem("onSignIn", "false");

        user.getIdToken(true);
        if (user.providerData[0]?.providerId === "facebook.com") {
          emailVerified = true;
          photoURL = user.photoURL;
        } else emailVerified = user.emailVerified;
      }
      alert(user.displayName);
      console.log(user);

      setCurrentUser(
        user
          ? {
              displayName: user.displayName,
              isLoggedIn: true,
              isActive: emailVerified,
              isSendingRequest: false,
              photoURL: photoURL,
              provider: user.providerData[0]?.providerId,
            }
          : {
              displayName: "",
              isLoggedIn: false,
              isActive: false,
              isSendingRequest: false,
              photoURL: "",
              provider: "",
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

  async function loginFacebook() {
    localStorage.setItem("onSignIn", "true");
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ auth_type: "rerequest" });
    try {
      const response = await signInWithRedirect(auth, provider);
      const additionalInfo = getAdditionalUserInfo(response);

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
      localStorage.setItem("onSignIn", "false");
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

  async function updateEmail(email) {
    await auth.currentUser?.updateEmail(email);
  }

  async function logout(redirectCallback) {
    await signOut(auth);
    redirectCallback();
  }

  async function deleteAccount(currentPassword) {
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await deleteUserAPI();
      await deleteUser(user);
      dispatch(setSnackbar("success", "Account deleted successfully"));
    } catch (error) {
      console.log({ error });
      dispatch(setSnackbar("error", "Account couldnt be deleted"));
    }
  }
  async function deleteAccountFacebook() {
    try {
      if (auth.currentUser.providerData[0]?.providerId === "facebook.com") {
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({ auth_type: "rerequest" });
        const user = auth.currentUser;
        const response = await reauthenticateWithPopup(user, provider);

        await deleteUserAPI();
        await deleteUser(user);
      }
      dispatch(setSnackbar("success", "Account deleted successfully"));
    } catch (error) {
      dispatch(setSnackbar("error", "ERROR"));
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

  const value = {
    currentUser,
    signup,
    resetPassword,
    updateEmail,
    login,
    loginFacebook,
    logout,
    resendVerificationEmail,
    deleteAccount,
    deleteAccountFacebook,
    updatePassword,
    setUpdatedPassword,
    updateDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useEffect(() => {
//   auth
//     .getRedirectResult()
//     .then(function(result) {
//       console.log(result);
//       if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         setToken(token);
//         // ...
//       }
//       // The signed-in user info.
//       var user = result.user;
//       console.log(user);
//       setData(user);
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       console.log(errorCode, errorMessage);
//       // ...
//     });
// }, []);
