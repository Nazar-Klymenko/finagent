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
import { CTA } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import { DateInput, MuiCheckbox, MuiInput } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoValues } from "./applicationHelpers/default-values";
import { pageTwoSchema } from "./applicationHelpers/insurance-transport.schema";

type FormTypes = {
  registeredPoland: boolean;
  brand: string;
  model: string;
  version: string;
  regNumber: string;
  vinNumber: string;
  yearManufacture: Date;
};

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData?.insuranceTransport?.transportData;

  const methods = useForm<FormTypes>({
    defaultValues: pageTwoValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "transportData");
    setCurrentPage(3);
    history.push("./3");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={2}
          label={t("InsuranceTransport.Page2.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page2.subtitle")}</Subtitle>
        <FormProvider {...methods}>
          <Form id="form" onSubmit={formSubmit}>
            <MuiInput
              name="brand"
              labelName={t("InsuranceTransport.Page2.brand")}
              type="text"
            />
            <MuiInput
              name="model"
              labelName={t("InsuranceTransport.Page2.model")}
              type="text"
            />
            <MuiInput
              name="version"
              labelName={t("InsuranceTransport.Page2.version")}
              type="text"
            />
            <MuiInput
              name="regNumber"
              labelName={t("InsuranceTransport.Page2.regNumber")}
              type="text"
            />
            <MuiInput
              name="vinNumber"
              labelName={t("InsuranceTransport.Page2.vinNumber")}
              type="text"
            />
            <DateInput
              name="yearManufacture"
              labelName={t("InsuranceTransport.Page2.yearManufacture")}
              placeholder={t("Form.Placeholder.dateYear")}
              view={["year"]}
              format="yyyy"
              disableFuture
            />

            <MuiCheckbox
              labelName={t("InsuranceTransport.Page2.registeredPoland")}
              name="registeredPoland"
            />
          </Form>
        </FormProvider>

        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
