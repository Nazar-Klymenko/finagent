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

export const getUserAttachmentsAPI = (id, type, filename) => {
  return (
    `user/application/files/${id}/${type}/${filename}`,
    {
      method: "GET",
      responseType: "arraybuffer",
    }
  );
};
