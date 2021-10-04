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

import { postInsuranceOcAPI } from "@api/userAPI";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";
import { QuestState } from "@dev/QuestState";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { appData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("OC", appData);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      appData.AppendedImages.filesTechPassport.forEach((file) => {
        formData.append("files", file, file.name);
      });
      appData.AppendedImages.filesPassport.forEach((file) => {
        formData.append("files", file, file.name);
      });
      appData.AppendedImages.filesInsurance.forEach((file) => {
        formData.append("files", file, file.name);
      });
      if (appData?.AppendedImages?.filesCarSale) {
        appData.AppendedImages.filesCarSale.forEach((file) => {
          formData.append("files", file, file.name);
        });
      }

      const entries = Object.entries(appData).filter(
        (entry) => entry[0] !== "AppendedImages"
      );

      formData.append(
        "information",
        JSON.stringify(Object.fromEntries(entries))
      );

      await postInsuranceOcAPI(formData);
      history.push("/dashboard/insurances");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setSnackbar("error", "could not send application"));
    }
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={5} label="Summary" />
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
              history.push("./5");
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
