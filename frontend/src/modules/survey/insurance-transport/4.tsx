import React from "react";

import { useRouter } from "next/router";

// import { QuestState } from "@helpers/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import withAuthForm from "@helpers/withAuthForm";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageFourSchema } from "./helpers/schema";

type FormTypes = {
  predictMileage: string;
  useAbroad: string;
  usePurpose: string;
  parkingPlace: string;
  security: string;
};

const Page4 = () => {
  const { t } = i18next;
  const { appData, setValues, setCurrentPage, setAllowSummary } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.additionalData;

  const methods = useForm<FormTypes>({
      defaultValues: {
        predictMileage: appDataValid.predictMileage,
        useAbroad: appDataValid.useAbroad,
        usePurpose: appDataValid.usePurpose,
        parkingPlace: appDataValid.parkingPlace,
        security: appDataValid.security,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,

      resolver: yupResolver(pageFourSchema),
    }),
    { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    console.log(data);
    setValues(data, "insuranceTransport", "additionalData");
    setCurrentPage(5);
    router.push("./5");
  });

  return (
    <PageContainer xs title={t("insuranceTransport.title")}>
      <Typography variant="h4">{t("insuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={4}
        label={t("insuranceTransport.Page4.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTransport.Page4.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Select
          name="predictMileage"
          labelName={t("insuranceTransport.Page4.predictMileage")}
          options={[
            "< 5 000",
            "5 001 - 7 500",
            "7 501 - 10 000",
            "10 001 - 12 500",
            "12 501 - 15 000",
            "15 001 - 17 500",
            "17 501 - 20 000",
            "20 001 - 22 500",
            "22 501 - 25 000",
            "25 001 - 30 000",
            "30 001 - 35 000",
            "35 001 - 40 000",
            "40 001 - 45 000",
            "45 001 - 100 000",
            "> 100 000",
          ]}
        />
        <Select
          name="useAbroad"
          labelName={t("insuranceTransport.Page4.useAbroad")}
          options={[
            t("insuranceTransport.SelectAbroad.noUse"),
            t("insuranceTransport.SelectAbroad.twoWeeks"),
            t("insuranceTransport.SelectAbroad.month"),
            t("insuranceTransport.SelectAbroad.month2"),
            t("insuranceTransport.SelectAbroad.month6"),
            t("insuranceTransport.SelectAbroad.year"),
          ]}
        />
        <Select
          name="usePurpose"
          labelName={t("insuranceTransport.Page4.usePurpose")}
          options={[
            t("insuranceTransport.SelectPurpose.regular"),
            t("insuranceTransport.SelectPurpose.taxi"),
            t("insuranceTransport.SelectPurpose.rent"),
            t("insuranceTransport.SelectPurpose.lease"),
            t("insuranceTransport.SelectPurpose.bank"),
            t("insuranceTransport.SelectPurpose.course"),
          ]}
        />
        <Select
          name="parkingPlace"
          labelName={t("insuranceTransport.Page4.parkingPlace")}
          options={[
            t("insuranceTransport.SelectParking.individual"),
            t("insuranceTransport.SelectParking.shared"),
            t("insuranceTransport.SelectParking.guarded"),
            t("insuranceTransport.SelectParking.fenced"),
            t("insuranceTransport.SelectParking.unsecured"),
          ]}
        />
        <Select
          name="security"
          labelName={t("insuranceTransport.Page4.security")}
          options={[
            t("insuranceTransport.SelectSecurity.alarm"),
            t("insuranceTransport.SelectSecurity.immob"),
            t("insuranceTransport.SelectSecurity.alarmImmob"),
            t("insuranceTransport.SelectSecurity.alarmImmonOther"),
            t("insuranceTransport.SelectSecurity.other"),
            t("insuranceTransport.SelectSecurity.none"),
          ]}
        />
      </Form>
      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./3");
          }}
          form=""
          color="secondary"
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form-transport" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page4;
