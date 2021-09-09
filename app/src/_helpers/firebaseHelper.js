import firebase from "@services/firebase";

const auth = firebase.auth();
const storage = firebase.storage();

const getAuthenticationStatus = () => {
  return localStorage.getItem("isAuthenticated");
};

export { auth, storage, getAuthenticationStatus };
