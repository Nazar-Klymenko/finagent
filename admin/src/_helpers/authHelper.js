import firebase from "@services/firebase";

const auth = firebase.auth();

const getAuthenticationStatus = () => {
  return localStorage.getItem("isAuthenticated");
};

export { auth, getAuthenticationStatus };
