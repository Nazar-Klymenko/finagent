import React from "react";

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
import { Checkbox, Input, Textarea } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageThreeSchema } from "./helpers/loan-cash.schema";

type FormTypes = {
  remainingPayOff: string;
  lastApplications: string;
  custody: string;
  loanPurpose: string;
  loanAmount: string;
  paymentTerm: string;
  conditions: boolean;
};

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.loanCash.loanData;

  const router = useRouter();

  const methods = useForm<FormTypes>({
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
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageThreeSchema()),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "loanCash", "loanData");
    setAllowSummary(true);
    router.push("./summary");
  });

  return (
    <PageContainer xs title={t("loanCash.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("loanCash.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={3}
        label={t("loanCash.Page2.subtitle")}
      />
      <Typography variant="h6">{t("loanCash.Page2.subtitle")}</Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Textarea
          name="remainingPayOff"
          labelName={t("loanCash.Page2.remainingPayOff")}
          placeholder="number"
        />
        <Textarea
          name="lastApplications"
          labelName={t("loanCash.Page2.lastApplications")}
          placeholder="Yes, open answer / No"
        />
        <Input
          name="custody"
          labelName={t("loanCash.Page2.custody")}
          type="text"
          placeholder="number"
        />
        <Textarea
          name="loanPurpose"
          labelName={t("loanCash.Page2.loanPurpose")}
          placeholder="Purpose"
        />
        <Input
          name="loanAmount"
          labelName={t("loanCash.Page2.loanAmount")}
          type="text"
          placeholder="number"
        />
        <Input
          name="paymentTerm"
          labelName={t("loanCash.Page2.paymentTerm")}
          type="text"
          placeholder="number"
        />
        <Checkbox
          name="conditions"
          labelName={t("loanCash.Page2.conditions")}
          errorSpacer
        />
      </Form>
      <FormBuilder.ButtonsWrap multiple>
        <Button
          form=""
          color="secondary"
          onClick={() => {
            router.push("./2");
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

export default Page2;
