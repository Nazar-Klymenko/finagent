import * as yup from "yup";

export const pageOneSchema = yup.object().shape({
  insuranceStart: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  insuranceEnd: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  peopleAmount: yup.string().when("insuranceType", {
    is: (value) => value !== "individual",
    then: yup.string().required("Form.Error.blank"),
  }),
  destination: yup.string().required("Form.Error.blank"),
  purpose: yup.string().required("Form.Error.blank"),
});

export const pageTwoSchema = yup.object().shape({
  name: yup.string().required("Form.Error.blank"),
  pesel: yup.string().when("policyholderIs", {
    is: (value) => value !== "legal",
    then: yup.string().required("Form.Error.blank"),
  }),

  nip: yup.string().when("policyholderIs", {
    is: (value) => value !== "natural",
    then: yup.string().required("Form.Error.blank"),
  }),
  regon: yup.string().when("policyholderIs", {
    is: (value) => value !== "natural",
    then: yup.string().required("Form.Error.blank"),
  }),

  birthDate: yup.date().when("policyholderIs", {
    is: (value) => value !== "entrepreneurial",
    then: yup
      .date()
      .required("Form.Error.missingDate")
      .nullable()
      .typeError("Form.Error.invalidDate"),
  }),
  phone: yup.string().required("Form.Error.blank"),
  email: yup.string().required("Form.Error.blank"),
  country: yup.string().required("Form.Error.blank"),
  city: yup.string().required("Form.Error.blank"),
  postIndex: yup.string().required("Form.Error.blank"),
  street: yup.string().required("Form.Error.blank"),
  houseNumber: yup.string().required("Form.Error.blank"),
});
