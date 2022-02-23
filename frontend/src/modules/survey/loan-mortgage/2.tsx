import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Input, MuiCheckbox, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import {
  ApplicantBox,
  ButtonsWrap,
  ErrorBottom,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import AddHousehold from "./AddHousehold";
import { pageTwoSchema } from "./applicationHelpers/loan-mortgage.schema";
import { loanPurposeOptions } from "./applicationHelpers/options";
import { rialtoOptions } from "./applicationHelpers/options";
import { paymentTermOptions } from "./applicationHelpers/options";
import { repaymentOptions } from "./applicationHelpers/options";
import { monthlyPaymentsOptions } from "./applicationHelpers/options";

const Page2 = () => {
  const { t } = useTranslation();
  const {
    appData,
    setValues,
    setAllowSummary,
    addHouseholdData,
    setAddHouseholdData,
  } = useData();

  const appDataValid = validateAppData(appData, "LoanData");

  const router = useRouter();

  useTitle("Cash loan | FinAgent");

  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState("");
  let [isEditing, setIsEditing] = useState(false);

  let [householdData, setHouseholdData] = useState(addHouseholdData || []);
  let [defaultHousehold, setDefaultHousehold] = useState(null);

  const methods = useForm({
    defaultValues: {
      custody: appDataValid.custody,
      monthlyLoanPayments: appDataValid.monthlyLoanPayments,
      cardLimits: appDataValid.cardLimits,
      loanPurpose: appDataValid.loanPurpose,
      rialto: appDataValid.rialto,
      propertyValue: appDataValid.propertyValue,
      renovationValue: appDataValid.renovationValue,
      contributionAmount: appDataValid.contributionAmount,
      paymentTerm: appDataValid.paymentTerm,
      repayment: appDataValid.repayment,
      monthlyPayments: appDataValid.monthlyPayments,
      voivodeship: appDataValid.voivodeship,
      town: appDataValid.town,
      conditions: appDataValid.conditions,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema()),
  });
  const { handleSubmit } = methods;
  const formSubmit = (data: any) => {
    setValues(data, "LoanData");
    if (householdData.length === 0) {
      setIsError(t("LoanMortgage.Error.noHousehold"));
    } else {
      setAllowSummary(true);
      history.push("./summary");
    }
  };

  useEffect(() => {
    setValues(householdData, "HouseholdData");
    setAddHouseholdData(householdData);
    setIsError("");
  }, [householdData]);

  return (
    <PageContainer xs title="">
      <QuestState data={appData} />

      <Title>{t("LoanMortgage.title")}</Title>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("LoanMortgage.Page2.subtitle")}
      />
      <Subtitle>{t("LoanMortgage.Page2.subtitle")}</Subtitle>
      <Form methods={methods} id="form" onSubmit={handleSubmit(formSubmit)}>
        <Subtitle>{t("LoanMortgage.HouseholdBox.title")}</Subtitle>

        <ApplicantBox>
          {/* {householdData &&
              householdData.map((household, idx) => (
                <div key={idx} className="person">
                  <div className="minor-data-place">
                    <span>{household.monthlyExpenses}</span>
                  </div>
                  <div className="action-place">
                    <span
                      className="edit"
                      onClick={() => {
                        setDefaultHousehold(idx);
                        setIsEditing(!isEditing);
                        setOpenModal(true);
                      }}
                    >
                      {t("LoanMortgage.HouseholdBox.edit")}
                    </span>
                    <span
                      className="delete"
                      value={idx}
                      onClick={removeHousehold}
                    >
                      {t("InsuranceHealth.ApplicantBox.delete")}
                    </span>
                  </div>
                </div>
              ))} */}

          <span
            className="add"
            onClick={() => {
              setOpenModal(true);
              setDefaultHousehold(null);
            }}
          >
            {t("LoanMortgage.HouseholdBox.addHousehold")}
          </span>
        </ApplicantBox>

        <Input
          name="custody"
          labelName={t("LoanMortgage.Page2.custody")}
          type="text"
          placeholder="number"
        />
        <Input
          name="monthlyLoanPayments"
          labelName={t("LoanMortgage.Page2.monthlyLoanPayments")}
          type="text"
          placeholder="number"
        />
        <Input
          name="cardLimits"
          labelName={t("LoanMortgage.Page2.cardLimits")}
          type="text"
          placeholder="number"
        />
        <Select
          name="loanPurpose"
          labelName={t("LoanMortgage.Page2.loanPurpose")}
          defaultValue={appDataValid.loanPurpose}
          placeholder="Choose purpose:"
          optionArray={loanPurposeOptions}
        />

        <Select
          name="rialto"
          labelName={t("LoanMortgage.Page2.rialto")}
          defaultValue={appDataValid.rialto}
          placeholder="Choose rialto:"
          optionArray={rialtoOptions}
        />
        <Input
          name="propertyValue"
          labelName={t("LoanMortgage.Page2.propertyValue")}
          type="text"
          placeholder="number"
        />
        <Input
          name="renovationValue"
          labelName={t("LoanMortgage.Page2.renovationValue")}
          type="text"
          placeholder="number"
        />
        <Input
          name="contributionAmount"
          labelName={t("LoanMortgage.Page2.contributionAmount")}
          type="text"
          placeholder="number"
        />
        <Select
          name="paymentTerm"
          labelName={t("LoanMortgage.Page2.paymentTerm")}
          defaultValue={appDataValid.paymentTerm}
          placeholder="Choose term:"
          optionArray={paymentTermOptions}
        />
        <Select
          name="repayment"
          labelName={t("LoanMortgage.Page2.repayment")}
          defaultValue={appDataValid.repayment}
          placeholder="Yes / No"
          optionArray={repaymentOptions}
        />
        <Select
          name="monthlyPayments"
          labelName={t("LoanMortgage.Page2.monthlyPayments")}
          defaultValue={appDataValid.monthlyPayments}
          placeholder="Equal / Decreasing"
          optionArray={monthlyPaymentsOptions}
        />
        <Subtitle>{t("LoanMortgage.Page2.propertyLocation")}</Subtitle>
        <Input
          name="voivodeship"
          labelName={t("LoanMortgage.Page2.voivodeship")}
          type="text"
          placeholder="Malopolskie"
        />
        <Input
          name="town"
          labelName={t("LoanMortgage.Page2.town")}
          type="text"
          placeholder="Krakow"
        />
        <MuiCheckbox
          name="conditions"
          labelName={t("LoanMortgage.Page2.conditions")}
        />
      </Form>
      <AddHousehold
        openModal={openModal}
        setOpenModal={setOpenModal}
        householdData={householdData}
        setHouseholdData={setHouseholdData}
        defaultHousehold={defaultHousehold}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <FormBuilder.ButtonsWrap multiple>
        <Button
          text={t("Basic.buttonBack")}
          form=""
          color="secondary"
          onClick={() => {
            history.push("./1");
          }}
        />
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
      {isError && <ErrorBottom>{isError}</ErrorBottom>}
    </PageContainer>
  );
};

export default Page2;
