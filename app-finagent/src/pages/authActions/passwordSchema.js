import * as yup from "yup";

export const forgotPasswordSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Email should have correct format")
      .required("E-mail can't be blank")
      .trim(),
  });
};

export const newPasswordSchema = () => {
  return yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "password can't be shorter than 8 characters"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
};
