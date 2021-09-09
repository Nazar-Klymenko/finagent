import { axios, noInterceptAxios } from "./axiosConfig";

export const logInAPI = (object) => {
  return noInterceptAxios(`/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(object),
  });
};
export const logOutAPI = () => {
  return noInterceptAxios(`/user/auth/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

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

export const currentUserAPI = () => {
  return axios(`/user`, {
    method: "GET",
  });
};

//////////APPLICATIONS/////////////
export const getInsurancesAPI = () => {
  return axios(`/user/application/show/Insurance`, {
    method: "GET",
  });
};
export const getLoansAPI = () => {
  return axios(`/user/application/show/Loan`, {
    method: "GET",
  });
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

/////////////// Email API ///////////////

export const activateEmailAPI = (token) => {
  return axios(`/user/auth/confirm/${token}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};
export const resendEmailAPI = () => {
  return axios(`/user/auth/resend/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

/////////////////// Settings API ////////////////////////
export const getSettingsAPI = () => {
  return axios(`/user/settings`, {
    method: "GET",
  });
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

export const changeEmailAPI = (object) => {
  return axios(`/user/settings/change_email`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const changePasswordAPI = (object) => {
  return axios(`/user/settings/change_password`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const requestChangePasswordAPI = (object) => {
  return axios(`/user/auth/restore/request`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const confirmChangePasswordAPI = (token, object) => {
  return axios(`/user/auth/restore/confirm/${token}`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteUserAPI = (object) => {
  return axios(`/user/settings/delete_user`, {
    method: "POST",
    data: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
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
export const testingFirebaseAPI = () => {
  return axios(`/user/testing_base`, {
    method: "GET",
  });
};
