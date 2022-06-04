import React from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Input, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageTwoSchema } from "./helpers/insurance-estate.schema";

type FormTypes = {
  policyholderIs: string;
  name: string;
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
  const router = useRouter();
  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.insuranceEstate?.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      policyholderIs: appDataValid.policyholderIs || "individual",
      name: appDataValid.name,
      pesel: appDataValid.pesel,
      phone: appDataValid.phone,
      email: appDataValid.email,
      peopleNumber: appDataValid.peopleNumber || "0",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageTwoSchema),
  });
  const { handleSubmit, watch } = methods;
  const policyholderIs = watch("policyholderIs", "individual");

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceEstate", "personalData");
    setAllowSummary(true);
    router.push("./summary");
  });

  return (
    <PageContainer xs title={t("insuranceEstate.title")}>
      <Typography variant="h4">{t("insuranceEstate.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("insuranceEstate.Page2.title")}
      />

      <Typography variant="h6" gutterBottom>
        {t("insuranceEstate.Page2.title")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Radio
          name="policyholderIs"
          labelName={t("insuranceEstate.Page2.policyholderIs")}
          options={[
            {
              label: t("insuranceEstate.Page2.individual"),
              value: "individual",
            },
            {
              label: t("insuranceEstate.Page2.legal"),
              value: "legal",
            },
            {
              label: t("insuranceEstate.Page2.firm"),
              value: "firm",
            },
          ]}
        />
        {policyholderIs !== "legal" && (
          <>
            <Input name="name" labelName={t("insuranceEstate.Page2.name")} />
            <Input name="pesel" labelName={t("insuranceEstate.Page2.pesel")} />
          </>
        )}

        {policyholderIs !== "individual" && (
          <>
            <Input
              name="firmName"
              labelName={t("insuranceEstate.Page2.firmName")}
            />
            <Input name="nip" labelName={t("insuranceEstate.Page2.nip")} />
            <Input name="regon" labelName={t("insuranceEstate.Page2.regon")} />
          </>
        )}

        <Input name="phone" labelName={t("insuranceEstate.Page2.phone")} />
        <Input name="email" labelName={t("insuranceEstate.Page2.email")} />

        <Radio
          name="peopleNumber"
          labelName={t("insuranceEstate.Page2.peopleNumber")}
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
      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./1");
          }}
          form=""
          color="secondary"
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
