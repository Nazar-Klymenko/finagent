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
