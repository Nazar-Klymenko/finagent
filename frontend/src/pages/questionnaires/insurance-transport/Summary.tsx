import React, { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import determineType from "@helpers/determineType";

import { postInsuranceOcAPI } from "@api/userAPI";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import { setSnackbar } from "@redux/alert/actions";

import ProgressBar from "@components/ProgressBar";
import SummaryList from "@components/SummaryList";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";

import { ButtonsWrap, Page, Title } from "../LocalStyles";

const Summary = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { appData, clearAppData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useTitle("Summary | FinAgent");

  const addDataLabeled = determineType("OC", appData.insuranceTransport);

  const confirmApplication = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      appData.insuranceTransport.AppendedImages.filesTechPassport.forEach(
        (file: File) => {
          formData.append("files", file, file.name);
        }
      );
      appData.insuranceTransport.AppendedImages.filesPassport.forEach(
        (file: File) => {
          formData.append("files", file, file.name);
        }
      );
      appData.insuranceTransport.AppendedImages.filesInsurance.forEach(
        (file: File) => {
          formData.append("files", file, file.name);
        }
      );
      if (appData?.insuranceTransport.AppendedImages?.filesCarSale) {
        appData.insuranceTransport.AppendedImages.filesCarSale.forEach(
          (file: File) => {
            formData.append("files", file, file.name);
          }
        );
      }

      const entries = Object.entries(appData.insuranceTransport).filter(
        (entry) => entry[0] !== "AppendedImages"
      );

      formData.append(
        "information",
        JSON.stringify(Object.fromEntries(entries))
      );

      await postInsuranceOcAPI(formData);
      // clearAppData();
      history.push("/dashboard/insurances");
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
        <ProgressBar maxSteps={5} currentStep={5} label={t("Basic.summary")} />
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
