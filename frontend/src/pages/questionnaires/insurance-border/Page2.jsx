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
import { MuiInput, MuiSelect } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { vehicleTypeOptions } from "./applicationHelpers/insuranceBorderOptions";
import { seatNumberOptions } from "./applicationHelpers/insuranceBorderOptions";
import { pageTwoSchema } from "./applicationHelpers/insuranceBorderSchema";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();
  useTitle("Border insurance | FinAgent");

  const appDataValid = validateAppData(
    appData,
    "insuranceBorder",
    "vehicleData"
  );

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
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
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "insuranceBorder", "vehicleData");
    setCurrentPage(3);
    history.push("./3");
  };

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
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiSelect
            control={control}
            name="vehicleType"
            defaultValue={appDataValid.vehicleType}
            labelName={t("InsuranceBorder.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
            error={!!errors.vehicleType}
            helperText={errors?.vehicleType?.message}
          />
          <MuiInput
            control={control}
            name="brand"
            labelName={t("InsuranceBorder.Page2.brand")}
            error={!!errors.brand}
            helperText={errors?.brand?.message}
          />
          <MuiInput
            control={control}
            name="model"
            labelName={t("InsuranceBorder.Page2.model")}
            error={!!errors.model}
            helperText={errors?.model?.message}
          />
          <MuiInput
            control={control}
            name="regNumber"
            labelName={t("InsuranceBorder.Page2.regNumber")}
            error={!!errors.regNumber}
            helperText={errors?.regNumber?.message}
          />
          <MuiInput
            control={control}
            name="vinNumber"
            labelName={t("InsuranceBorder.Page2.vinNumber")}
            error={!!errors.vinNumber}
            helperText={errors?.vinNumber?.message}
          />
          <MuiInput
            control={control}
            name="engineNumber"
            labelName={t("InsuranceBorder.Page2.engineNumber")}
            error={!!errors.engineNumber}
            helperText={errors?.engineNumber?.message}
          />
          <MuiInput
            control={control}
            name="engineVolume"
            labelName={t("InsuranceBorder.Page2.engineVolume")}
            error={!!errors.engineVolume}
            helperText={errors?.engineVolume?.message}
          />
          <MuiSelect
            control={control}
            name="seatNumber"
            labelName={t("InsuranceBorder.Page2.seatNumber")}
            defaultValue={appDataValid.seatNumber}
            optionArray={seatNumberOptions}
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
