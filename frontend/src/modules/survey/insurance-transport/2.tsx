import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import withAuthForm from "@helpers/withAuthForm";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormBuilder from "@components/FormBuilder";
import ProgressBar from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Autocomplete, Checkbox, DateInput, Input } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageTwoSchema } from "./helpers/schema";

type FormTypes = {
  registeredPoland: boolean;
  brand: string;
  model: string;
  version: string;
  regNumber: string;
  vinNumber: string;
  yearManufacture: Date | null;
};

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.transportData;

  const methods = useForm<FormTypes>({
      defaultValues: {
        registeredPoland: appDataValid.registeredPoland,
        brand: appDataValid.brand,
        model: appDataValid.model,
        version: appDataValid.version,
        regNumber: appDataValid.regNumber,
        vinNumber: appDataValid.vinNumber,
        yearManufacture: appDataValid.yearManufacture,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,
      resolver: yupResolver(pageTwoSchema),
    }),
    { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    console.log(data);
    setValues(data, "insuranceTransport", "transportData");
    setCurrentPage(3);
    router.push("./3");
  });

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={2}
        label={t("InsuranceTransport.Page2.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceTransport.Page2.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Autocomplete
          name="brand"
          defaultValue={appDataValid.brand}
          labelName={t("InsuranceTransport.Page2.brand")}
          options={
            [
              "Abarth",
              "Alfa Romeo",
              "Aston Martin",
              "Audi",
              "Bentley",
              "BMW",
              "Bugatti",
              "Cadillac",
              "Chevrolet",
              "Chrysler",
              "Citroën",
              "Dacia",
              "Daewoo",
              "Daihatsu",
              "Dodge",
              "Donkervoort",
              "DS",
              "Ferrari",
              "Fiat",
              "Fisker",
              "Ford",
              "Honda",
              "Hummer",
              "Hyundai",
              "Infiniti",
              "Iveco",
              "Jaguar",
              "Jeep",
              "Kia",
              "KTM",
              "Lada",
              "Lamborghini",
              "Lancia",
              "Land Rover",
              "Landwind",
              "Lexus",
              "Lotus",
              "Maserati",
              "Maybach",
              "Mazda",
              "McLaren",
              "Mercedes-Benz",
              "MG",
              "Mini",
              "Mitsubishi",
              "Morgan",
              "Nissan",
              "Opel",
              "Peugeot",
              "Porsche",
              "Renault",
              "Rolls-Royce",
              "Rover",
              "Saab",
              "Seat",
              "Skoda",
              "Smart",
              "SsangYong",
              "Subaru",
              "Suzuki",
              "Tesla",
              "Toyota",
              "Volkswagen",
              "Volvo",
            ] as unknown as { label: string }[]
          }
        />

        <Input name="model" labelName={t("InsuranceTransport.Page2.model")} />
        <Input
          name="version"
          optional
          labelName={t("InsuranceTransport.Page2.version")}
        />
        <Input
          name="regNumber"
          labelName={t("InsuranceTransport.Page2.regNumber")}
        />
        <Input
          name="vinNumber"
          labelName={t("InsuranceTransport.Page2.vinNumber")}
        />
        <DateInput
          name="yearManufacture"
          labelName={t("InsuranceTransport.Page2.yearManufacture")}
          placeholder={t("Form.Placeholder.dateYear")}
          view={["year"]}
          format="yyyy"
          disableFuture
          autoComplete="off"
        />

        <Checkbox
          labelName={t("InsuranceTransport.Page2.registeredPoland")}
          name="registeredPoland"
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
        <Button form="form-transport" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;
