import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { pageTwoSchema } from "./applicationHelpers/validationSchema";

import { vehicleTypeOptions } from "./applicationHelpers/insuranceCarOptions";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { Input, Checkbox, SelectInput } from "@components/input";
import ContentWrap from "@components/content/ContentWrap";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageTwoValues } from "./applicationHelpers/defaultValues";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");

  const appDataValid = validateAppData(appData, "TransportData");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: pageTwoValues(appDataValid),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "TransportData");
    setCurrentPage(3);
    history.push("./3");
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={2} label="Vehicle Info" />

        <Subtitle>{t("InsuranceTransport.Page2.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <SelectInput
            ref={register}
            name="vehicleType"
            defaultValue={appDataValid.vehicleType}
            labelName={t("InsuranceTransport.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
            error={!!errors.vehicleType}
            helperText={errors?.vehicleType?.message}
          />
          <Input
            ref={register}
            name="brand"
            labelName={t("InsuranceTransport.Page2.brand")}
            type="text"
            error={!!errors.brand}
            helperText={errors?.brand?.message}
          />
          <Input
            ref={register}
            name="model"
            labelName={t("InsuranceTransport.Page2.model")}
            type="text"
            error={!!errors.model}
            helperText={errors?.model?.message}
          />
          <Input
            ref={register}
            name="version"
            labelName={t("InsuranceTransport.Page2.version")}
            type="text"
            error={!!errors.version}
            helperText={errors?.version?.message}
          />
          <Input
            ref={register}
            name="regNumber"
            labelName={t("InsuranceTransport.Page2.regNumber")}
            type="text"
            error={!!errors.regNumber}
            helperText={errors?.regNumber?.message}
          />
          <Input
            ref={register}
            name="vinNumber"
            labelName={t("InsuranceTransport.Page2.vinNumber")}
            type="text"
            error={!!errors.vinNumber}
            helperText={errors?.vinNumber?.message}
          />
          <Input
            ref={register}
            name="yearManufacture"
            labelName={t("InsuranceTransport.Page2.yearManufacture")}
            type="text"
            error={!!errors.yearManufacture}
            helperText={errors?.yearManufacture?.message}
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page2.registeredPoland")}
            name="registeredPoland"
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("InsuranceTransport.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            text={t("InsuranceTransport.buttonNext")}
            form="form"
            color="primary"
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
