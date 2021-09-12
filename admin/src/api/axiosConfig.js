import axios from "axios";
import { auth } from "@helpers/firebaseHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_URL;
axios.defaults.timeout = 8000;

const noInterceptAxios = axios.create();
noInterceptAxios.defaults.withCredentials = true;
noInterceptAxios.defaults.baseURL = process.env.REACT_APP_API_SERVER_URL;
noInterceptAxios.defaults.timeout = 8000;

axios.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axios, noInterceptAxios };
