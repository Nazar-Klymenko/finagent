import React, { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import determineType from "@helpers/determineType";

import { postInsuranceMedicalAPI } from "@api/userAPI";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import ProgressBar from "@components/ProgressBar";
import SummaryList from "@components/SummaryList";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";

import { ButtonsWrap, Page, Title } from "../LocalStyles";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();
  useTitle("Summary | FinAgent");

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
      history.push("/dashboard/insurances");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
        <SummaryList
          header={t("Basic.summary")}
          array={addDataLabeled}
          defaultOpen
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./2");
            }}
          />
          <CTA
            text={t("Basic.buttonConfirm")}
            form=""
            color="primary"
            onClick={confirmApplication}
            isLoading={isLoading}
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Summary;
