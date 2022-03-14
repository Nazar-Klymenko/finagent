import * as yup from "yup";

export const pageOneSchema = yup
  .object()
  .shape({
    oc: yup.boolean(),
    ac: yup.boolean(),
    greenCard: yup.boolean(),
    assistance: yup.boolean(),
    name: yup
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
    drivingLicenceDate: yup
      .date()
      .nullable()
      .when("isAppropLicence", {
        is: true,
        then: yup
          .date()
          .required("Form.Error.missingDate")
          .nullable()
          .typeError("Form.Error.invalidDate"),
      }),
    profession: yup.string().nullable().required("Form.Error.blank"),
    maritalStatus: yup.string().required("Form.Error.blank"),
  })
  .test("atleastOneCheckbox", "", checkCheckboxes);

function checkCheckboxes(obj: any) {
  if (obj.ac || obj.oc || obj.greenCard || obj.assistance) {
    return true;
  }

  return new yup.ValidationError("Form.Error.minimumOne", null, "assistance");
}

export const pageTwoSchema = yup.object().shape({
  registeredPoland: yup.boolean(),
  brand: yup.string().nullable().required("Form.Error.blank"),
  model: yup.string().required("Form.Error.blank"),
  version: yup.string(),
  regNumber: yup.string().required("Form.Error.blank"),
  vinNumber: yup.string().required("Form.Error.blank"),
  yearManufacture: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
});

export const pageThreeSchema = yup.object().shape({
  vehicleType: yup.string().required("Form.Error.blank"),
  enginePower: yup.string().required("Form.Error.blank"),
  engineVolume: yup.string().required("Form.Error.blank"),
  fuelType: yup.string().required("Form.Error.blank").nullable(),
  abroadImport: yup.boolean(),
  purchaseYear: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
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
  polandRegDate: yup
    .date()
    .nullable()
    .when("abroadImport", {
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
  filesTechPassport: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1, "minimalnie 1 plik")
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
  filesPassport: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1, "minimalnie 1 plik")
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
  filesCarSale: yup.array().when("isFirstOwner", {
    is: false,
    then: yup
      .array()
      .nullable()
      .required("Form.Error.blank")
      .min(1, "minimalnie 1 plik")
      .max(5, "maksymalnie 5 plików")
      .test(
        "is-big-file",
        "maksymalny rozmiar pliku to 5MB",
        checkIfFilesAreTooBig
      )
      .test(
        "is-correct-file",
        "nieodpowiedni typ plików",
        checkIfFilesAreCorrectType
      ),
  }),
  filesInsurance: yup
    .array()
    .nullable()
    .notRequired()
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
});
function checkIfFilesAreTooBig(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
}

function checkIfFilesAreCorrectType(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export const pageSummarySchema = yup.object().shape({
  agree: yup.boolean().isTrue("pleace accept"),
});
