import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { Input, MuiRadio } from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";

import { pageTwoSchema } from "./applicationHelpers/insuranceEstateSchema";
import { QuestState } from "@dev/QuestState";

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Real estate insurance | FinAgent");
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = validateAppData(appData, "PersonalData");

  const { register, handleSubmit, errors, watch, control } = useForm({
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
    setValues(data, "PersonalData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Personal Info" />
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
              <Input
                name="name"
                labelName={t("InsuranceEstate.Page2.name")}
                ref={register}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <Input
                name="surname"
                labelName={t("InsuranceEstate.Page2.surname")}
                ref={register}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
              />
              <Input
                name="pesel"
                labelName={t("InsuranceEstate.Page2.pesel")}
                ref={register}
                error={!!errors.pesel}
                helperText={errors?.pesel?.message}
              />
            </>
          )}

          {policyholderIs !== "individual" && (
            <>
              <Input
                name="firmName"
                labelName={t("InsuranceEstate.Page2.firmName")}
                ref={register}
                error={!!errors.firmName}
                helperText={errors?.firmName?.message}
              />
              <Input
                name="nip"
                labelName={t("InsuranceEstate.Page2.nip")}
                ref={register}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
              />
              <Input
                name="regon"
                labelName={t("InsuranceEstate.Page2.regon")}
                ref={register}
                error={!!errors.regon}
                helperText={errors?.regon?.message}
              />
            </>
          )}

          <Input
            name="phone"
            labelName={t("InsuranceEstate.Page2.phone")}
            ref={register}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <Input
            name="email"
            labelName={t("InsuranceEstate.Page2.email")}
            ref={register}
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
