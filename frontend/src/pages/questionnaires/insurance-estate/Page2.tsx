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
import { MuiInput, MuiRadio } from "@components/input";
import { ContentWrap } from "@components/layout";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageTwoSchema } from "./applicationHelpers/insurance-estate.schema";

type FormTypes = {
  policyholderIs: string;
  name: string;
  surname: string;
  pesel: string;
  firmName: string;
  nip: string;
  regon: string;
  phone: string;
  email: string;
  peopleNumber: string;
};

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Real estate insurance | FinAgent");
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.insuranceEstate?.personalData;

  const methods = useForm<FormTypes>({
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
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageTwoSchema),
  });
  const { handleSubmit, watch } = methods;
  const policyholderIs = watch("policyholderIs", "individual");

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceEstate", "personalData");
    setAllowSummary(true);
    history.push("./summary");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceEstate.Page2.title")}
        />
        <Subtitle>{t("InsuranceEstate.Page2.title")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiRadio
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
                name="name"
                labelName={t("InsuranceEstate.Page2.name")}
              />
              <MuiInput
                name="surname"
                labelName={t("InsuranceEstate.Page2.surname")}
              />
              <MuiInput
                name="pesel"
                labelName={t("InsuranceEstate.Page2.pesel")}
              />
            </>
          )}

          {policyholderIs !== "individual" && (
            <>
              <MuiInput
                name="firmName"
                labelName={t("InsuranceEstate.Page2.firmName")}
              />
              <MuiInput name="nip" labelName={t("InsuranceEstate.Page2.nip")} />
              <MuiInput
                name="regon"
                labelName={t("InsuranceEstate.Page2.regon")}
              />
            </>
          )}

          <MuiInput name="phone" labelName={t("InsuranceEstate.Page2.phone")} />
          <MuiInput name="email" labelName={t("InsuranceEstate.Page2.email")} />

          <MuiRadio
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
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
