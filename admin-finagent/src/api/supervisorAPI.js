import { axios } from "./axiosConfig";

export const getAllOperatorsAPI = (id) => {
  return axios(`/admin/all_operators/`, {
    method: "GET",
  });
};
export const getAwaitingOperatorsAPI = (id) => {
  return axios(`/admin/all_operators/awaiting`, {
    method: "GET",
  });
};
export const acceptOperatorAPI = (id) => {
  return axios(`/admin/all_operators/accept/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const declineOperatorAPI = (id) => {
  return axios(`/admin/all_operators/decline/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const returnApplicationToMainPoolAPI = (id) => {
  return axios(`admin/application/return_pool/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
