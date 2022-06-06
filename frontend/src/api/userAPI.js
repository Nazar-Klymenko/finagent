import { axios, noInterceptAxios } from "./axiosConfig";

export const signUpAPI = (object) => {
  return noInterceptAxios(`/user/auth/signup`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const signUpFacebookAPI = (object) => {
  return noInterceptAxios(`/user/auth/signup_facebook`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const getSpecificApplication = (id) => {
  return axios(`/user/application/${id}`, {
    method: "GET",
  });
};

/////////////////// Settings API ////////////////////////
export const getSettingsAPI = () => {
  return axios("/user/settings", { method: "GET" });
};

export const updateSettingsAPI = (object) => {
  return axios(`/user/settings`, {
    method: "PUT",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteUserAPI = () => {
  return axios(`/user/settings`, {
    method: "DELETE",
  });
};

/////////////////// Notifications ///////////////////
export const getNotificationsAPI = () => {
  return axios(`/user/notifications`, {
    method: "GET",
  });
};

export const getNewNotifications = () => {
  return axios(`/user/notifications/new`, {
    method: "GET",
  });
};

export const getSpecificNotificationAPI = (id) => {
  return axios(`/user/notifications/${id}`, {
    method: "GET",
  });
};
