import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { determineAppType } from "@helpers/determineAppType";

import { postInsuranceEstateAPI } from "@api/userAPI";

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

  const addDataLabeled = determineType("Estate", appData.insuranceEstate);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      await postInsuranceEstateAPI(appData.insuranceEstate);
      router.push("/dashboard/insurance");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="InsuranceEstate.title">
      <Typography variant="h4">{t("InsuranceEstate.title")}</Typography>

      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        array={addDataLabeled}
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
        <Button form="form-estate" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
