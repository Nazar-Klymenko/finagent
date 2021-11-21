import * as yup from "yup";

export const settingsSchema = () => {
  return yup.object().shape({
    fullName: yup.string().required("Form.Error.blank"),
    phone: yup.string(),
  });
};

export const changePasswordSchema = () => {
  return yup.object().shape({
    currentPassword: yup
      .string()
      .required("Form.Error.blank")
      .min(8, "The password has to be at lest 8 symbols"),
    newPassword: yup
      .string()
      .required("Form.Error.blank")
      .min(8, "The password has to be at lest 8 symbols"),
  });
};

export const dangerZoneSchema = () => {
  return yup.object().shape({
    password: yup.string().min(8, "The password has to be at lest 8 symbols"),
  });
};
