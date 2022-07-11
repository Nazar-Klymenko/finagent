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
import {
  Autocomplete,
  Checkbox,
  DateInput,
  Input,
  Radio,
  Select,
} from "@components/input";
import { PageContainer } from "@components/layout";

import { pageThreeSchema } from "./helpers/schema";

type FormTypes = {
  vehicleType: string;
  vehicleTypeOther: string;
  enginePower: string;
  engineVolume: string;
  fuelType: string;
  steeringWheel: string;
  transmissionType: string;
  purchaseYear: Date | null;
  kilometrage: string;
  techExamDate: Date | null;
  vehicleRegDate: Date | null;
  polandRegDate: Date | null;
  abroadImport: boolean;
};

const Page3 = () => {
  const { t } = i18next;
  const { appData, setValues, setCurrentPage } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.specificData;

  const methods = useForm<FormTypes>({
      defaultValues: {
        vehicleType: appDataValid.vehicleType,
        vehicleTypeOther: appDataValid.vehicleTypeOther,
        enginePower: appDataValid.enginePower,
        engineVolume: appDataValid.engineVolume,
        fuelType: appDataValid.fuelType,
        steeringWheel: appDataValid.steeringWheel,
        transmissionType: appDataValid.transmissionType,
        abroadImport: appDataValid.abroadImport,
        purchaseYear: appDataValid.purchaseYear,
        kilometrage: appDataValid.kilometrage,
        techExamDate: appDataValid.techExamDate,
        vehicleRegDate: appDataValid.vehicleRegDate,
        polandRegDate: appDataValid.polandRegDate,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,

      resolver: yupResolver(pageThreeSchema),
    }),
    { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    console.log(data);
    setValues(data, "insuranceTransport", "specificData");
    setCurrentPage(4);
    router.push("./4");
  });

  const abroadImport = watch("abroadImport");
  const vehicleType = watch("vehicleType");
  return (
    <PageContainer xs title={t("insuranceTransport.title")}>
      <Typography variant="h4">{t("insuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={3}
        label={t("insuranceTransport.Page3.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTransport.Page3.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Select
          name="vehicleType"
          defaultValue={appDataValid.vehicleType}
          labelName={t("insuranceTransport.Page2.vehicleType")}
          options={[
            t("insuranceTransport.SelectVehicle.motorcycle"),
            t("insuranceTransport.SelectVehicle.personal"),
            t("insuranceTransport.SelectVehicle.truck"),
            t("insuranceTransport.SelectVehicle.bus"),
            t("insuranceTransport.SelectVehicle.otherVehicle"),
          ]}
        />
        {vehicleType === t("insuranceTransport.SelectVehicle.otherVehicle") && (
          <Input
            name="vehicleTypeOther"
            labelName={t("insuranceTransport.Page2.vehicleType")}
            type="text"
          />
        )}
        <Select
          name="fuelType"
          labelName={t("insuranceTransport.Page3.fuelType")}
          options={[
            t("insuranceTransport.SelectFuel.petrol"),
            t("insuranceTransport.SelectFuel.gas"),
            t("insuranceTransport.SelectFuel.diesel"),
            t("insuranceTransport.SelectFuel.propane"),
            t("insuranceTransport.SelectFuel.electric"),
          ]}
        />
        <Input
          name="enginePower"
          labelName={t("insuranceTransport.Page3.enginePower")}
          type="text"
          placeholder="150"
        />
        <Input
          name="engineVolume"
          labelName={t("insuranceTransport.Page3.engineVolume")}
          type="text"
          placeholder="1500"
        />

        <DateInput
          name="vehicleRegDate"
          labelName={t("insuranceTransport.Page3.vehicleRegDate")}
          placeholder={t("Form.Placeholder.dateFull")}
          disableFuture
          autoComplete="off"
        />
        <DateInput
          name="techExamDate"
          labelName={t("insuranceTransport.Page3.techExamDate")}
          placeholder={t("Form.Placeholder.dateFull")}
          autoComplete="off"
        />

        <DateInput
          name="purchaseYear"
          labelName={t("insuranceTransport.Page3.purchaseYear")}
          placeholder={t("Form.Placeholder.dateYear")}
          view={["year"]}
          format="yyyy"
          disableFuture
          autoComplete="off"
        />

        <Input
          name="kilometrage"
          labelName={t("insuranceTransport.Page3.kilometrage")}
          placeholder="eg. 100000"
        />

        {vehicleType !== t("insuranceTransport.SelectVehicle.motorcycle") && (
          <Radio
            labelName={t("insuranceTransport.Page3.steeringWheel")}
            name="steeringWheel"
            options={[
              {
                label: t("insuranceTransport.Page3.left"),
                value: "left",
              },
              {
                label: t("insuranceTransport.Page3.right"),
                value: "right",
              },
            ]}
          />
        )}

        <Radio
          name="transmissionType"
          labelName={t("insuranceTransport.Page3.transmissionType")}
          options={[
            {
              label: t("insuranceTransport.Page3.mechanical"),
              value: "mechanical",
            },
            {
              label: t("insuranceTransport.Page3.automatic"),
              value: "automatic",
            },
          ]}
        />
        <Checkbox
          labelName={t("insuranceTransport.Page3.gasInstalation")}
          name="gasInstalation"
        />
        <Checkbox
          labelName={t("insuranceTransport.Page3.abroadImport")}
          name="abroadImport"
        />
        {abroadImport && (
          <DateInput
            name="polandRegDate"
            labelName={t("insuranceTransport.Page3.polandRegDate")}
            placeholder={t("Form.Placeholder.dateFull")}
            disableFuture
            autoComplete="off"
          />
        )}
      </Form>
      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./2");
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

export default Page3;
