// export const archiveApplicationAPI = (id: string) => {
//   return {
//     url: `/user/application/${id}`,
//     options: {
//       method: "PUT",
//     },
//   };
// };

//needs a filename specified at the end
//url: `user/application/files/${id}/${type}/FILENAME`,
export const getUserAttachmentsAPI = (id: string, type: string) => {
  return {
    url: `admin/application/files/${id}/${type}`,
    options: {
      method: "GET",
      responseType: "blob",
    },
  };
};
