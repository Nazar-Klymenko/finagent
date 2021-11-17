import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { pageTwoSchema } from "./applicationHelpers/validationSchema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { MuiInput, MuiCheckbox, DateInput } from "@components/input";
import ContentWrap from "@components/content/ContentWrap";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageTwoValues } from "./applicationHelpers/defaultValues";

import { QuestState } from "@dev/QuestState";

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

  const { handleSubmit, errors, control } = useForm({
    defaultValues: pageTwoValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "transportData");
    setCurrentPage(3);
    history.push("./3");
  };

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
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
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
