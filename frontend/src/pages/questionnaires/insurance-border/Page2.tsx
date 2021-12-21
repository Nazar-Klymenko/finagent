import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import { MuiInput, MuiSelect } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoSchema } from "./applicationHelpers/insurance-border.schema";
import { vehicleTypeOptions } from "./applicationHelpers/options";
import { seatNumberOptions } from "./applicationHelpers/options";

type FormTypes = {
  vehicleType: string;
  brand: string;
  model: string;
  regNumber: string;
  vinNumber: string;
  engineNumber: string;
  engineVolume: string;
  seatNumber: string;
};

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();
  useTitle("Border insurance | FinAgent");

  const appDataValid = appData.insuranceBorder?.vehicleData;
  const methods = useForm<FormTypes>({
    defaultValues: {
      vehicleType: appDataValid?.vehicleType,
      brand: appDataValid?.brand,
      model: appDataValid?.model,
      regNumber: appDataValid?.regNumber,
      vinNumber: appDataValid?.vinNumber,
      engineNumber: appDataValid?.engineNumber,
      engineVolume: appDataValid?.engineVolume,
      seatNumber: appDataValid?.seatNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "vehicleData");
    setCurrentPage(3);
    history.push("./3");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={2}
          label={t("InsuranceBorder.Page2.subtitle")}
        />
        <Subtitle>{t("InsuranceBorder.Page2.subtitle")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiSelect
            name="vehicleType"
            labelName={t("InsuranceBorder.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
          />
          <MuiInput name="brand" labelName={t("InsuranceBorder.Page2.brand")} />
          <MuiInput name="model" labelName={t("InsuranceBorder.Page2.model")} />
          <MuiInput
            name="regNumber"
            labelName={t("InsuranceBorder.Page2.regNumber")}
          />
          <MuiInput
            name="vinNumber"
            labelName={t("InsuranceBorder.Page2.vinNumber")}
          />
          <MuiInput
            name="engineNumber"
            labelName={t("InsuranceBorder.Page2.engineNumber")}
          />
          <MuiInput
            name="engineVolume"
            labelName={t("InsuranceBorder.Page2.engineVolume")}
          />
          <MuiSelect
            name="seatNumber"
            labelName={t("InsuranceBorder.Page2.seatNumber")}
            optionArray={seatNumberOptions}
          />
        </Form>
        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
