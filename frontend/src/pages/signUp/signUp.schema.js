import * as yup from "yup";

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("E-mail can't be blank")
    .trim(),
  password: yup
    .string()
    .required("Form.Error.blank")
    .min(8, "The password has to be at lest 8 symbols"),
  name: yup.string().required("Name can't be blank").trim(),
  surname: yup.string().required("Surname can't be blank").trim(),
  phone: yup.string().required("Phone can't be blank").trim(),
  terms: yup
    .boolean()
    .oneOf([true], "Please read and accept the Terms and Conditions"),
});

export default signUpSchema;
