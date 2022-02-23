import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";
import { determineAppType } from "@helpers/determineAppType";

import { postInsuranceSpecialistAPI } from "@api/userAPI";

import { useData } from "@context/dataContext";

import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
// import Table from "@components/Table";
import { Button } from "@components/buttons";
import { PageContainer } from "@components/layout";

const Summary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();

  const appDataLabeled = determineType("HealthSpecialist", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      await postInsuranceSpecialistAPI(appData);
      router.push("/dashboard/insurance");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceDiagnostic.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <Typography variant="h4">{t("Basic.summary")}</Typography>
      {/* 
      <Table
        header={t("Basic.summary")}
        applicationType="InsuranceDiagnostic.Page1"
        object={Object.entries(appData.insuranceSpecialist?.personalData)}
      /> */}

      {/* <SummaryList
          header={t("Basic.summary")}
          array={appDataLabeled}
          defaultOpen

        /> */}

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
