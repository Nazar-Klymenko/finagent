export const archiveApplicationAPI = (id: string) => {
  return {
    url: `/user/application/${id}`,
    options: {
      method: "PUT",
    },
  };
};

export const getApplicationsQuantityAPI = (category: string) => {
  return {
    url: `/user/application/count/${category}/quantity`,
    options: {
      method: "GET",
    },
  };
};

//needs a filename specified at the end
//url: `user/application/files/${id}/${type}/FILENAME`,
export const getUserAttachmentsAPI = (id: string, type: string) => {
  return {
    url: `user/application/files/${id}/${type}`,
    options: {
      method: "GET",
      responseType: "arraybuffer",
    },
  };
};
