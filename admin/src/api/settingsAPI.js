import { axios } from "./axiosConfig";

export const getSettingsAPI = () => {
  return axios(`/admin/settings`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
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

export const changeEmailRequestAPI = () => {
  return axios(`/admin/settings/change_email`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const changeEmailAPI = (token, object) => {
  return axios(`/admin/settings/change_email/${token}`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const changePasswordAPI = (object) => {
  return axios(`/admin/settings/change_password`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};
