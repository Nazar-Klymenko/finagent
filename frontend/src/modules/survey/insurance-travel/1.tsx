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
import { Checkbox, DateInput, Input, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-travel.schema";

type FormTypes = {
  insuranceType: string;
  insuranceStart: Date | null;
  insuranceEnd: Date | null;
  peopleAmount: string;
  destination: string;
  purpose: string;
  inPoland: boolean;
};

const Page1 = () => {
  const { t } = i18next;
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceTravel.insuranceData;
  const router = useRouter();

  const methods = useForm<FormTypes>({
    defaultValues: {
      insuranceType: appDataValid.insuranceType,
      insuranceStart: appDataValid.insuranceStart,
      insuranceEnd: appDataValid.insuranceEnd,
      peopleAmount: appDataValid.peopleAmount,
      destination: appDataValid.destination,
      purpose: appDataValid.purpose,
      inPoland: appDataValid.inPoland,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const choosedType = watch("insuranceType") || appDataValid.insuranceType;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTravel", "insuranceData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title={t("insuranceTravel.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceTravel.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("insuranceTravel.Page1.title")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTravel.Page1.title")}
      </Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <DateInput
          name="insuranceStart"
          labelName={t("insuranceTravel.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <DateInput
          name="insuranceEnd"
          labelName={t("insuranceTravel.Page1.insuranceEnd")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <Checkbox
          name="inPoland"
          labelName={t("insuranceTravel.Page1.inPoland")}
        />

        <Radio
          name="insuranceType"
          labelName={t("insuranceTravel.Page1.insuranceType")}
          options={[
            {
              label: t("insuranceTravel.Page1.individual"),
              value: "individual",
            },
            {
              label: t("insuranceTravel.Page1.family"),
              value: "family",
            },
            {
              label: t("insuranceTravel.Page1.group"),
              value: "group",
            },
          ]}
        />
        {choosedType !== "individual" && (
          <Input
            name="peopleAmount"
            labelName={t("insuranceTravel.Page1.peopleAmount")}
          />
        )}
        <Input
          name="destination"
          labelName={t("insuranceTravel.Page1.destination")}
        />
        <Input name="purpose" labelName={t("insuranceTravel.Page1.purpose")} />
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
