import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageTwoSchema } from "./applicationHelpers/insuranceBorderSchema";

import { vehicleTypeOptions } from "./applicationHelpers/insuranceBorderOptions";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { Input, SelectInput } from "@components/input";
import ContentWrap from "@components/content/ContentWrap";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();
  useTitle("Border insurance | FinAgent");

  const appDataValid = validateAppData(appData, "VehicleData");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      vehicleType: appDataValid.vehicleType,
      brand: appDataValid.brand,
      model: appDataValid.model,
      regNumber: appDataValid.regNumber,
      vinNumber: appDataValid.vinNumber,
      engineNumber: appDataValid.engineNumber,
      engineVolume: appDataValid.engineVolume,
      seatNumber: appDataValid.seatNumber,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "VehicleData");
    setCurrentPage(3);
    history.push("./3");
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar maxSteps={3} currentStep={2} label="Vehicle Info" />
        <Subtitle>{t("InsuranceBorder.Page2.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <SelectInput
            ref={register}
            name="vehicleType"
            defaultValue={appDataValid.vehicleType}
            labelName={t("InsuranceBorder.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
            error={!!errors.vehicleType}
            helperText={errors?.vehicleType?.message}
          />
          <Input
            ref={register}
            name="brand"
            labelName={t("InsuranceBorder.Page2.brand")}
            error={!!errors.brand}
            helperText={errors?.brand?.message}
          />
          <Input
            ref={register}
            name="model"
            labelName={t("InsuranceBorder.Page2.model")}
            error={!!errors.model}
            helperText={errors?.model?.message}
          />
          <Input
            ref={register}
            name="regNumber"
            labelName={t("InsuranceBorder.Page2.regNumber")}
            error={!!errors.regNumber}
            helperText={errors?.regNumber?.message}
          />
          <Input
            ref={register}
            name="vinNumber"
            labelName={t("InsuranceBorder.Page2.vinNumber")}
            error={!!errors.vinNumber}
            helperText={errors?.vinNumber?.message}
          />
          <Input
            ref={register}
            name="engineNumber"
            labelName={t("InsuranceBorder.Page2.engineNumber")}
            error={!!errors.engineNumber}
            helperText={errors?.engineNumber?.message}
          />
          <Input
            ref={register}
            name="engineVolume"
            labelName={t("InsuranceBorder.Page2.engineVolume")}
            error={!!errors.engineVolume}
            helperText={errors?.engineVolume?.message}
          />
          <SelectInput
            ref={register}
            name="seatNumber"
            labelName={t("InsuranceBorder.Page2.seatNumber")}
            defaultValue={appDataValid.seatNumber}
            optionArray={["2", "5", "6+"]}
            error={!!errors.seatNumber}
            helperText={errors?.seatNumber?.message}
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
