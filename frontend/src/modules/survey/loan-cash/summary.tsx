import React from "react";

import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";

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
  const { t } = i18next;
  const router = useRouter();
  const { appData } = useData();

  const appDataValid = appData.loanCash;
  const summaryReady = determineAppType("insuranceTransport", appDataValid);

  const confirmApplication = async () => {
    await postApplication("loan-cash", appDataValid);
    router.push("/dashboard/loan");
  };

  return (
    <PageContainer xs title={t("Basic.summary")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("loanCash.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <Typography variant="h6" gutterBottom>
        {t("Basic.summary")}
      </Typography>
      <SummaryList
        header={t("Basic.summary")}
        array={summaryReady}
        applicationType="loanCash"
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
