import React, { useState } from "react";

import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";
import { determineAppType } from "@helpers/determineAppType";

import { postInsuranceTravelAPI } from "@api/userAPI";

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

  const addDataLabeled = determineType("Travel", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      await postInsuranceTravelAPI(appData);
      router.push("/dashboard/insurance");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="InsuranceTravel.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceTravel.title")}</Typography>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <Typography variant="h6">{t("Basic.summary")}</Typography>

      <SummaryList
        header={t("Basic.summary")}
        // @ts-ignore
        array={addDataLabeled}
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
