import React, { useState } from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageOneSchema } from "./applicationHelpers/insuranceHealthSchema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { DateInput, MuiSelect, MuiCheckbox } from "@components/input";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

import { clauseOnePriceOptions } from "./applicationHelpers/insuranceHealthOptions";
import { clauseTwoPriceOptions } from "./applicationHelpers/insuranceHealthOptions";
import { clauseThreePriceOptions } from "./applicationHelpers/insuranceHealthOptions";

const Page1 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = validateAppData(appData, "InsuranceData");
  const history = useHistory();

  useTitle("Health insurance | FinAgent");

  const { handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      clauseOne: true,
      clauseTwo: appDataValid.clauseTwo,
      clauseThree: appDataValid.clauseThree,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(pageOneSchema()),
  });

  let showTwoAmount = watch("clauseTwo");
  let showThreeAmount = watch("clauseThree");

  const formSubmit = (data) => {
    setValues(data, "InsuranceData");
    setCurrentPage(2);
    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceHealth.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceHealth.Page1.subtitle")}</Subtitle>

        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceHealth.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            defaultDate={appDataValid.insuranceStart}
            disablePast
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceHealth.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            defaultDate={appDataValid.insuranceEnd}
            disablePast
          />
          <Subtitle>{t("InsuranceHealth.Page1.riskType")}</Subtitle>
          <MuiCheckbox
            control={control}
            name="clauseOne"
            readOnly={true}
            checked={true}
            labelName={t("InsuranceHealth.Page1.clauseOne")}
          />
          <MuiSelect
            control={control}
            name="clauseOnePrice"
            defaultValue={appDataValid.clauseOnePrice}
            labelName={t("InsuranceHealth.Page1.chooseAmountEuro")}
            optionArray={clauseOnePriceOptions}
            placeholder="Amount:"
            error={!!errors.clauseOnePrice}
            helperText={errors?.clauseOnePrice?.message}
          />
          <MuiCheckbox
            control={control}
            name="clauseTwo"
            labelName={t("InsuranceHealth.Page1.clauseTwo")}
          />
          {showTwoAmount && (
            <MuiSelect
              control={control}
              name="clauseTwoPrice"
              defaultValue={appDataValid.clauseTwoPrice}
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={clauseTwoPriceOptions}
              placeholder="Amount:"
              error={!!errors.clauseTwoPrice}
              helperText={errors?.clauseTwoPrice?.message}
            />
          )}
          <MuiCheckbox
            control={control}
            name="clauseThree"
            labelName={t("InsuranceHealth.Page1.clauseThree")}
          />
          {showThreeAmount && (
            <MuiSelect
              control={control}
              name="clauseThreePrice"
              defaultValue={appDataValid.clauseThreePrice}
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={clauseThreePriceOptions}
              placeholder="Amount:"
              error={!!errors.clauseThreePrice}
              helperText={errors?.clauseThreePrice?.message}
            />
          )}
        </Form>
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
