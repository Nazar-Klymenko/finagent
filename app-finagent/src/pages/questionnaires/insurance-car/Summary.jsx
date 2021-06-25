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

      console.log(appData.AppendedImages.files);

      appData.AppendedImages.files.forEach((file) => {
        formData.append("files", file, file.name);
      });

      // formData.append("files", appData.AppendedImages.files);

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
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={5} label="Summary" />
        <SummaryList
          header={t("InsuranceTransport.summary")}
          array={addDataLabeled}
          defaultOpen
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("InsuranceTransport.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./5");
            }}
          />
          <CTA
            text={t("InsuranceTransport.buttonConfirm")}
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
