import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { Input, RadioGroup, PhoneInput, DateInput } from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageTwoSchema } from "./applicationHelpers/insuranceTravelSchema";

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
    mode: "onBlur",
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
      <Page>
        <Title>{t("InsuranceTravel.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Personal Info" />
        <Subtitle>{t("InsuranceTravel.Page2.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <RadioGroup
            name="policyholderIs"
            ref={register}
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
          <Input
            name="name"
            labelName={t("InsuranceTravel.Page2.name")}
            ref={register}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          {policyholderIs !== "legal" && (
            <>
              <Input
                name="surname"
                labelName={t("InsuranceTravel.Page2.surname")}
                ref={register}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
              />
              <Input
                name="pesel"
                labelName={t("InsuranceTravel.Page2.pesel")}
                ref={register}
                error={!!errors.pesel}
                helperText={errors?.pesel?.message}
              />
            </>
          )}
          {policyholderIs !== "natural" && (
            <>
              <Input
                name="nip"
                labelName={t("InsuranceTravel.Page2.nip")}
                ref={register}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
              />
              <Input
                name="regon"
                labelName={t("InsuranceTravel.Page2.regon")}
                ref={register}
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
          <Input
            name="email"
            labelName={t("InsuranceTravel.Page2.email")}
            ref={register}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <Input
            name="country"
            labelName={t("InsuranceTravel.Page2.country")}
            ref={register}
            error={!!errors.country}
            helperText={errors?.country?.message}
          />
          <Input
            name="city"
            labelName={t("InsuranceTravel.Page2.city")}
            ref={register}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <Input
            name="postIndex"
            labelName={t("InsuranceTravel.Page2.postIndex")}
            ref={register}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
          />
          <Input
            name="street"
            labelName={t("InsuranceTravel.Page2.street")}
            ref={register}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <Input
            name="houseNumber"
            labelName={t("InsuranceTravel.Page2.houseNumber")}
            ref={register}
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
