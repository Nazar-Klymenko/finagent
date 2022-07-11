import React, { useState } from "react";

import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";

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
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();

  const appDataValid = appData.insuranceHealth;
  const summaryReady = determineAppType("insuranceHealth", appDataValid);

  const confirmApplication = async () => {
    await postApplication("insraunce-health", appDataValid);
    router.push("/dashboard/insurance");
  };

  return (
    <PageContainer xs title={t("insuranceHealth.title")}>
      <Typography variant="h4">{t("insuranceHealth.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <Typography variant="h6" gutterBottom>
        {t("Basic.summary")}
      </Typography>
      <SummaryList
        header={t("Basic.summary")}
        array={summaryReady}
        applicationType="insuranceHealth"
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
