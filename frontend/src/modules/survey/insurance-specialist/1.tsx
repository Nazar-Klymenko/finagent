import React from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { DateInput, Input, MuiPhoneInput, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-specialist.schema";

type FormTypes = {
  insuranceStart: Date | null;
  insuranceEnd: Date | null;
  policyholderIs: string;
  name: string;
  companyName: string;
  birthDate: Date | null;
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
  const router = useRouter();

  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = appData?.insuranceSpecialist?.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      insuranceStart: appDataValid?.insuranceStart,
      insuranceEnd: appDataValid?.insuranceEnd,
      policyholderIs: appDataValid?.policyholderIs,
      name: appDataValid?.name,
      companyName: appDataValid?.companyName,
      nip: appDataValid?.nip,
      birthDate: appDataValid?.birthDate,
      pesel: appDataValid?.pesel,
      regon: appDataValid?.regon,
      phoneNumber: appDataValid?.phoneNumber,
      email: appDataValid?.email,
      country: appDataValid?.country,
      city: appDataValid?.city,
      postIndex: appDataValid?.postIndex,
      street: appDataValid?.street,
      houseNumber: appDataValid?.houseNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageOneSchema()),
  });

  const { handleSubmit, watch } = methods;

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceSpecialist", "personalData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title={t("insuranceSpecialist.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceSpecialist.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("insuranceSpecialist.Page1.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceSpecialist.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <DateInput
          name="insuranceStart"
          labelName={t("insuranceSpecialist.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <DateInput
          name="insuranceEnd"
          labelName={t("insuranceSpecialist.Page1.insuranceEnd")}
          disablePast
          view={["year", "month", "day"]}
          placeholder={t("Form.Placeholder.dateFull")}
          openTo="year"
        />

        <Radio
          name="policyholderIs"
          labelName={t("insuranceSpecialist.Page1.policyholderIs")}
          options={[
            {
              label: t("insuranceSpecialist.Page1.individual"),
              value: "individual",
            },
            {
              label: t("insuranceSpecialist.Page1.firm"),
              value: "firm",
            },
            {
              label: t("insuranceSpecialist.Page1.legal"),
              value: "legal",
            },
          ]}
        />

        {policyholderIs === "individual" ? (
          <Input
            name="name"
            labelName={t("insuranceSpecialist.Page1.name")}
            autoComplete="name"
          />
        ) : (
          <Input
            name="companyName"
            labelName={t("insuranceSpecialist.Page1.companyName")}
          />
        )}

        {!(policyholderIs === "individual") && (
          <Input
            name="nip"
            labelName={t("insuranceSpecialist.Page1.nip")}
            type="text"
          />
        )}
        {policyholderIs === "individual" && (
          <DateInput
            name="birthDate"
            labelName={t("insuranceSpecialist.Page1.birthDate")}
            disableFuture
            placeholder={t("Form.Placeholder.dateFull")}
            view={["year", "month", "day"]}
            openTo="year"
          />
        )}
        {policyholderIs === "individual" && (
          <Input
            name="pesel"
            labelName={t("insuranceSpecialist.Page1.pesel")}
            type="text"
          />
        )}
        {!(policyholderIs === "individual") && (
          <Input
            name="regon"
            labelName={t("insuranceSpecialist.Page1.regon")}
            type="text"
          />
        )}
        <MuiPhoneInput
          name="phoneNumber"
          labelName={t("insuranceSpecialist.Page1.phoneNumber")}
        />
        <Input name="email" labelName={t("insuranceSpecialist.Page1.email")} />
        <Input
          name="country"
          labelName={t("insuranceSpecialist.Page1.country")}
          type="text"
        />
        <Input
          name="city"
          labelName={t("insuranceSpecialist.Page1.city")}
          type="text"
        />
        <Input
          name="postIndex"
          labelName={t("insuranceSpecialist.Page1.postIndex")}
        />
        <Input
          name="street"
          labelName={t("insuranceSpecialist.Page1.street")}
        />
        <Input
          name="houseNumber"
          labelName={t("insuranceSpecialist.Page1.houseNumber")}
        />
      </Form>
      <FormBuilder.ButtonsWrap>
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page1;
