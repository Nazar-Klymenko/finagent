import * as yup from "yup";

export const pageOneSchema = () => {
  return yup.object().shape({
    insuranceStart: yup.date().nullable().required("Form.Error.missingDate"),
    insuranceEnd: yup.date().nullable().required("Form.Error.missingDate"),
    clauseOne: yup.boolean(),
    clauseTwo: yup.boolean(),
    clauseThree: yup.boolean(),
    clauseOnePrice: yup.string().required("Form.Error.missingAmount"),
    clauseTwoPrice: yup.string().when("clauseTwo", {
      is: true,
      then: yup.string().required("Form.Error.missingAmount"),
    }),
    clauseThreePrice: yup.string().when("clauseThree", {
      is: true,
      then: yup.string().required("Form.Error.missingAmount"),
    }),
  });
};

export const policyholderSchema = () => {
  return yup.object().shape({
    policyholder: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Form.Error.blank"),
        documentAdded: yup.string().required("Form.Error.blank"),
        birthDate: yup.date().nullable().required("Form.Error.missingDate"),
        citizenship: yup.string().when("policyholderIs", {
          is: "Foreigner",
          then: yup.string().required("Form.Error.blank"),
        }),
        country: yup.string().required("Form.Error.blank"),
        city: yup.string().required("Form.Error.blank"),
        postIndex: yup.string().required("Form.Error.blank"),
        street: yup.string().required("Form.Error.blank"),
        houseNumber: yup.string().required("Form.Error.blank"),
      })
    ),
  });
};
