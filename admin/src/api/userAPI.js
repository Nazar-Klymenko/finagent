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
export const getUserApi = () => {
  return axios(`/admin/auth/user`, {
    method: "GET",
  });
};

//////////APPLICATIONS/////////////
export const getApplicationsAPI = (page, cat, status, count) => {
  return axios(
    `/admin/application/show/${cat}/${status}?page=${page}&count=${count}`,
    {
      method: "GET",
    }
  );
};

export const getSpecificApplication = (id) => {
  return axios(`/admin/application/${id}`, {
    method: "GET",
  });
};

/////////////////// Settings API ////////////////////////
export const getSettingsAPI = () => {
  return axios("/admin/settings", { method: "GET" });
};

export const updateSettingsAPI = (object) => {
  return axios(`/admin/settings/update`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteadminAPI = () => {
  return axios(`/admin/settings/delete_admin`, {
    method: "DELETE",
  });
};

export const getNotificationsAPI = () => {
  return axios(`/admin/notifications`, {
    method: "GET",
  });
};

export const getNewNotifications = () => {
  return axios(`/admin/notifications/new`, {
    method: "GET",
  });
};

export const getSpecificNotificationAPI = (id) => {
  return axios(`/admin/notifications/${id}`, {
    method: "GET",
  });
};
