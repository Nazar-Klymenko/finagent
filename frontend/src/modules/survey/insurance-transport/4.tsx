import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import withAuthForm from "@helpers/withAuthForm";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormBuilder from "@components/FormBuilder";
import ProgressBar from "@components/ProgressBar";
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
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
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
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={4}
        label={t("InsuranceTransport.Page4.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceTransport.Page4.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Select
          name="predictMileage"
          labelName={t("InsuranceTransport.Page4.predictMileage")}
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
          labelName={t("InsuranceTransport.Page4.useAbroad")}
          options={[
            t("InsuranceTransport.SelectAbroad.noUse"),
            t("InsuranceTransport.SelectAbroad.twoWeeks"),
            t("InsuranceTransport.SelectAbroad.month"),
            t("InsuranceTransport.SelectAbroad.month2"),
            t("InsuranceTransport.SelectAbroad.month6"),
            t("InsuranceTransport.SelectAbroad.year"),
          ]}
        />
        <Select
          name="usePurpose"
          labelName={t("InsuranceTransport.Page4.usePurpose")}
          options={[
            t("InsuranceTransport.SelectPurpose.regular"),
            t("InsuranceTransport.SelectPurpose.taxi"),
            t("InsuranceTransport.SelectPurpose.rent"),
            t("InsuranceTransport.SelectPurpose.lease"),
            t("InsuranceTransport.SelectPurpose.bank"),
            t("InsuranceTransport.SelectPurpose.course"),
          ]}
        />
        <Select
          name="parkingPlace"
          labelName={t("InsuranceTransport.Page4.parkingPlace")}
          options={[
            t("InsuranceTransport.SelectParking.individual"),
            t("InsuranceTransport.SelectParking.shared"),
            t("InsuranceTransport.SelectParking.guarded"),
            t("InsuranceTransport.SelectParking.fenced"),
            t("InsuranceTransport.SelectParking.unsecured"),
          ]}
        />
        <Select
          name="security"
          labelName={t("InsuranceTransport.Page4.security")}
          options={[
            t("InsuranceTransport.SelectSecurity.alarm"),
            t("InsuranceTransport.SelectSecurity.immob"),
            t("InsuranceTransport.SelectSecurity.alarmImmob"),
            t("InsuranceTransport.SelectSecurity.alarmImmonOther"),
            t("InsuranceTransport.SelectSecurity.other"),
            t("InsuranceTransport.SelectSecurity.none"),
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
