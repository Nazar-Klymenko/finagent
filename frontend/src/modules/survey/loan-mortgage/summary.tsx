import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";
import { determineAppType } from "@helpers/determineAppType";

import { postApplication } from "@api/applications";

import { useData } from "@context/dataContext";

import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
import { Button } from "@components/buttons";
import { PageContainer } from "@components/layout";

const Summary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { appData } = useData();

  const appDataValid = appData.loanMortgage;
  const summaryReady = determineAppType("loanMortgage", appDataValid);

  const confirmApplication = async () => {
    await postApplication("loan-mortgage", appDataValid);
    router.push("/dashboard/loan");
  };

  return (
    <PageContainer xs title={t("Basic.summary")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("loanMortgage.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        array={summaryReady}
        applicationType="loanMortgage"
        defaultOpen
      />
      <FormBuilder.ButtonsWrap multiple>
        <Button
          color="secondary"
          form=""
          onClick={() => {
            router.push("./2");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="" color="primary" onClick={confirmApplication}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
