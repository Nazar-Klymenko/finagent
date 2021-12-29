import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
} from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insurance-specialist.schema";

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
  const appDataValid = appData?.insuranceSpecialist?.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      insuranceStart: appDataValid?.insuranceStart || undefined,
      insuranceEnd: appDataValid?.insuranceEnd || undefined,
      policyholderIs: appDataValid?.policyholderIs || "individual",
      name: appDataValid?.name || "",
      surname: appDataValid?.surname || "",
      nip: appDataValid?.nip || "",
      birthDate: appDataValid?.birthDate || undefined,
      pesel: appDataValid?.pesel || "",
      regon: appDataValid?.regon || "",
      phoneNumber: appDataValid?.phoneNumber || "",
      email: appDataValid?.email || "",
      country: appDataValid?.country || "",
      city: appDataValid?.city || "",
      postIndex: appDataValid?.postIndex || "",
      street: appDataValid?.street || "",
      houseNumber: appDataValid?.houseNumber || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema()),
  });

  const { handleSubmit, watch } = methods;

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceSpecialist", "personalData");
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceDiagnostic.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceDiagnostic.Page1.subtitle")}</Subtitle>

        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <DateInput
            name="insuranceStart"
            labelName={t("InsuranceDiagnostic.Page1.insuranceStart")}
            disablePast
            placeholder={t("Form.Placeholder.dateFull")}
          />
          <DateInput
            name="insuranceEnd"
            labelName={t("InsuranceDiagnostic.Page1.insuranceEnd")}
            disablePast
            view={["year", "month", "date"]}
            placeholder={t("Form.Placeholder.dateFull")}
            openTo="year"
          />

          <MuiRadio
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
            name="name"
            labelName={t("InsuranceDiagnostic.Page1.name")}
            type="text"
            autoComplete="given-name"
          />
          {policyholderIs === "individual" && (
            <MuiInput
              name="surname"
              labelName={t("InsuranceDiagnostic.Page1.surname")}
              type="text"
              autoComplete="family-name"
            />
          )}
          {!(policyholderIs === "individual") && (
            <MuiInput
              name="nip"
              labelName={t("InsuranceDiagnostic.Page1.nip")}
              type="text"
            />
          )}
          {policyholderIs === "individual" && (
            <DateInput
              name="birthDate"
              labelName={t("InsuranceDiagnostic.Page1.birthDate")}
              disableFuture
              placeholder={t("Form.Placeholder.dateFull")}
              view={["year", "month", "date"]}
              openTo="year"
            />
          )}
          {policyholderIs === "individual" && (
            <MuiInput
              name="pesel"
              labelName={t("InsuranceDiagnostic.Page1.pesel")}
              type="text"
            />
          )}
          {!(policyholderIs === "individual") && (
            <MuiInput
              name="regon"
              labelName={t("InsuranceDiagnostic.Page1.regon")}
              type="text"
            />
          )}
          <MuiPhoneInput
            name="phoneNumber"
            labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
          />
          <MuiInput
            name="email"
            labelName={t("InsuranceDiagnostic.Page1.email")}
          />
          <MuiInput
            name="country"
            labelName={t("InsuranceDiagnostic.Page1.country")}
            type="text"
          />
          <MuiInput
            name="city"
            labelName={t("InsuranceDiagnostic.Page1.city")}
            type="text"
          />
          <MuiInput
            name="postIndex"
            labelName={t("InsuranceDiagnostic.Page1.postIndex")}
          />
          <MuiInput
            name="street"
            labelName={t("InsuranceDiagnostic.Page1.street")}
          />
          <MuiInput
            name="houseNumber"
            labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
          />
        </Form>
        <ButtonsWrap>
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
