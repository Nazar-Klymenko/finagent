import React, { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import determineType from "@helpers/determineType";

import { postInsuranceSpecialistAPI } from "@api/userAPI";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import ProgressBar from "@components/ProgressBar";
import SummaryList from "@components/SummaryList";
import Table from "@components/Table";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/layout";

import { ButtonsWrap, Page, Title } from "../LocalStyles";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { appData } = useData();
  useTitle("Summary | FinAgent");

  const appDataLabeled = determineType("HealthSpecialist", appData);

  console.log(appDataLabeled);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      await postInsuranceSpecialistAPI(appData);
      history.push("/dashboard/insurances");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label={t("Basic.summary")} />

        <Spacer />
        <Table
          header={t("Basic.summary")}
          applicationType="InsuranceDiagnostic.Page1"
          object={Object.entries(appData.insuranceSpecialist?.personalData)}
        />

        {/* <SummaryList
          header={t("Basic.summary")}
          array={appDataLabeled}
          defaultOpen

        /> */}

        {/* {Object.entries(appData.insuranceSpecialist?.personalData).map(
          (row, idx) => (
            <>
              <span key={idx}>{t(`InsuranceDiagnostic.Page1.${row[0]}`)}</span>
              <span key={idx}>{t(`InsuranceDiagnostic.Page1.${row[1]}`)}</span>
            </>
          )
        )}

        <pre>
          {JSON.stringify(appData.insuranceSpecialist.personalData, null, 2)}
        </pre> */}

        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./2");
            }}
          />
          <MuiButton
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

const Spacer = styled.div`
  width: 100%;
  height: 32px;
`;
