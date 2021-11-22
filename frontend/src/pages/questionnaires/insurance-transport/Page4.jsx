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
import { ContentWrap } from "@components/content";
import { MuiSelect, SelectInput } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageFourValues } from "./applicationHelpers/defaultValues";
import { securityOptions } from "./applicationHelpers/insuranceCarOptions";
import { parkingPlaceOptions } from "./applicationHelpers/insuranceCarOptions";
import { usePurposeOptions } from "./applicationHelpers/insuranceCarOptions";
import { useAbroadOptions } from "./applicationHelpers/insuranceCarOptions";
import { predictMileageOptions } from "./applicationHelpers/insuranceCarOptions";
import { pageFourSchema } from "./applicationHelpers/validationSchema";

const Page4 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceTransport",
    "additionalData"
  );

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: pageFourValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageFourSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "insuranceTransport", "additionalData");
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
