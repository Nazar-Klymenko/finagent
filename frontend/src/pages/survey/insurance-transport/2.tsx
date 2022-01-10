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
import { DateInput, MuiCheckbox, Input } from "@components/input";
import ContentWrap from "@components/layout/ContentWrap";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoValues } from "../../../helpers/applicationHelpers/default-values";
import { pageTwoSchema } from "../../../helpers/applicationHelpers/insurance-transport.schema";

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
    <ContentWrap>
      <QuestState data={appData} />
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={2}
          label={t("InsuranceTransport.Page2.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page2.subtitle")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <Input
            name="brand"
            labelName={t("InsuranceTransport.Page2.brand")}
            type="text"
          />
          <Input
            name="model"
            labelName={t("InsuranceTransport.Page2.model")}
            type="text"
          />
          <Input
            name="version"
            labelName={t("InsuranceTransport.Page2.version")}
            type="text"
          />
          <Input
            name="regNumber"
            labelName={t("InsuranceTransport.Page2.regNumber")}
            type="text"
          />
          <Input
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
