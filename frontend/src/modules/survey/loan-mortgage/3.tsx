import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Checkbox, Input, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageTwoSchema } from "./helpers/loan-mortgage.schema";
import { loanPurposeOptions } from "./helpers/options";
import { rialtoOptions } from "./helpers/options";
import { paymentTermOptions } from "./helpers/options";
import { repaymentOptions } from "./helpers/options";
import { monthlyPaymentsOptions } from "./helpers/options";

type FormTypes = {
  custody: string;
  monthlyLoanPayments: string;
  cardLimits: string;
  loanPurpose: string;
  rialto: string;
  propertyValue: string;
  renovationValue: string;
  contributionAmount: string;
  paymentTerm: string;
  repayment: string;
  monthlyPayments: string;
  voivodeship: string;
  town: string;
  conditions: boolean;
};

const Page3 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.loanMortgage.loanData;

  const router = useRouter();

  const methods = useForm<FormTypes>({
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
    setValues(data, "loanMortgage", "LoanData");

    setAllowSummary(true);
    router.push("./summary");
  };

  return (
    <PageContainer xs title="LoanMortgage.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("LoanMortgage.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("LoanMortgage.Page2.subtitle")}
      />
      <Typography variant="h6">{t("LoanMortgage.Page2.subtitle")}</Typography>
      <Form methods={methods} id="form" onSubmit={handleSubmit(formSubmit)}>
        <Typography>{t("LoanMortgage.HouseholdBox.title")}</Typography>

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
          options={loanPurposeOptions(t)}
        />

        <Select
          name="rialto"
          labelName={t("LoanMortgage.Page2.rialto")}
          defaultValue={appDataValid.rialto}
          placeholder="Choose rialto:"
          options={rialtoOptions(t)}
        />
        <Input
          name="propertyValue"
          labelName={t("LoanMortgage.Page2.propertyValue")}
          type="text"
        />
        <Input
          name="renovationValue"
          labelName={t("LoanMortgage.Page2.renovationValue")}
          type="text"
        />
        <Input
          name="contributionAmount"
          labelName={t("LoanMortgage.Page2.contributionAmount")}
          type="text"
        />
        <Select
          name="paymentTerm"
          labelName={t("LoanMortgage.Page2.paymentTerm")}
          defaultValue={appDataValid.paymentTerm}
          placeholder="Choose term:"
          options={paymentTermOptions}
        />
        <Select
          name="repayment"
          labelName={t("LoanMortgage.Page2.repayment")}
          defaultValue={appDataValid.repayment}
          placeholder="Yes / No"
          options={repaymentOptions(t)}
        />
        <Select
          name="monthlyPayments"
          labelName={t("LoanMortgage.Page2.monthlyPayments")}
          defaultValue={appDataValid.monthlyPayments}
          placeholder="Equal / Decreasing"
          options={monthlyPaymentsOptions(t)}
        />
        <Typography>{t("LoanMortgage.Page2.propertyLocation")}</Typography>
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
        <Checkbox
          name="conditions"
          labelName={t("LoanMortgage.Page2.conditions")}
        />
      </Form>

      <FormBuilder.ButtonsWrap multiple>
        <Button
          form=""
          color="secondary"
          onClick={() => {
            router.push("./1");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page3;
