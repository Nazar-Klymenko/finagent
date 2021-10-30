import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { MuiSelect } from "@components/input";

import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageFourSchema } from "./applicationHelpers/validationSchema";
import { pageFourValues } from "./applicationHelpers/defaultValues";
import { QuestState } from "@dev/QuestState";

import { securityOptions } from "./applicationHelpers/insuranceCarOptions";
import { parkingPlaceOptions } from "./applicationHelpers/insuranceCarOptions";
import { usePurposeOptions } from "./applicationHelpers/insuranceCarOptions";
import { useAbroadOptions } from "./applicationHelpers/insuranceCarOptions";
import { predictMileageOptions } from "./applicationHelpers/insuranceCarOptions";

const Page4 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(appData, "AdditionalData");

  const history = useHistory();

  useTitle("Transport insurance | FinAgent");

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: pageFourValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageFourSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "AdditionalData");
    setCurrentPage(5);
    history.push("./5");
  };

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
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiSelect
            control={control}
            name="predictMileage"
            labelName={t("InsuranceTransport.Page4.predictMileage")}
            defaultValue={appDataValid.predictMileage}
            optionArray={predictMileageOptions}
            error={!!errors.predictMileage}
            helperText={errors?.predictMileage?.message}
          />
          <MuiSelect
            control={control}
            name="useAbroad"
            labelName={t("InsuranceTransport.Page4.useAbroad")}
            defaultValue={appDataValid.useAbroad}
            optionArray={useAbroadOptions}
            error={!!errors.useAbroad}
            helperText={errors?.useAbroad?.message}
          />
          <MuiSelect
            control={control}
            name="usePurpose"
            labelName={t("InsuranceTransport.Page4.usePurpose")}
            defaultValue={appDataValid.usePurpose}
            optionArray={usePurposeOptions}
            error={!!errors.usePurpose}
            helperText={errors?.usePurpose?.message}
          />
          <MuiSelect
            control={control}
            name="parkingPlace"
            labelName={t("InsuranceTransport.Page4.parkingPlace")}
            defaultValue={appDataValid.parkingPlace}
            optionArray={parkingPlaceOptions}
            error={!!errors.parkingPlace}
            helperText={errors?.parkingPlace?.message}
          />
          <MuiSelect
            control={control}
            name="security"
            labelName={t("InsuranceTransport.Page4.security")}
            defaultValue={appDataValid.security}
            optionArray={securityOptions}
            error={!!errors.security}
            helperText={errors?.security?.message}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./3");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page4;
