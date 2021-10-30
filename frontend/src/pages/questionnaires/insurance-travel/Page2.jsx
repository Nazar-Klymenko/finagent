import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { MuiInput, MuiRadio, PhoneInput, DateInput } from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageTwoSchema } from "./applicationHelpers/insuranceTravelSchema";
import { QuestState } from "@dev/QuestState";

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Travel insurance | FinAgent");
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = validateAppData(appData, "PersonalData");

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      policyholderIs: appDataValid.policyholderIs || "natural",
      name: appDataValid.name,
      surname: appDataValid.surname,
      birthDate: appDataValid.birthDate,
      pesel: appDataValid.pesel,
      nip: appDataValid.nip,
      regon: appDataValid.regon,
      phone: appDataValid.phone,
      email: appDataValid.email,
      country: appDataValid.country,
      city: appDataValid.city,
      postIndex: appDataValid.postIndex,
      street: appDataValid.street,
      houseNumber: appDataValid.houseNumber,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = (data) => {
    setValues(data, "PersonalData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />
      <Page>
        <Title>{t("InsuranceTravel.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceTravel.Page2.title")}
        />
        <Subtitle>{t("InsuranceTravel.Page2.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiRadio
            control={control}
            name="policyholderIs"
            legend={t("InsuranceTravel.Page2.policyholderIs")}
            options={[
              {
                label: t("InsuranceTravel.Page2.natural"),
                value: "natural",
              },
              {
                label: t("InsuranceTravel.Page2.legal"),
                value: "legal",
              },
              {
                label: t("InsuranceTravel.Page2.entrepreneurial"),
                value: "entrepreneurial",
              },
            ]}
            defaultChecked={appDataValid.policyholderIs || "natural"}
          />
          <MuiInput
            control={control}
            name="name"
            labelName={t("InsuranceTravel.Page2.name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          {policyholderIs !== "legal" && (
            <>
              <MuiInput
                control={control}
                name="surname"
                labelName={t("InsuranceTravel.Page2.surname")}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
              />
              <MuiInput
                control={control}
                name="pesel"
                labelName={t("InsuranceTravel.Page2.pesel")}
                error={!!errors.pesel}
                helperText={errors?.pesel?.message}
              />
            </>
          )}
          {policyholderIs !== "natural" && (
            <>
              <MuiInput
                control={control}
                name="nip"
                labelName={t("InsuranceTravel.Page2.nip")}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
              />
              <MuiInput
                control={control}
                name="regon"
                labelName={t("InsuranceTravel.Page2.regon")}
                error={!!errors.regon}
                helperText={errors?.regon?.message}
              />
            </>
          )}
          {policyholderIs !== "entrepreneurial" && (
            <DateInput
              control={control}
              name="birthDate"
              labelName={t("InsuranceTravel.Page2.birthDate")}
              error={!!errors.birthDate}
              helperText={errors?.birthDate?.message}
            />
          )}
          <PhoneInput
            ref={register}
            name="phone"
            labelName={t("InsuranceTravel.Page2.phone")}
            type="tel"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <MuiInput
            control={control}
            name="email"
            labelName={t("InsuranceTravel.Page2.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <MuiInput
            control={control}
            name="country"
            labelName={t("InsuranceTravel.Page2.country")}
            error={!!errors.country}
            helperText={errors?.country?.message}
          />
          <MuiInput
            control={control}
            name="city"
            labelName={t("InsuranceTravel.Page2.city")}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <MuiInput
            control={control}
            name="postIndex"
            labelName={t("InsuranceTravel.Page2.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
          />
          <MuiInput
            control={control}
            name="street"
            labelName={t("InsuranceTravel.Page2.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <MuiInput
            control={control}
            name="houseNumber"
            labelName={t("InsuranceTravel.Page2.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
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
