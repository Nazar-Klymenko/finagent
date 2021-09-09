import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please check your email")
    .required("E-mail can't be blank")
    .trim(),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Minimum 8 symbols"),
});

export default loginSchema;
