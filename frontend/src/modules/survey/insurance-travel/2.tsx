import React from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { DateInput, Input, MuiPhoneInput, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageTwoSchema } from "./helpers/insurance-travel.schema";

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
  const router = useRouter();
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = appData.insuranceTravel.personalData;

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
    router.push("./summary");
  });

  return (
    <PageContainer xs title="InsuranceTravel.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceTravel.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("InsuranceTravel.Page2.title")}
      />
      <Typography variant="h6">{t("InsuranceTravel.Page2.title")}</Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Radio
          name="policyholderIs"
          labelName={t("InsuranceTravel.Page2.policyholderIs")}
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
        <Input name="name" labelName={t("InsuranceTravel.Page2.name")} />
        {policyholderIs !== "legal" && (
          <>
            <Input
              name="surname"
              labelName={t("InsuranceTravel.Page2.surname")}
            />
            <Input name="pesel" labelName={t("InsuranceTravel.Page2.pesel")} />
          </>
        )}
        {policyholderIs !== "natural" && (
          <>
            <Input name="nip" labelName={t("InsuranceTravel.Page2.nip")} />
            <Input name="regon" labelName={t("InsuranceTravel.Page2.regon")} />
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
        <Input name="email" labelName={t("InsuranceTravel.Page2.email")} />
        <Input name="country" labelName={t("InsuranceTravel.Page2.country")} />
        <Input name="city" labelName={t("InsuranceTravel.Page2.city")} />
        <Input
          name="postIndex"
          labelName={t("InsuranceTravel.Page2.postIndex")}
        />
        <Input name="street" labelName={t("InsuranceTravel.Page2.street")} />
        <Input
          name="houseNumber"
          labelName={t("InsuranceTravel.Page2.houseNumber")}
        />
      </Form>

      <FormBuilder.ButtonsWrap multiple>
        <Button
          form=""
          color="secondary"
          onClick={() => {
            router.push("./1");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;
