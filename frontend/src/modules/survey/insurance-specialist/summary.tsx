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

  const appDataValid = appData.insuranceSpecialist;
  const summaryReady = determineAppType("insuranceSpecialist", appDataValid);

  const confirmApplication = async () => {
    await postApplication("insraunce-specialist", appDataValid);
    router.push("/dashboard/insurance");
  };

  return (
    <PageContainer xs title={t("insuranceSpecialist.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceSpecialist.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <Typography variant="h4">{t("Basic.summary")}</Typography>

      <SummaryList
        header={t("Basic.summary")}
        array={summaryReady}
        applicationType="insuranceSpecialist"
        defaultOpen
      />

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
        <Button form="" color="primary" onClick={confirmApplication}>
          {t("Basic.buttonConfirm")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
