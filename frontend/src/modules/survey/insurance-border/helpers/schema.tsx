import * as yup from "yup";

export const pageOneSchema = yup.object().shape({
  pesel: yup.string().when("documentType", {
    is: (value: string) => value !== "passportNumber",
    then: yup.string().required("Form.Error.blank"),
  }),
  passportNumber: yup.string().when("documentType", {
    is: "passportNumber",
    then: yup.string().required("Form.Error.blank"),
  }),
  insurancePeriod: yup.string().required("Form.Error.blank"),
});

export const pageTwoSchema = yup.object().shape({
  vehicleType: yup.string().required("Form.Error.blank"),
  brand: yup.string().required("Form.Error.blank"),
  model: yup.string().required("Form.Error.blank"),
  regNumber: yup.string().required("Form.Error.blank"),
  vinNumber: yup.string().required("Form.Error.blank"),
  engineNumber: yup.string().required("Form.Error.blank"),
  engineVolume: yup.string().required("Form.Error.blank"),
  seatNumber: yup.string().required("Form.Error.blank"),
});

export const pageThreeSchema = yup.object().shape({
  name: yup.string().required("Form.Error.blank"),
  phoneNumber: yup.string().required("Form.Error.blank"),
  email: yup.string().required("Form.Error.blank"),
  country: yup.string().required("Form.Error.blank"),
  city: yup.string().required("Form.Error.blank"),
  postIndex: yup.string().required("Form.Error.blank"),
  street: yup.string().required("Form.Error.blank"),
  houseNumber: yup.string().required("Form.Error.blank"),
});
