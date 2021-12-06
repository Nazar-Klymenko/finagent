import React, { useState } from "react";

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
import { DateInput, MuiCheckbox, MuiSelect } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { clauseOnePriceOptions } from "./applicationHelpers/insuranceHealthOptions";
import { clauseTwoPriceOptions } from "./applicationHelpers/insuranceHealthOptions";
import { clauseThreePriceOptions } from "./applicationHelpers/insuranceHealthOptions";
import { pageOneSchema } from "./applicationHelpers/insuranceHealthSchema";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Health insurance | FinAgent");
  const history = useHistory();

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceHealth",
    "insuranceData"
  );

  const {
    handleSubmit,
    control,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      clauseOne: true,
      clauseTwo: appDataValid.clauseTwo,
      clauseThree: appDataValid.clauseThree,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(pageOneSchema()),
  });

  let showTwoAmount = watch("clauseTwo");
  let showThreeAmount = watch("clauseThree");

  const formSubmit = (data) => {
    setValues(data, "insuranceHealth", "insuranceData");
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
            defaultValue={appDataValid.insuranceStart}
            disablePast
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceHealth.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            defaultValue={appDataValid.insuranceEnd}
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
