import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { determineType } from "@helpers/determineType";

import { postInsuranceMedicalAPI } from "@api/userAPI";

import { useData } from "@context/dataContext";

import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
import { Button } from "@components/buttons";
import { PageContainer } from "@components/layout";

const Summary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();

  const addDataLabeled = determineType(
    "HealthMedical",
    appData.insuranceHealth
  );

  const confirmApplication = async () => {
    delete appData.insuranceHealth.InsuranceData.clauseOne;
    delete appData.insuranceHealth.InsuranceData.clauseTwo;
    delete appData.insuranceHealth.InsuranceData.clauseThree;
    setIsLoading(true);
    try {
      await postInsuranceMedicalAPI(appData.insuranceHealth);
      router.push("/dashboard/insurance");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="InsuranceHealth.title">
      <Typography variant="h4">{t("InsuranceHealth.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        array={addDataLabeled}
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
        <Button
          form=""
          color="primary"
          onClick={confirmApplication}
          isLoading={isLoading}
        >
          {t("Basic.buttonConfirm")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
