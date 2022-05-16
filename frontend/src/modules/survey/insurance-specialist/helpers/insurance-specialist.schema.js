import * as yup from "yup";

export const pageOneSchema = () => {
  return yup.object().shape({
    insuranceStart: yup
      .date()
      .typeError("Form.Error.invalidDate")
      .nullable()
      .required("Form.Error.missingDate"),
    insuranceEnd: yup
      .date()
      .typeError("Form.Error.invalidDate")
      .nullable()
      .required("Form.Error.missingDate"),

    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
      .required("Form.Error.blank"),
    nip: yup.string().when("policyholderIs", {
      is: (value) => value !== "individual",
      then: yup.string().required("Form.Error.blank"),
    }),
    birthDate: yup
      .date()
      .typeError("Form.Error.invalidDate")
      .when("policyholderIs", {
        is: "individual",
        then: yup
          .date()
          .required("Form.Error.missingDate")
          .nullable()
          .typeError("Form.Error.invalidDate"),
      }),
    pesel: yup.string().when("policyholderIs", {
      is: "individual",
      then: yup.string().required("Form.Error.blank"),
    }),
    regon: yup.string().when("policyholderIs", {
      is: (value) => value !== "individual",
      then: yup.string().required("Form.Error.blank"),
    }),

    phoneNumber: yup.string().required("Form.Error.blank"),
    email: yup.string().required("Form.Error.blank"),
    country: yup.string().required("Form.Error.blank"),
    city: yup.string().required("Form.Error.blank"),
    postIndex: yup.string().required("Form.Error.blank"),
    street: yup.string().required("Form.Error.blank"),
    houseNumber: yup.string().required("Form.Error.blank"),
  });
};

export const policyholderSchema = () => {
  return yup.object().shape({
    policyholder: yup.array().of(
      yup.object().shape({
        policyholderIs: yup.string(),
        name: yup
          .string()
          .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
          .when("policyholderIs", {
            is: "individual",
            then: yup.string().required("Form.Error.blank"),
          }),
        companyName: yup.string().when("policyholderIs", {
          is: (value) => value !== "individual",
          then: yup.string().required("Form.Error.blank"),
        }),
        nip: yup.string().when("policyholderIs", {
          is: (value) => value !== "individual",
          then: yup.string().required("Form.Error.blank"),
        }),
        birthDate: yup
          .date()
          .typeError("Form.Error.invalidDate")
          .nullable()
          .when("policyholderIs", {
            is: "individual",
            then: yup
              .date()
              .required("Form.Error.missingDate")
              .nullable()
              .typeError("Form.Error.invalidDate"),
          }),
        pesel: yup.string().when("policyholderIs", {
          is: "individual",
          then: yup.string().required("Form.Error.blank"),
        }),
        regon: yup.string().when("policyholderIs", {
          is: (value) => value !== "individual",
          then: yup.string().required("Form.Error.blank"),
        }),
        phoneNumber: yup.string().required("Form.Error.blank"),
        email: yup.string().required("Form.Error.blank"),
        country: yup.string().required("Form.Error.blank"),
        city: yup.string().required("Form.Error.blank"),
        postIndex: yup.string().required("Form.Error.blank"),
        street: yup.string().required("Form.Error.blank"),
        houseNumber: yup.string().required("Form.Error.blank"),
      })
    ),
  });
};
