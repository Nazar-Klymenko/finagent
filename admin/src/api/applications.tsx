import { axios } from "./axiosConfig";

export const assignAplicationAPI = (id: string) => {
  return axios(`admin/applications/assign/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const setStatusAPI = (data: string, id: string) => {
  return axios(`admin/applications/status/${id}`, {
    method: "PUT",
    data: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const archiveApplicationAPI = (id: string) => {
  return axios(`/admin/applications/archive/${id}`, {
    method: "PUT",
  });
};
export const returnApplicationAPI = (id: string) => {
  return axios(`/admin/applications/return/${id}`, {
    method: "PUT",
  });
};

export const getApplicationsQuantityAPI = (category: string) => {
  return axios(`/user/application/count/${category}/quantity`, {
    method: "GET",
  });
};
export const submitTicket = (data: {
  fullName: string;
  email: string;
  message: string;
}) => {
  return axios(`/user/application/submit/ticket`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
};

//needs a filename specified at the end
//url: `user/application/files/${id}/${type}/FILENAME`,
export const getUserAttachmentsAPI = (id: string, type: string) => {
  return {
    url: `user/application/files/${id}/${type}`,
    options: {
      method: "GET",
      responseType: "blob",
    },
  };
};

export const postApplication = (applicationType: string, data: any) => {
  return axios(`/user/submit/${applicationType}`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
};
