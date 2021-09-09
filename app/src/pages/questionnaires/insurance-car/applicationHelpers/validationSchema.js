import * as yup from "yup";

export const pageOneSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
    .required("Form.Error.blank"),
  surname: yup
    .string()
    .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
    .required("Form.Error.blank"),
  phoneNumber: yup.string().required("Form.Error.blank"),
  postIndex: yup.string().required("Form.Error.blank"),
  city: yup.string().required("Form.Error.blank"),
  voivodeship: yup.string().required("Form.Error.blank"),
  street: yup.string().required("Form.Error.blank"),
  houseNumber: yup.string().required("Form.Error.blank"),
  documentAddedType: yup.string(),
  documentAdded: yup.string().required("Form.Error.blank"),
  isAppropLicence: yup.boolean(),
  drivingLicenceDate: yup.date().when("isAppropLicence", {
    is: true,
    then: yup
      .date()
      .required("Form.Error.missingDate")
      .nullable()
      .typeError("Form.Error.invalidDate"),
  }),
  profession: yup.string().required("Form.Error.blank"),
  maritalStatus: yup.string().required("Form.Error.blank"),
});

export const pageTwoSchema = yup.object().shape({
  vehicleType: yup.string().required("Form.Error.blank"),
  registeredPoland: yup.boolean(),
  brand: yup.string().required("Form.Error.blank"),
  model: yup.string().required("Form.Error.blank"),
  version: yup.string(),
  regNumber: yup.string().required("Form.Error.blank"),
  vinNumber: yup.string().required("Form.Error.blank"),
  yearManufacture: yup.string().required("Form.Error.blank"),
});

export const pageThreeSchema = yup.object().shape({
  enginePower: yup.string().required("Form.Error.blank"),
  engineVolume: yup.string().required("Form.Error.blank"),
  fuelType: yup.string().required("Form.Error.blank").nullable(),
  abroadImport: yup.boolean(),
  purchaseYear: yup.string().required("Form.Error.blank"),
  kilometrage: yup.string().required("Form.Error.blank"),
  techExamDate: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  vehicleRegDate: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  polandRegDate: yup.date().when("abroadImport", {
    is: true,
    then: yup
      .date()
      .required("Form.Error.missingDate")
      .nullable()
      .typeError("Form.Error.invalidDate"),
  }),
});

export const pageFourSchema = yup.object().shape({
  predictMileage: yup.string().required("Form.Error.blank"),
  useAbroad: yup.string().required("Form.Error.blank"),
  usePurpose: yup.string().required("Form.Error.blank"),
  parkingPlace: yup.string().required("Form.Error.blank"),
  security: yup.string().required("Form.Error.blank"),
});

export const pageFiveSchema = yup.object().shape({
  files: yup.mixed().notRequired(),
});
