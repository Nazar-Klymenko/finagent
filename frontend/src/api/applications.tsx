import { axios } from "./axiosConfig";

export const archiveApplicationAPI = (id: string) => {
  return axios(`/user/application/${id}`, {
    method: "PUT",
  });
};

export const getApplicationsQuantityAPI = (category: string) => {
  return axios(`/user/application/count/${category}/quantity`, {
    method: "GET",
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
