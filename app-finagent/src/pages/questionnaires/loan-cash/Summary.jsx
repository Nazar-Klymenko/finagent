import React, { useState } from "react";

import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page, Title, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import ProgressBar from "@components/ProgressBar";

import SummaryList from "@components/SummaryList";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";

import determineType from "@helpers/determineType";
import { postLoanCashAPI } from "@api/userAPI";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
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
    <ContentWrap xl={true}>
      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Summary" />
        <SummaryList
          header={t("LoanCash.summary")}
          array={addDataLabeled}
          defaultOpen
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("LoanCash.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./2");
            }}
          />
          <CTA
            text={t("LoanCash.buttonNext")}
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
