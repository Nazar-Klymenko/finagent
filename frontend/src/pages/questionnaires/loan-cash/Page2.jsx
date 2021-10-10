import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageTwoSchema } from "./applicationHelpers/loanCashSchema";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  InputErrorMessage,
} from "../LocalStyles";
import { Input, MuiCheckbox, Textarea } from "@components/input";
import ContentWrap from "@components/content/ContentWrap";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = validateAppData(appData, "LoanData");

  const history = useHistory();

  useTitle("Cash loan | FinAgent");

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      remainingPayOff: appDataValid.remainingPayOff,
      lastApplications: appDataValid.lastApplications,
      custody: appDataValid.custody,
      loanPurpose: appDataValid.loanPurpose,
      loanAmount: appDataValid.loanAmount,
      paymentTerm: appDataValid.paymentTerm,
      conditions: appDataValid.conditions,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema()),
  });

  const formSubmit = (data) => {
    setValues(data, "LoanData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Loan Info" />
        <Subtitle>{t("LoanCash.Page2.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Textarea
            ref={register}
            name="remainingPayOff"
            labelName={t("LoanCash.Page2.remainingPayOff")}
            rows={4}
            type="text"
            error={!!errors.remainingPayOff}
            helperText={errors?.remainingPayOff?.message}
            placeholder="number"
          />
          <Textarea
            ref={register}
            name="lastApplications"
            labelName={t("LoanCash.Page2.lastApplications")}
            rows={4}
            type="text"
            error={!!errors.lastApplications}
            helperText={errors?.lastApplications?.message}
            placeholder="Yes, open answer / No"
          />
          <Input
            ref={register}
            name="custody"
            labelName={t("LoanCash.Page2.custody")}
            type="text"
            error={!!errors.custody}
            helperText={errors?.custody?.message}
            placeholder="number"
          />
          <Textarea
            ref={register}
            name="loanPurpose"
            labelName={t("LoanCash.Page2.loanPurpose")}
            rows={4}
            type="text"
            error={!!errors.loanPurpose}
            helperText={errors?.loanPurpose?.message}
            placeholder="Purpose"
          />
          <Input
            ref={register}
            name="loanAmount"
            labelName={t("LoanCash.Page2.loanAmount")}
            type="text"
            error={!!errors.loanAmount}
            helperText={errors?.loanAmount?.message}
            placeholder="number"
          />
          <Input
            ref={register}
            name="paymentTerm"
            labelName={t("LoanCash.Page2.paymentTerm")}
            type="text"
            error={!!errors.paymentTerm}
            helperText={errors?.paymentTerm?.message}
            placeholder="number"
          />
          <MuiCheckbox
            control={control}
            name="conditions"
            labelName={t("LoanCash.Page2.conditions")}
            helperText={errors?.conditions?.message}
          />
          <InputErrorMessage>
            <span className="invis-star">*</span>
            {errors?.conditions && t(errors?.conditions?.message)}
          </InputErrorMessage>
        </Form>
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
      </Page>
    </ContentWrap>
  );
};

export default Page2;
