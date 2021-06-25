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
import { postInsuranceEstateAPI } from "@api/userAPI";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("Estate", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      await postInsuranceEstateAPI(appData);
      history.push("/dashboard/insurances");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Summary" />
        <SummaryList
          header={t("InsuranceEstate.summary")}
          array={addDataLabeled}
          defaultOpen
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("InsuranceEstate.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./2");
            }}
          />
          <CTA
            text={t("InsuranceEstate.buttonNext")}
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
