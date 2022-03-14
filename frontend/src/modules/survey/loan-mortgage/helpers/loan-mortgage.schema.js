import * as yup from "yup";

export const ApplicantSchema = () => {
  return yup.object().shape({
    applicant: yup.array().of(
      yup.object().shape({
        nationality: yup.string(),
        otherNation: yup.string().when("nationality", {
          is: "other",
          then: yup.string().required("Form.Error.blank"),
        }),
        residenceDocument: yup.string(),

        validFrom: yup
          .date()
          .nullable()
          .when("nationality", {
            is: "other",
            then: yup.date().nullable().required("Form.Error.missingDate"),
          }),
        validUntil: yup
          .date()
          .nullable()
          .when("nationality", {
            is: "other",
            then: yup.date().when("residenceDocument", {
              is: (value) => value !== "permanentCard",
              then: yup.date().nullable().required("Form.Error.missingDate"),
            }),
          }),

        name: yup.string().required("Form.Error.blank"),

        birthDate: yup.date().nullable().required("Form.Error.missingDate"),

        phoneNumber: yup.string().required("Form.Error.blank"),
        email: yup.string().required("Form.Error.blank"),
        pesel: yup.string().required("Form.Error.blank"),

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
        currency: yup.string().required("Form.Error.blank"),
        pit: yup.string().required("Form.Error.blank"),
        bank: yup.string().required("Form.Error.blank"),
      })
    ),
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

export const pageTwoSchema = () => {
  return yup.object().shape({
    custody: yup.string().required("Form.Error.blank"),
    monthlyLoanPayments: yup.string().required("Form.Error.blank"),
    cardLimits: yup.string().required("Form.Error.blank"),
    loanPurpose: yup.string().required("Form.Error.blank"),
    rialto: yup.string().required("Form.Error.blank"),
    propertyValue: yup.string().required("Form.Error.blank"),
    renovationValue: yup.string().required("Form.Error.blank"),
    contributionAmount: yup.string().required("Form.Error.blank"),
    paymentTerm: yup.string().required("Form.Error.blank"),
    repayment: yup.string().required("Form.Error.blank"),
    monthlyPayments: yup.string().required("Form.Error.blank"),
    voivodeship: yup.string().required("Form.Error.blank"),
    town: yup.string().required("Form.Error.blank"),
    conditions: yup.bool().oneOf([true], "Form.Error.mustBeChecked"),
  });
};
