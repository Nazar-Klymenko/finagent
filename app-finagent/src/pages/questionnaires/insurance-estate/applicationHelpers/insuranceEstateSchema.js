import * as yup from "yup";

export const pageOneSchema = yup.object().shape({
  country: yup.string().required("Form.Error.blank"),
  city: yup.string().required("Form.Error.blank"),
  postIndex: yup.string().required("Form.Error.blank"),
  street: yup.string().required("Form.Error.blank"),
  houseNumber: yup.string().required("Form.Error.blank"),
  areaM2: yup.string().required("Form.Error.blank"),
  constructionYear: yup.string().required("Form.Error.blank"),
  bankName: yup.string().when("creditOwnership", {
    is: "yes",
    then: yup.string().required("Form.Error.blank"),
  }),
  regon: yup.string().when("creditOwnership", {
    is: "yes",
    then: yup.string().required("Form.Error.blank"),
  }),
  nip: yup.string().when("creditOwnership", {
    is: "yes",
    then: yup.string().required("Form.Error.blank"),
  }),
  security: yup.string().required("Form.Error.blank"),
  insuranceStart: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  flatAndFixed: yup.string().required("Form.Error.blank"),
  householdGoods: yup.string().required("Form.Error.blank"),
});

export const pageTwoSchema = yup.object().shape({
  name: yup.string().when("policyholderIs", {
    is: (value) => value !== "legal",
    then: yup.string().required("Form.Error.blank"),
  }),
  surname: yup.string().when("policyholderIs", {
    is: (value) => value !== "legal",
    then: yup.string().required("Form.Error.blank"),
  }),
  pesel: yup.string().when("policyholderIs", {
    is: (value) => value !== "legal",
    then: yup.string().required("Form.Error.blank"),
  }),
  firmName: yup.string().when("policyholderIs", {
    is: (value) => value !== "individual",
    then: yup.string().required("Form.Error.blank"),
  }),
  nip: yup.string().when("policyholderIs", {
    is: (value) => value !== "individual",
    then: yup.string().required("Form.Error.blank"),
  }),
  regon: yup.string().when("policyholderIs", {
    is: (value) => value !== "individual",
    then: yup.string().required("Form.Error.blank"),
  }),

  phone: yup.string().required("Form.Error.blank"),
  email: yup.string().required("Form.Error.blank"),
});
