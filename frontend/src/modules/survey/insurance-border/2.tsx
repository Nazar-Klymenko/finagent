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
import { Input, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { vehicleTypeOptions } from "./helpers/options";
import { seatNumberOptions } from "./helpers/options";
import { pageTwoSchema } from "./helpers/schema";

type FormTypes = {
  vehicleType: string;
  vehicleTypeOther: string;
  brand: string;
  model: string;
  regNumber: string;
  vinNumber: string;
  engineNumber: string;
  engineVolume: string;
  seatNumber: string;
};

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceBorder.vehicleData;
  const methods = useForm<FormTypes>({
    defaultValues: {
      vehicleType: appDataValid.vehicleType,
      vehicleTypeOther: appDataValid.vehicleTypeOther,
      brand: appDataValid.brand,
      model: appDataValid.model,
      regNumber: appDataValid.regNumber,
      vinNumber: appDataValid.vinNumber,
      engineNumber: appDataValid.engineNumber,
      engineVolume: appDataValid.engineVolume,
      seatNumber: appDataValid.seatNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageTwoSchema),
  });

  const { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "vehicleData");
    setCurrentPage(3);
    router.push("./3");
  });
  const vehicleType = watch("vehicleType");
  return (
    <PageContainer xs title={t("insuranceBorder.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceBorder.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={2}
        label={t("insuranceBorder.Page2.subtitle")}
      />
      <Typography variant="h6">
        {t("insuranceBorder.Page2.subtitle")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Select
          name="vehicleType"
          labelName={t("insuranceBorder.Page2.vehicleType")}
          options={vehicleTypeOptions(t)}
        />
        {vehicleType === t("insuranceTransport.SelectVehicle.otherVehicle") && (
          <Input
            name="vehicleTypeOther"
            labelName={t("insuranceTransport.Page2.vehicleType")}
            type="text"
          />
        )}

        <Input name="brand" labelName={t("insuranceBorder.Page2.brand")} />
        <Input name="model" labelName={t("insuranceBorder.Page2.model")} />
        <Input
          name="regNumber"
          labelName={t("insuranceBorder.Page2.regNumber")}
        />
        <Input
          name="vinNumber"
          labelName={t("insuranceBorder.Page2.vinNumber")}
        />
        <Input
          name="engineNumber"
          labelName={t("insuranceBorder.Page2.engineNumber")}
        />
        <Input
          name="engineVolume"
          labelName={t("insuranceBorder.Page2.engineVolume")}
        />
        <Select
          name="seatNumber"
          labelName={t("insuranceBorder.Page2.seatNumber")}
          options={seatNumberOptions}
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
