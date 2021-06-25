import { axios, noInterceptAxios } from "./axiosConfig";

export const signUpAPI = (object) => {
  return noInterceptAxios(`/admin/auth/signup`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const fetchUserAPI = () => {
  return axios(`/admin/auth/current`, {
    method: "GET",
  });
};
