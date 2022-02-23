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
import { Checkbox, DateInput, Input, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-travel.schema";

type FormTypes = {
  insuranceType: string;
  insuranceStart: Date;
  insuranceEnd: Date;
  peopleAmount: string;
  destination: string;
  purpose: string;
  inPoland: boolean;
};

const Page1 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = appData?.InsuranceData?.InsuraceTravel;
  const router = useRouter();

  const methods = useForm<FormTypes>({
    defaultValues: {
      insuranceType: appDataValid?.insuranceType || "individual",
      insuranceStart: appDataValid?.insuranceStart,
      insuranceEnd: appDataValid?.insuranceEnd,
      peopleAmount: appDataValid?.peopleAmount,
      destination: appDataValid?.destination,
      purpose: appDataValid?.purpose,
      inPoland: appDataValid?.inPoland,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const choosedType = watch("insuranceType") || appDataValid.insuranceType;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "InsuranceData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title="InsuranceTravel.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceTravel.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("InsuranceTravel.Page1.title")}
      />
      <Typography variant="h6">{t("InsuranceTravel.Page1.title")}</Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <DateInput
          name="insuranceStart"
          labelName={t("InsuranceTravel.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <DateInput
          name="insuranceEnd"
          labelName={t("InsuranceTravel.Page1.insuranceEnd")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <Checkbox
          name="inPoland"
          labelName={t("InsuranceTravel.Page1.inPoland")}
        />

        <Radio
          name="insuranceType"
          labelName={t("InsuranceTravel.Page1.insuranceType")}
          options={[
            {
              label: t("InsuranceTravel.Page1.individual"),
              value: "individual",
            },
            {
              label: t("InsuranceTravel.Page1.family"),
              value: "family",
            },
            {
              label: t("InsuranceTravel.Page1.group"),
              value: "group",
            },
          ]}
        />
        {choosedType !== "individual" && (
          <Input
            name="peopleAmount"
            labelName={t("InsuranceTravel.Page1.peopleAmount")}
          />
        )}
        <Input
          name="destination"
          labelName={t("InsuranceTravel.Page1.destination")}
        />
        <Input name="purpose" labelName={t("InsuranceTravel.Page1.purpose")} />
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
