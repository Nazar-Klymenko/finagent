import { axios, noInterceptAxios } from "./axiosConfig";

export const signUpAPI = (object) => {
  return noInterceptAxios(`/user/auth/signup`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const signUpFacebookAPI = (object) => {
  return noInterceptAxios(`/user/auth/signup_facebook`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

//////////APPLICATIONS/////////////
export const getApplicationsAPI = (page, cat, status, count) => {
  return axios(
    `/user/application/show/${cat}/${status}?page=${page}&count=${count}`,
    {
      method: "GET",
    }
  );
};

export const getSpecificApplication = (id) => {
  return axios(`/user/application/${id}`, {
    method: "GET",
  });
};

export const postInsuranceOcAPI = (object) => {
  return axios(`/user/application/submit/insurance_car_oc`, {
    method: "POST",
    data: object,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const postInsuranceBorderAPI = (object) => {
  return axios(`/user/application/submit/insurance_border`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postInsuranceMedicalAPI = (object) => {
  return axios(`/user/application/submit/insurance_health_medical`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postInsuranceSpecialistAPI = (object) => {
  return axios(`/user/application/submit/insurance_health_specialist`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postInsuranceTravelAPI = (object) => {
  return axios(`/user/application/submit/insurance_travel`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postInsuranceEstateAPI = (object) => {
  return axios(`/user/application/submit/insurance_estate`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postLoanCashAPI = (object) => {
  return axios(`/user/application/submit/loan_cash`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};
export const postLoanMortgageAPI = (object) => {
  return axios(`/user/application/submit/loan_mortgage`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: { "Content-type": "application/json" },
  });
};

/////////////////// Settings API ////////////////////////
export const getSettingsAPI = () => {
  return {
    url: "/user/settings",
    options: { method: "GET" },
  };
};

export const updateSettingsAPI = (object) => {
  return axios(`/user/settings/update`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteUserAPI = () => {
  return axios(`/user/settings/delete_user`, {
    method: "DELETE",
  });
};

export const getNotificationsAPI = () => {
  return axios(`/user/notifications`, {
    method: "GET",
  });
};

export const getNewNotifications = () => {
  return axios(`/user/notifications/new`, {
    method: "GET",
  });
};

export const getSpecificNotificationAPI = (id) => {
  return axios(`/user/notifications/${id}`, {
    method: "GET",
  });
};
