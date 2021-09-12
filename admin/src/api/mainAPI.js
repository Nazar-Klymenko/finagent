import { axios } from "./axiosConfig";

export const allClientsAPI = () => {
  return axios(`/admin/clients`, {
    method: "GET",
  });
};

export const getSpecificClientAPI = (id) => {
  return axios(`/admin/clients/${id}`, {
    method: "GET",
  });
};

export const allAppsAPI = () => {
  return axios(`/admin/application/show/all`, {
    method: "GET",
  });
};
export const takenAppsAPI = () => {
  return axios(`/admin/application/show/taken`, {
    method: "GET",
  });
};
export const getArchivedAppsAPI = () => {
  return axios(`/admin/application/show/archived`, {
    method: "GET",
  });
};
export const getSpecificApplicationAPI = (id) => {
  return axios(`/admin/application/${id}`, {
    method: "GET",
  });
};
export const getApplicationsForUserAPI = (id) => {
  return axios(`/admin/application/user/${id}`, {
    method: "GET",
  });
};
export const myAppsAPI = () => {
  return axios(`/admin/application/show/my`, {
    method: "GET",
  });
};
export const assignAppAPI = (id) => {
  return axios(`admin/application/assign/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const returnAppAPI = (id) => {
  return axios(`admin/application/return/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const sendFeedbackAPI = (data, id) => {
  return axios(`/admin/application/feedback/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  });
};
export const sendStatusAPI = (data, id) => {
  return axios(`/admin/application/status/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  });
};

export const getHistoryAPI = (currentPage, cardsPerPage) => {
  return axios(`/admin/history?page=${currentPage}&size=${cardsPerPage}`, {
    method: "GET",
  });
};

export const getAllHistoryAPI = () => {
  return axios(`/admin/all-history`, {
    method: "GET",
  });
};

export const uploadDocumentsAPI = (object, id) => {
  return axios(`/admin/application/attach/${id}`, {
    method: "POST",
    data: object,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteSpecificDocumentAPI = (object, id) => {
  return axios(`/admin/delete/${id}`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
