import { axios, noInterceptAxios } from "./axiosConfig";

export const archiveApplicationAPI = (id) => {
  return axios(`/application/${id}/archive`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const getArchivedApplicationsAPI = (id) => {
  return axios(`/application/all/preview/archive`, {
    method: "GET",
  });
};
export const autofillApplicationAPI = () => {
  return axios(`/application/autofill/test`, {
    method: "GET",
  });
};
