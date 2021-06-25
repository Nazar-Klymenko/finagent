import axios from "axios";
import { auth } from "@helpers/authHelper";
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

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;
//     if (!error.response) {
//       return Promise.reject(error);
//     }
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       return noInterceptAxios(`/user/auth/refresh_token`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//       })
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem("accessToken", res.data.accessToken);
//             console.log("Access token refreshed!");
//             return axios(originalRequest);
//           }
//         })
//         .catch((error) => {
//           noInterceptAxios(`/user/auth/logout`, {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json",
//             },
//           });
//           localStorage.removeItem("accessToken");
//           window.location.href = `/auth/login`;
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export { axios, noInterceptAxios };
