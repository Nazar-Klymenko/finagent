import React, { useState } from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page, Title, ButtonsWrap } from "../LocalStyles";
import ContentWrap from "@components/content/ContentWrap";
import ProgressBar from "@components/ProgressBar";

import SummaryList from "@components/SummaryList";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";

import determineType from "@helpers/determineType";
import { postLoanMortgageAPI } from "@api/userAPI";
import { QuestState } from "@dev/QuestState";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("Mortgage", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    delete appData.LoanData.conditions;
    try {
      await postLoanMortgageAPI(appData);
      history.push("/dashboard/loans");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanMortgage.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />
        <SummaryList
          header={t("Basic.summary")}
          array={addDataLabeled}
          defaultOpen
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./2");
            }}
          />
          <CTA
            text={t("Basic.buttonNext")}
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
