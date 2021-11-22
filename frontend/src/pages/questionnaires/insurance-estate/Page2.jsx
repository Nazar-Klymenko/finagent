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
import { MuiInput, MuiRadio } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoSchema } from "./applicationHelpers/insuranceEstateSchema";

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Real estate insurance | FinAgent");
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceEstate",
    "personalData"
  );

  const {
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {
      policyholderIs: appDataValid.policyholderIs || "individual",
      name: appDataValid.name,
      surname: appDataValid.surname,
      pesel: appDataValid.pesel,
      phone: appDataValid.phone,
      email: appDataValid.email,
      peopleNumber: appDataValid.peopleNumber || "0",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const policyholderIs = watch("policyholderIs") || "individual";

  const formSubmit = (data) => {
    setValues(data, "insuranceEstate", "personalData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceEstate.Page2.title")}
        />
        <Subtitle>{t("InsuranceEstate.Page2.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiRadio
            control={control}
            name="policyholderIs"
            legend={t("InsuranceEstate.Page2.policyholderIs")}
            options={[
              {
                label: t("InsuranceEstate.Page2.individual"),
                value: "individual",
              },
              {
                label: t("InsuranceEstate.Page2.legal"),
                value: "legal",
              },
              {
                label: t("InsuranceEstate.Page2.firm"),
                value: "firm",
              },
            ]}
          />
          {policyholderIs !== "legal" && (
            <>
              <MuiInput
                control={control}
                name="name"
                labelName={t("InsuranceEstate.Page2.name")}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <MuiInput
                control={control}
                name="surname"
                labelName={t("InsuranceEstate.Page2.surname")}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
              />
              <MuiInput
                control={control}
                name="pesel"
                labelName={t("InsuranceEstate.Page2.pesel")}
                error={!!errors.pesel}
                helperText={errors?.pesel?.message}
              />
            </>
          )}

          {policyholderIs !== "individual" && (
            <>
              <MuiInput
                control={control}
                name="firmName"
                labelName={t("InsuranceEstate.Page2.firmName")}
                error={!!errors.firmName}
                helperText={errors?.firmName?.message}
              />
              <MuiInput
                control={control}
                name="nip"
                labelName={t("InsuranceEstate.Page2.nip")}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
              />
              <MuiInput
                control={control}
                name="regon"
                labelName={t("InsuranceEstate.Page2.regon")}
                error={!!errors.regon}
                helperText={errors?.regon?.message}
              />
            </>
          )}

          <MuiInput
            control={control}
            name="phone"
            labelName={t("InsuranceEstate.Page2.phone")}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <MuiInput
            control={control}
            name="email"
            labelName={t("InsuranceEstate.Page2.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

          <MuiRadio
            control={control}
            name="peopleNumber"
            legend={t("InsuranceEstate.Page2.peopleNumber")}
            options={[
              {
                label: "0",
                value: "0",
              },
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
              {
                label: "4+",
                value: "4+",
              },
            ]}
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
