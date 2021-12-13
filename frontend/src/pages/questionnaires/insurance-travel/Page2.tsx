import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
} from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoSchema } from "./applicationHelpers/insurance-travel.schema";

type FormTypes = {
  policyholderIs: string;
  name: string;
  surname: string;
  birthDate: string;
  pesel: string;
  nip: string;
  regon: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
};

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Travel insurance | FinAgent");
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = validateAppData(appData, "PersonalData");

  const methods = useForm<FormTypes>({
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
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const { handleSubmit, watch } = methods;

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "PersonalData");
    setAllowSummary(true);
    history.push("./summary");
  });

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
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiRadio
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
            defaultValue={appDataValid.policyholderIs || "natural"}
          />
          <MuiInput name="name" labelName={t("InsuranceTravel.Page2.name")} />
          {policyholderIs !== "legal" && (
            <>
              <MuiInput
                name="surname"
                labelName={t("InsuranceTravel.Page2.surname")}
              />
              <MuiInput
                name="pesel"
                labelName={t("InsuranceTravel.Page2.pesel")}
              />
            </>
          )}
          {policyholderIs !== "natural" && (
            <>
              <MuiInput name="nip" labelName={t("InsuranceTravel.Page2.nip")} />
              <MuiInput
                name="regon"
                labelName={t("InsuranceTravel.Page2.regon")}
              />
            </>
          )}
          {policyholderIs !== "entrepreneurial" && (
            <DateInput
              name="birthDate"
              labelName={t("InsuranceTravel.Page2.birthDate")}
              placeholder={t("Form.Placeholder.dateFull")}
            />
          )}
          <MuiPhoneInput
            name="phone"
            labelName={t("InsuranceTravel.Page2.phone")}
          />
          <MuiInput name="email" labelName={t("InsuranceTravel.Page2.email")} />
          <MuiInput
            name="country"
            labelName={t("InsuranceTravel.Page2.country")}
          />
          <MuiInput name="city" labelName={t("InsuranceTravel.Page2.city")} />
          <MuiInput
            name="postIndex"
            labelName={t("InsuranceTravel.Page2.postIndex")}
          />
          <MuiInput
            name="street"
            labelName={t("InsuranceTravel.Page2.street")}
          />
          <MuiInput
            name="houseNumber"
            labelName={t("InsuranceTravel.Page2.houseNumber")}
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
