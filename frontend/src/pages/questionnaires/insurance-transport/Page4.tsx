import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiSelect } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageFourValues } from "./applicationHelpers/default-values";
import { pageFourSchema } from "./applicationHelpers/insurance-transport.schema";
import { securityOptions } from "./applicationHelpers/options";
import { parkingPlaceOptions } from "./applicationHelpers/options";
import { usePurposeOptions } from "./applicationHelpers/options";
import { useAbroadOptions } from "./applicationHelpers/options";
import { predictMileageOptions } from "./applicationHelpers/options";

type FormTypes = {
  predictMileage: string;
  useAbroad: string;
  usePurpose: string;
  parkingPlace: string;
  security: string;
};

const Page4 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData?.insuranceTransport?.additionalData;

  const methods = useForm<FormTypes>({
    defaultValues: pageFourValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageFourSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTransport", "additionalData");
    setCurrentPage(5);
    history.push("./5");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>

        <ProgressBar
          maxSteps={5}
          currentStep={4}
          label={t("InsuranceTransport.Page4.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page4.subtitle")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiSelect
            name="predictMileage"
            labelName={t("InsuranceTransport.Page4.predictMileage")}
            optionArray={predictMileageOptions}
          />
          <MuiSelect
            name="useAbroad"
            labelName={t("InsuranceTransport.Page4.useAbroad")}
            optionArray={useAbroadOptions}
          />
          <MuiSelect
            name="usePurpose"
            labelName={t("InsuranceTransport.Page4.usePurpose")}
            optionArray={usePurposeOptions}
          />
          <MuiSelect
            name="parkingPlace"
            labelName={t("InsuranceTransport.Page4.parkingPlace")}
            optionArray={parkingPlaceOptions}
          />
          <MuiSelect
            name="security"
            labelName={t("InsuranceTransport.Page4.security")}
            optionArray={securityOptions}
          />
        </Form>

        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./3");
            }}
          />
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page4;
