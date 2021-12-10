import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { DateInput, MuiCheckbox, MuiInput, MuiRadio } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insuranceTravelSchema";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Travel insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = appData?.InsuranceData?.InsuraceTravel;
  const history = useHistory();

  const {
    handleSubmit,
    control,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      insuranceType: appDataValid?.insuranceType || "individual",
      insuranceStart: appDataValid?.insuranceStart,
      insuranceEnd: appDataValid?.insuranceEnd,
      peopleAmount: appDataValid?.peopleAmount,
      destination: appDataValid?.destination,
      purpose: appDataValid?.purpose,
      inPoland: appDataValid?.inPoland,
    },
    mode: "onChange",
    reValidateMode: "onChange",
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
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceTravel.Page1.title")}
        />
        <Subtitle>{t("InsuranceTravel.Page1.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceTravel.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            disablePast
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceTravel.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            disablePast
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
            <MuiInput
              control={control}
              name="peopleAmount"
              labelName={t("InsuranceTravel.Page1.peopleAmount")}
              error={!!errors.peopleAmount}
              helperText={errors?.peopleAmount?.message}
            />
          )}
          <MuiInput
            control={control}
            name="destination"
            labelName={t("InsuranceTravel.Page1.destination")}
            error={!!errors.destination}
            helperText={errors?.destination?.message}
          />
          <MuiInput
            control={control}
            name="purpose"
            labelName={t("InsuranceTravel.Page1.purpose")}
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
