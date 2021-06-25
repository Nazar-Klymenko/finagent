import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail can't be blank")
    .matches(/\S+@\S+\.\S+/, "Incorrect mail format")
    .trim(),
  password: yup.string().required("Password can't be blank"),
});

export default loginSchema;
