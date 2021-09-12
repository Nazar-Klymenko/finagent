import { axios } from "./axiosConfig";

export const archiveApplicationAPI = (id) => {
  return axios(`/user/application/${id}`, {
    method: "PUT",
  });
};

export const getApplicationsQuantityAPI = (category) => {
  return axios(`/user/application/count/${category}/quantity`, {
    method: "GET",
  });
};
