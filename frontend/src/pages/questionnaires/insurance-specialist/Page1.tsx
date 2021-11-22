import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageOneSchema } from "./applicationHelpers/insurance-specialist.schema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import {
  MuiInput,
  MuiRadio,
  DateInput,
  MuiPhoneInput,
} from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

type FormTypes = {
  insuranceStart: Date;
  insuranceEnd: Date;
  policyholderIs: string;
  name: string;
  surname: string;
  birthDate: Date;
  nip: string;
  pesel: string;
  regon: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Specialists access | FinAgent");
  const history = useHistory();

  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = validateAppData(
    appData,
    "insuranceSpecialist",
    "personalData"
  );

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      insuranceStart: appDataValid.insuranceStart,
      insuranceEnd: appDataValid.insuranceEnd,
      policyholderIs: appDataValid.policyholderIs || "individual",
      name: appDataValid.name,
      surname: appDataValid.surname,
      nip: appDataValid.nip,
      birthDate: appDataValid.birthDate,
      pesel: appDataValid.pesel,
      regon: appDataValid.regon,
      phoneNumber: appDataValid.phoneNumber,
      email: appDataValid.email,
      country: appDataValid.country,
      city: appDataValid.city,
      postIndex: appDataValid.postIndex,
      street: appDataValid.street,
      houseNumber: appDataValid.houseNumber,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(pageOneSchema()),
  });

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceSpecialist", "personalData");
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceDiagnostic.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceDiagnostic.Page1.subtitle")}</Subtitle>
        <Form id="form" onSubmit={formSubmit}>
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceDiagnostic.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            disablePast
            placeholder=""
          />
          <DateInput
            control={control}
            name="insuranceEnd"
            labelName={t("InsuranceDiagnostic.Page1.insuranceEnd")}
            error={!!errors.insuranceEnd}
            helperText={errors?.insuranceEnd?.message}
            disablePast
            view={["year", "month", "date"]}
            placeholder=""
            openTo="year"
          />

          <MuiRadio
            control={control}
            name="policyholderIs"
            legend={t("InsuranceDiagnostic.Page1.policyholderIs")}
            options={[
              {
                label: t("InsuranceDiagnostic.Page1.individual"),
                value: "individual",
              },
              {
                label: t("InsuranceDiagnostic.Page1.firm"),
                value: "firm",
              },
              {
                label: t("InsuranceDiagnostic.Page1.legal"),
                value: "legal",
              },
            ]}
          />
          <MuiInput
            control={control}
            name="name"
            labelName={t("InsuranceDiagnostic.Page1.name")}
            type="text"
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
          />
          {policyholderIs === "individual" && (
            <MuiInput
              control={control}
              name="surname"
              labelName={t("InsuranceDiagnostic.Page1.surname")}
              type="text"
              error={!!errors.surname}
              helperText={errors?.surname?.message}
              autoComplete="family-name"
            />
          )}
          {!(policyholderIs === "individual") && (
            <MuiInput
              control={control}
              name="nip"
              labelName={t("InsuranceDiagnostic.Page1.nip")}
              type="text"
              error={!!errors.nip}
              helperText={errors?.nip?.message}
            />
          )}
          {policyholderIs === "individual" && (
            <DateInput
              control={control}
              name="birthDate"
              labelName={t("InsuranceDiagnostic.Page1.birthDate")}
              error={!!errors.birthDate}
              helperText={errors?.birthDate?.message}
              disableFuture
              placeholder=""
              view={["year", "month", "date"]}
              openTo="year"
            />
          )}
          {policyholderIs === "individual" && (
            <MuiInput
              control={control}
              name="pesel"
              labelName={t("InsuranceDiagnostic.Page1.pesel")}
              type="text"
              error={!!errors.pesel}
              helperText={errors?.pesel?.message}
            />
          )}
          {!(policyholderIs === "individual") && (
            <MuiInput
              control={control}
              name="regon"
              labelName={t("InsuranceDiagnostic.Page1.regon")}
              type="text"
              error={!!errors.regon}
              helperText={errors?.regon?.message}
            />
          )}
          <MuiPhoneInput
            control={control}
            name="phoneNumber"
            labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <MuiInput
            control={control}
            name="email"
            labelName={t("InsuranceDiagnostic.Page1.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <MuiInput
            control={control}
            name="country"
            labelName={t("InsuranceDiagnostic.Page1.country")}
            type="text"
            error={!!errors.country}
            helperText={errors?.country?.message}
          />
          <MuiInput
            control={control}
            name="city"
            labelName={t("InsuranceDiagnostic.Page1.city")}
            type="text"
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <MuiInput
            control={control}
            name="postIndex"
            labelName={t("InsuranceDiagnostic.Page1.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
          />
          <MuiInput
            control={control}
            name="street"
            labelName={t("InsuranceDiagnostic.Page1.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <MuiInput
            control={control}
            name="houseNumber"
            labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
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
