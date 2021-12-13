import { axios } from "./axiosConfig";

export const getClients = (page: string, size: string) => {
  return axios(`/admin/clients/show?page=${page}&size=${size}`, {
    method: "GET",
  });
};
export const getTickets = (page: number, size: number) => {
  return axios(`/admin/tickets?page=${page}&size=${size}`, {
    method: "GET",
  });
};
export const deleteTicket = (id: number) => {
  return axios(`/admin/tickets/${id}`, {
    method: "DELETE",
  });
};

export const getSpecificClientAPI = (id: string) => {
  return axios(`/admin/clients/${id}`, {
    method: "GET",
  });
};

export const getApplications = (
  status: "taken" | "all",
  page: string,
  size: string
) => {
  return axios(`/admin/application/show/${status}?page=${page}&size=${size}`, {
    method: "GET",
  });
};

export const getSpecificApplicationAPI = (id: string) => {
  return axios(`/admin/application/${id}`, {
    method: "GET",
  });
};
export const getApplicationsForUserAPI = (id: string) => {
  return axios(`/admin/application/user/${id}`, {
    method: "GET",
  });
};

export const assignAppAPI = (id: string) => {
  return axios(`admin/application/assign/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const returnAppAPI = (id: string) => {
  return axios(`admin/application/return/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const sendFeedbackAPI = (data: any, id: string) => {
  return axios(`/admin/application/feedback/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  });
};
export const sendStatusAPI = (data: any, id: string) => {
  return axios(`/admin/application/status/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  });
};

export const getHistory = (
  status: "my-history" | "all",
  currentPage: string,
  cardsPerPage: string
) => {
  return axios(
    `/admin/history/${status}?page=${currentPage}&size=${cardsPerPage}`,
    {
      method: "GET",
    }
  );
};

export const uploadDocumentsAPI = (object: any, id: string) => {
  return axios(`/admin/application/attach/${id}`, {
    method: "POST",
    data: object,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteSpecificDocumentAPI = (object: any, id: string) => {
  return axios(`/admin/delete/${id}`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};

export const getUserAttachmentsAPI = (id: string, type: string) => {
  return {
    url: `admin/application/files/${id}/${type}`,
    options: {
      method: "GET",
      responseType: "blob",
    },
  };
};
