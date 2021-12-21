import { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import determineType from "@helpers/determineType";

import { postInsuranceBorderAPI } from "@api/userAPI";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import ProgressBar from "@components/ProgressBar";
import SummaryList from "@components/SummaryList";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";

import { ButtonsWrap, Page, Title } from "../LocalStyles";

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
          <MuiButton
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./3");
            }}
          />
          <MuiButton
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
