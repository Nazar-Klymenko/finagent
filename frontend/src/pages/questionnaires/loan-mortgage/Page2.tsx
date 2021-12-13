import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiCheckbox, MuiInput, MuiSelect } from "@components/input";

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

  const history = useHistory();

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
    <ContentWrap fullWidth>
      <QuestState data={appData} />
      <Page>
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

          <MuiInput
            name="custody"
            labelName={t("LoanMortgage.Page2.custody")}
            type="text"
            placeholder="number"
          />
          <MuiInput
            name="monthlyLoanPayments"
            labelName={t("LoanMortgage.Page2.monthlyLoanPayments")}
            type="text"
            placeholder="number"
          />
          <MuiInput
            name="cardLimits"
            labelName={t("LoanMortgage.Page2.cardLimits")}
            type="text"
            placeholder="number"
          />
          <MuiSelect
            name="loanPurpose"
            labelName={t("LoanMortgage.Page2.loanPurpose")}
            defaultValue={appDataValid.loanPurpose}
            placeholder="Choose purpose:"
            optionArray={loanPurposeOptions}
          />

          <MuiSelect
            name="rialto"
            labelName={t("LoanMortgage.Page2.rialto")}
            defaultValue={appDataValid.rialto}
            placeholder="Choose rialto:"
            optionArray={rialtoOptions}
          />
          <MuiInput
            name="propertyValue"
            labelName={t("LoanMortgage.Page2.propertyValue")}
            type="text"
            placeholder="number"
          />
          <MuiInput
            name="renovationValue"
            labelName={t("LoanMortgage.Page2.renovationValue")}
            type="text"
            placeholder="number"
          />
          <MuiInput
            name="contributionAmount"
            labelName={t("LoanMortgage.Page2.contributionAmount")}
            type="text"
            placeholder="number"
          />
          <MuiSelect
            name="paymentTerm"
            labelName={t("LoanMortgage.Page2.paymentTerm")}
            defaultValue={appDataValid.paymentTerm}
            placeholder="Choose term:"
            optionArray={paymentTermOptions}
          />
          <MuiSelect
            name="repayment"
            labelName={t("LoanMortgage.Page2.repayment")}
            defaultValue={appDataValid.repayment}
            placeholder="Yes / No"
            optionArray={repaymentOptions}
          />
          <MuiSelect
            name="monthlyPayments"
            labelName={t("LoanMortgage.Page2.monthlyPayments")}
            defaultValue={appDataValid.monthlyPayments}
            placeholder="Equal / Decreasing"
            optionArray={monthlyPaymentsOptions}
          />
          <Subtitle>{t("LoanMortgage.Page2.propertyLocation")}</Subtitle>
          <MuiInput
            name="voivodeship"
            labelName={t("LoanMortgage.Page2.voivodeship")}
            type="text"
            placeholder="Malopolskie"
          />
          <MuiInput
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
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
        {isError && <ErrorBottom>{isError}</ErrorBottom>}
      </Page>
    </ContentWrap>
  );
};

export default Page2;
