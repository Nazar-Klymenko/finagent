import React from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { useForm } from "react-hook-form";

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
  birthDate: Date | null;
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
  const { t } = i18next;
  const router = useRouter();
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = appData.insuranceTravel.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      policyholderIs: appDataValid.policyholderIs,
      name: appDataValid.name,
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
    shouldUnregister: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const { handleSubmit, watch } = methods;

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTravel", "personalData");
    setAllowSummary(true);
    router.push("./summary");
  });

  return (
    <PageContainer xs title={t("insuranceTravel.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceTravel.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("insuranceTravel.Page2.title")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTravel.Page2.title")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Radio
          name="policyholderIs"
          labelName={t("insuranceTravel.Page2.policyholderIs")}
          options={[
            {
              label: t("insuranceTravel.Page2.natural"),
              value: "natural",
            },
            {
              label: t("insuranceTravel.Page2.legal"),
              value: "legal",
            },
            {
              label: t("insuranceTravel.Page2.entrepreneurial"),
              value: "entrepreneurial",
            },
          ]}
          defaultValue={appDataValid.policyholderIs || "natural"}
        />
        <Input name="name" labelName={t("insuranceTravel.Page2.name")} />
        {policyholderIs !== "legal" && (
          <Input name="pesel" labelName={t("insuranceTravel.Page2.pesel")} />
        )}
        {policyholderIs !== "natural" && (
          <>
            <Input name="nip" labelName={t("insuranceTravel.Page2.nip")} />
            <Input name="regon" labelName={t("insuranceTravel.Page2.regon")} />
          </>
        )}
        {policyholderIs !== "entrepreneurial" && (
          <DateInput
            name="birthDate"
            labelName={t("insuranceTravel.Page2.birthDate")}
            placeholder={t("Form.Placeholder.dateFull")}
          />
        )}
        <MuiPhoneInput
          name="phone"
          labelName={t("insuranceTravel.Page2.phone")}
        />
        <Input name="email" labelName={t("insuranceTravel.Page2.email")} />
        <Input name="country" labelName={t("insuranceTravel.Page2.country")} />
        <Input name="city" labelName={t("insuranceTravel.Page2.city")} />
        <Input
          name="postIndex"
          labelName={t("insuranceTravel.Page2.postIndex")}
        />
        <Input name="street" labelName={t("insuranceTravel.Page2.street")} />
        <Input
          name="houseNumber"
          labelName={t("insuranceTravel.Page2.houseNumber")}
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
