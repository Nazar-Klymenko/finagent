import React, { useState } from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageOneSchema } from "./applicationHelpers/insuranceHealthSchema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { Checkbox, DateInput, SelectInput } from "@components/input";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

const Page1 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = validateAppData(appData, "InsuranceData");
  const history = useHistory();

  const [showTwoAmount, setShowTwoAmount] = useState(
    appDataValid.clauseTwo || false
  );
  const [showThreeAmount, setShowThreeAmount] = useState(
    appDataValid.clauseThree || false
  );

  useTitle("Health insurance | FinAgent");

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      clauseTwo: appDataValid.clauseTwo,
      clauseThree: appDataValid.clauseThree,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(pageOneSchema()),
  });

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
        <ProgressBar maxSteps={2} currentStep={1} label="Insurance Info" />
        <Subtitle>{t("InsuranceHealth.Page1.subtitle")}</Subtitle>

        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceHealth.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            defaultDate={appDataValid.insuranceStart}
            disablePastDates
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceHealth.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            defaultDate={appDataValid.insuranceEnd}
            disablePastDates
          />
          <Subtitle>{t("InsuranceHealth.Page1.riskType")}</Subtitle>
          <Checkbox
            ref={register}
            name="clauseOne"
            readOnly={true}
            checked={true}
            labelName={t("InsuranceHealth.Page1.clauseOne")}
          />
          <SelectInput
            ref={register}
            name="clauseOnePrice"
            defaultValue={appDataValid.clauseOnePrice}
            labelName={t("InsuranceHealth.Page1.chooseAmountEuro")}
            optionArray={["10 000", "20 000", "30 000", "40 000"]}
            placeholder="Amount:"
            error={!!errors.clauseOnePrice}
            helperText={errors?.clauseOnePrice?.message}
          />
          <Checkbox
            ref={register}
            name="clauseTwo"
            labelName={t("InsuranceHealth.Page1.clauseTwo")}
            onChange={() => {
              setShowTwoAmount(!showTwoAmount);
            }}
          />
          {showTwoAmount && (
            <SelectInput
              ref={register}
              name="clauseTwoPrice"
              defaultValue={appDataValid.clauseTwoPrice}
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={["5 000", "10 000", "15 000", "20 000"]}
              placeholder="Amount:"
              error={!!errors.clauseTwoPrice}
              helperText={errors?.clauseTwoPrice?.message}
            />
          )}
          <Checkbox
            ref={register}
            name="clauseThree"
            labelName={t("InsuranceHealth.Page1.clauseThree")}
            onChange={() => {
              setShowThreeAmount(!showThreeAmount);
            }}
          />
          {showThreeAmount && (
            <SelectInput
              ref={register}
              name="clauseThreePrice"
              defaultValue={appDataValid.clauseThreePrice}
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={["50 000", "100 000"]}
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
