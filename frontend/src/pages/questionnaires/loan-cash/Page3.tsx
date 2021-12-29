import React from "react";

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
import { MuiButton } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import { MuiCheckbox, MuiInput, Textarea } from "@components/input";

import {
  ButtonsWrap,
  InputErrorMessage,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import { pageThreeSchema } from "./applicationHelpers/loan-cash.schema";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.loanCash?.loanData;

  const history = useHistory();

  useTitle("Cash loan | FinAgent");

  const methods = useForm({
    defaultValues: {
      remainingPayOff: appDataValid?.remainingPayOff,
      lastApplications: appDataValid?.lastApplications,
      custody: appDataValid?.custody,
      loanPurpose: appDataValid?.loanPurpose,
      loanAmount: appDataValid?.loanAmount,
      paymentTerm: appDataValid?.paymentTerm,
      conditions: appDataValid?.conditions,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema()),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "LoanData");
    setAllowSummary(true);
    history.push("./summary");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={3}
          label={t("LoanCash.Page2.subtitle")}
        />
        <Subtitle>{t("LoanCash.Page2.subtitle")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <Textarea
            name="remainingPayOff"
            labelName={t("LoanCash.Page2.remainingPayOff")}
            placeholder="number"
          />
          <Textarea
            name="lastApplications"
            labelName={t("LoanCash.Page2.lastApplications")}
            placeholder="Yes, open answer / No"
          />
          <MuiInput
            name="custody"
            labelName={t("LoanCash.Page2.custody")}
            type="text"
            placeholder="number"
          />
          <Textarea
            name="loanPurpose"
            labelName={t("LoanCash.Page2.loanPurpose")}
            placeholder="Purpose"
          />
          <MuiInput
            name="loanAmount"
            labelName={t("LoanCash.Page2.loanAmount")}
            type="text"
            placeholder="number"
          />
          <MuiInput
            name="paymentTerm"
            labelName={t("LoanCash.Page2.paymentTerm")}
            type="text"
            placeholder="number"
          />
          <MuiCheckbox
            name="conditions"
            labelName={t("LoanCash.Page2.conditions")}
          />
          <InputErrorMessage>
            <span className="invis-star">*</span>
            {errors?.conditions && t(errors?.conditions?.message)}
          </InputErrorMessage>
        </Form>
        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./2");
            }}
          />
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
