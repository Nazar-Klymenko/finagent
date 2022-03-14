import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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

  const appDataValid = appData.insuranceEstate;
  const summaryReady = determineAppType("insuranceEstate", appDataValid);

  const confirmApplication = async () => {
    await postApplication("insraunce-estate", appDataValid);
    router.push("/dashboard/insurance");
  };

  return (
    <PageContainer xs title="insuranceEstate.title">
      <Typography variant="h4">{t("insuranceEstate.title")}</Typography>

      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        array={summaryReady}
        applicationType="insuranceEstate"
        defaultOpen
      />

      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./2");
          }}
          form=""
          color="secondary"
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form-estate" color="primary" onClick={confirmApplication}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
