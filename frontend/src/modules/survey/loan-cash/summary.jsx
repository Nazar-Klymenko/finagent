import React, { useState } from "react";

import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";
import { determineAppType } from "@helpers/determineAppType";

import { postLoanCashAPI } from "@api/userAPI";

import { useData } from "@context/dataContext";

import { ProgressBar } from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
import { Button } from "@components/buttons";
import { PageContainer } from "@components/layout";

import { ButtonsWrap, Page, Title } from "../LocalStyles";

const Summary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("Cash", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    delete appData.LoanData.conditions;
    try {
      await postLoanCashAPI(appData);
      history.push("/dashboard/loans");
      setIsLoading(true);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer xs title="">
      <QuestState data={appData} />

      <Title>{t("LoanCash.title")}</Title>
      <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
      <SummaryList
        header={t("Basic.summary")}
        array={addDataLabeled}
        defaultOpen
      />
      <FormBuilder.ButtonsWrap multiple>
        <Button
          text={t("Basic.buttonBack")}
          color="secondary"
          form=""
          onClick={() => {
            history.push("./2");
          }}
        />
        <Button
          text={t("Basic.buttonNext")}
          form=""
          color="primary"
          onClick={confirmApplication}
          isLoading={isLoading}
        />
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Summary;
