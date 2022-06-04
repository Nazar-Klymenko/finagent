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
import { Input, Radio, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { insurancePeriodOptions } from "./helpers/options";
import { pageOneSchema } from "./helpers/schema";

type FormTypes = {
  documentType: string;
  pesel: string;
  passportNumber: string;
  registeredNotInEU: string;
  insurancePeriod: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceBorder.insuranceData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      pesel: appDataValid.pesel,
      passportNumber: appDataValid.passportNumber,
      insurancePeriod: appDataValid.insurancePeriod,
      registeredNotInEU: appDataValid.registeredNotInEU,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const documentTypeName = watch("documentType") || appDataValid.documentType;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "insuranceData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title={t("insuranceBorder.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceBorder.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={1}
        label={t("insuranceBorder.Page1.subtitle")}
      />
      <Typography variant="h6">
        {t("insuranceBorder.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Radio
          name="documentType"
          labelName={t("insuranceBorder.Page1.documentType")}
          options={[
            {
              label: t("insuranceBorder.Page1.pesel"),
              value: "pesel",
            },
            {
              label: t("insuranceBorder.Page1.passportNumber"),
              value: "passportNumber",
            },
          ]}
          defaultValue={appDataValid.documentType || "pesel"}
        />
        {!(documentTypeName === "passportNumber") && (
          <Input name="pesel" labelName={t("insuranceBorder.Page1.pesel")} />
        )}
        {documentTypeName === "passportNumber" && (
          <Input
            name="passportNumber"
            labelName={t("insuranceBorder.Page1.passportNumber")}
          />
        )}

        <Radio
          name="registeredNotInEU"
          labelName={t("insuranceBorder.Page1.registeredNotInEU")}
          options={[
            {
              label: t("Basic.no"),
              value: "no",
            },
            {
              label: t("Basic.yes"),
              value: "yes",
            },
          ]}
        />
        <Select
          name="insurancePeriod"
          labelName={t("insuranceBorder.Page1.insurancePeriod")}
          defaultValue={appDataValid.insurancePeriod}
          options={insurancePeriodOptions}
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
