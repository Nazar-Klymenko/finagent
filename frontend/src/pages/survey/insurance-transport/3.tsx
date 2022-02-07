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
import {
  Autocomplete,
  Checkbox,
  DateInput,
  Input,
  Radio,
  Select,
} from "@components/input";
import { PageContainer } from "@components/layout";

type FormTypes = {
  vehicleType: string;
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
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.specificData;

  const methods = useForm<FormTypes>({
      defaultValues: {
        vehicleType: appDataValid.vehicleType,
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
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={3}
        label={t("InsuranceTransport.Page3.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceTransport.Page3.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Autocomplete
          name="vehicleType"
          defaultValue={appDataValid.vehicleType}
          labelName={t("InsuranceTransport.Page2.vehicleType")}
          options={[
            t("InsuranceTransport.SelectVehicle.motorcycle"),
            t("InsuranceTransport.SelectVehicle.personal"),
            t("InsuranceTransport.SelectVehicle.truck"),
            t("InsuranceTransport.SelectVehicle.bus"),
          ]}
        />
        <Select
          name="fuelType"
          labelName={t("InsuranceTransport.Page3.fuelType")}
          options={[
            t("InsuranceTransport.SelectFuel.petrol"),
            t("InsuranceTransport.SelectFuel.gas"),
            t("InsuranceTransport.SelectFuel.diesel"),
            t("InsuranceTransport.SelectFuel.propane"),
            t("InsuranceTransport.SelectFuel.electric"),
          ]}
        />
        <Input
          name="enginePower"
          labelName={t("InsuranceTransport.Page3.enginePower")}
          type="text"
          placeholder="150"
        />
        <Input
          name="engineVolume"
          labelName={t("InsuranceTransport.Page3.engineVolume")}
          type="text"
          placeholder="1500"
        />

        <DateInput
          name="vehicleRegDate"
          labelName={t("InsuranceTransport.Page3.vehicleRegDate")}
          placeholder={t("Form.Placeholder.dateFull")}
          disableFuture
          autoComplete="off"
        />
        <DateInput
          name="techExamDate"
          labelName={t("InsuranceTransport.Page3.techExamDate")}
          placeholder={t("Form.Placeholder.dateFull")}
          autoComplete="off"
        />

        <DateInput
          name="purchaseYear"
          labelName={t("InsuranceTransport.Page3.purchaseYear")}
          placeholder={t("Form.Placeholder.dateYear")}
          view={["year"]}
          format="yyyy"
          disableFuture
          autoComplete="off"
        />

        <Input
          name="kilometrage"
          labelName={t("InsuranceTransport.Page3.kilometrage")}
          placeholder="eg. 100000"
        />

        {vehicleType !== t("InsuranceTransport.SelectVehicle.motorcycle") && (
          <Radio
            labelName={t("InsuranceTransport.Page3.steeringWheel")}
            name="steeringWheel"
            options={[
              {
                label: t("InsuranceTransport.Page3.left"),
                value: "left",
              },
              {
                label: t("InsuranceTransport.Page3.right"),
                value: "right",
              },
            ]}
          />
        )}

        <Radio
          name="transmissionType"
          labelName={t("InsuranceTransport.Page3.transmissionType")}
          options={[
            {
              label: t("InsuranceTransport.Page3.mechanical"),
              value: "mechanical",
            },
            {
              label: t("InsuranceTransport.Page3.automatic"),
              value: "automatic",
            },
          ]}
        />
        <Checkbox
          labelName={t("InsuranceTransport.Page3.gasInstalation")}
          name="gasInstalation"
        />
        <Checkbox
          labelName={t("InsuranceTransport.Page3.abroadImport")}
          name="abroadImport"
        />
        {abroadImport && (
          <DateInput
            name="polandRegDate"
            labelName={t("InsuranceTransport.Page3.polandRegDate")}
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

export default withAuthForm(Page3);

const pageThreeSchema = yup.object().shape({
  vehicleType: yup.string().required("Form.Error.blank"),
  enginePower: yup.string().required("Form.Error.blank"),
  engineVolume: yup.string().required("Form.Error.blank"),
  fuelType: yup.string().required("Form.Error.blank").nullable(),
  abroadImport: yup.boolean(),
  purchaseYear: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  kilometrage: yup.string().required("Form.Error.blank"),
  techExamDate: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  vehicleRegDate: yup
    .date()
    .required("Form.Error.missingDate")
    .nullable()
    .typeError("Form.Error.invalidDate"),
  polandRegDate: yup
    .date()
    .nullable()
    .when("abroadImport", {
      is: true,
      then: yup
        .date()
        .required("Form.Error.missingDate")
        .nullable()
        .typeError("Form.Error.invalidDate"),
    }),
});

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
