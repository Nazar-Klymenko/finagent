import React from "react";
import useTitle from "@hooks/useTitle";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { Input, MuiCheckbox, DateInput, MuiRadio } from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";

import { pageOneSchema } from "./applicationHelpers/insuranceTravelSchema";
import { QuestState } from "@dev/QuestState";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Travel insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = validateAppData(appData, "InsuranceData");
  const history = useHistory();

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      insuranceType: appDataValid.insuranceType || "individual",
      peopleAmount: appDataValid.peopleAmount,
      destination: appDataValid.destination,
      purpose: appDataValid.purpose,
      inPoland: appDataValid.inPoland,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });

  const choosedType = watch("insuranceType") || appDataValid.insuranceType;

  const formSubmit = (data) => {
    setValues(data, "InsuranceData");
    setCurrentPage(2);
    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTravel.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={1} label="Insurance Info" />
        <Subtitle>{t("InsuranceTravel.Page1.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceTravel.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            defaultDate={appDataValid.insuranceStart}
            disablePastDates
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceTravel.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            defaultDate={appDataValid.insuranceEnd}
            disablePastDates
          />
          <MuiCheckbox
            control={control}
            name="inPoland"
            labelName={t("InsuranceTravel.Page1.inPoland")}
          />

          <MuiRadio
            control={control}
            name="insuranceType"
            legend={t("InsuranceTravel.Page1.insuranceType")}
            options={[
              {
                label: t("InsuranceTravel.Page1.individual"),
                value: "individual",
              },
              {
                label: t("InsuranceTravel.Page1.family"),
                value: "family",
              },
              {
                label: t("InsuranceTravel.Page1.group"),
                value: "group",
              },
            ]}
          />
          {choosedType !== "individual" && (
            <Input
              name="peopleAmount"
              labelName={t("InsuranceTravel.Page1.peopleAmount")}
              ref={register}
              error={!!errors.peopleAmount}
              helperText={errors?.peopleAmount?.message}
            />
          )}
          <Input
            name="destination"
            labelName={t("InsuranceTravel.Page1.destination")}
            ref={register}
            error={!!errors.destination}
            helperText={errors?.destination?.message}
          />
          <Input
            name="purpose"
            labelName={t("InsuranceTravel.Page1.purpose")}
            ref={register}
            error={!!errors.purpose}
            helperText={errors?.purpose?.message}
          />
        </Form>
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
