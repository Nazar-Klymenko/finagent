import * as yup from "yup";

export const addApplicantSchema = () => {
  return yup.object().shape({
    otherNation: yup.string().when("nationality", {
      is: "other",
      then: yup.string().required("Form.Error.blank"),
    }),

    validFrom: yup.date().when("nationality", {
      is: "other",
      then: yup.date().nullable().required("Form.Error.missingDate"),
    }),
    validUntil: yup.date().when("nationality", {
      is: "other",
      then: yup.date().when("residenceDocument", {
        is: (value) => value !== "permanentCard",
        then: yup.date().nullable().required("Form.Error.missingDate"),
      }),
    }),

    name: yup.string().required("Form.Error.blank"),
    surname: yup.string().required("Form.Error.blank"),

    birthDate: yup.date().nullable().required("Form.Error.missingDate"),

    phoneNumber: yup.string().required("Form.Error.blank"),
    email: yup.string().required("Form.Error.blank"),
    pesel: yup.string().required("Form.Error.blank"),

    contractFrom: yup.date().when("basicIncome", {
      is: (value) =>
        value === "specificTime" || value === "mandate" || value === "contract",
      then: yup.date().nullable().required("Form.Error.missingDate"),
    }),
    contractUntil: yup.date().when("basicIncome", {
      is: (value) =>
        value === "specificTime" || value === "mandate" || value === "contract",
      then: yup.date().nullable().required("Form.Error.missingDate"),
    }),

    averageIncome: yup.string().required("Form.Error.blank"),
    currency: yup.string().required("Form.Error.blank"),
    pit: yup.string().required("Form.Error.blank"),
    bank: yup.string().required("Form.Error.blank"),
  });
};

export const AdditionalIncomeSchema = () => {
  return yup.object().shape({
    income: yup.array().of(
      yup.object().shape({
        industry: yup.string().when("truckDriver", {
          is: "no",
          then: yup.string().required("Form.Error.blank"),
        }),
        contractFrom: yup
          .date()
          .nullable()
          .when("basicIncome", {
            is: (value) =>
              value === "specificTime" ||
              value === "mandate" ||
              value === "contract",
            then: yup.date().nullable().required("Form.Error.missingDate"),
          }),
        contractUntil: yup
          .date()
          .nullable()
          .when("basicIncome", {
            is: (value) =>
              value === "specificTime" ||
              value === "mandate" ||
              value === "contract",
            then: yup.date().nullable().required("Form.Error.missingDate"),
          }),
        averageIncome: yup.string().required("Form.Error.blank"),
        pit: yup.string().required("Form.Error.blank"),
      })
    ),
  });
};

export const pageThreeSchema = () => {
  return yup.object().shape({
    remainingPayOff: yup.string().required("Form.Error.blank"),
    lastApplications: yup.string().required("Form.Error.blank"),
    custody: yup.string().required("Form.Error.blank"),
    loanPurpose: yup.string().required("Form.Error.blank"),
    loanAmount: yup.string().required("Form.Error.blank"),
    paymentTerm: yup.string().required("Form.Error.blank"),
    conditions: yup.bool().oneOf([true], "Field must be checked"),
  });
};
