import * as yup from "yup";
export const settingsSchema = () => {
  return yup.object().shape({
    name: yup.string().required("This field can't be blank"),
    surname: yup.string().required("This field can't be blank"),
    phone: yup.string().required("This field can't be blank"),
  });
};

export const changePasswordSchema = () => {
  return yup.object().shape({
    currentPassword: yup
      .string()
      .required("This field can't be blank")
      .min(8, "The password has to be at lest 8 symbols"),
    newPassword: yup
      .string()
      .required("This field can't be blank")
      .min(8, "The password has to be at lest 8 symbols"),
  });
};

export const changeEmailSchema = () => {
  return yup.object().shape({
    currentPassword: yup
      .string()
      .required("This field can't be blank")
      .min(8, "The password has to be at lest 8 symbols"),
    email: yup
      .string()
      .email("Email should have correct format")
      .required("This field can't be blank"),
  });
};

export const dangerZoneSchema = () => {
  return yup.object().shape({
    password: yup.string().min(8, "The password has to be at lest 8 symbols"),
  });
};
