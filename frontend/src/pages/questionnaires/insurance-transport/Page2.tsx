import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import { DateInput, MuiCheckbox, MuiInput } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoValues } from "./applicationHelpers/default-values";
import { pageTwoSchema } from "./applicationHelpers/validation.schema";

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

  const appDataValid = validateAppData(
    appData,
    "insuranceTransport",
    "transportData"
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: pageTwoValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

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
        <Form id="form" onSubmit={formSubmit}>
          <MuiInput
            control={control}
            name="brand"
            labelName={t("InsuranceTransport.Page2.brand")}
            type="text"
            error={!!errors.brand}
            helperText={errors?.brand?.message}
          />
          <MuiInput
            control={control}
            name="model"
            labelName={t("InsuranceTransport.Page2.model")}
            type="text"
            error={!!errors.model}
            helperText={errors?.model?.message}
          />
          <MuiInput
            control={control}
            name="version"
            labelName={t("InsuranceTransport.Page2.version")}
            type="text"
            error={!!errors.version}
            helperText={errors?.version?.message}
          />
          <MuiInput
            control={control}
            name="regNumber"
            labelName={t("InsuranceTransport.Page2.regNumber")}
            type="text"
            error={!!errors.regNumber}
            helperText={errors?.regNumber?.message}
          />
          <MuiInput
            control={control}
            name="vinNumber"
            labelName={t("InsuranceTransport.Page2.vinNumber")}
            type="text"
            error={!!errors.vinNumber}
            helperText={errors?.vinNumber?.message}
          />
          <DateInput
            control={control}
            name="yearManufacture"
            labelName={t("InsuranceTransport.Page2.yearManufacture")}
            error={!!errors.yearManufacture}
            helperText={errors?.yearManufacture?.message}
            placeholder={t("Form.Placeholder.dateYear")}
            view={["year"]}
            format="yyyy"
          />

          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page2.registeredPoland")}
            name="registeredPoland"
          />
        </Form>
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
