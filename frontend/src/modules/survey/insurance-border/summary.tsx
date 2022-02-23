import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();

  const appDataValid = appData.insuranceBorder;
  const addDataLabeled = determineAppType("insuranceBorder", appDataValid);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      const response = await postApplication("insraunce-border", appDataValid);

      // router.push("/dashboard/insurance");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="insuranceBorder.title">
      <QuestState data={appData} />

      <Typography variant="h6">{t("insuranceBorder.title")}</Typography>
      <ProgressBar maxSteps={3} currentStep={3} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        applicationType="insuranceBorder"
        array={addDataLabeled}
        defaultOpen
      />
      <FormBuilder.ButtonsWrap multiple>
        <Button
          color="secondary"
          form=""
          onClick={() => {
            router.push("./3");
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
