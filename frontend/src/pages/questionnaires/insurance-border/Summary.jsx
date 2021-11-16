import { useState } from "react";
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
import { postInsuranceBorderAPI } from "@api/userAPI";
import { QuestState } from "@dev/QuestState";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { appData, clearAppData } = useData();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("Border", appData.insuranceBorder);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      console.log(appData.insuranceBorder);
      await postInsuranceBorderAPI(appData.insuranceBorder);
      clearAppData();
      history.push("/dashboard/insurances");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar maxSteps={3} currentStep={3} label={t("Basic.summary")} />
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
              history.push("./3");
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
