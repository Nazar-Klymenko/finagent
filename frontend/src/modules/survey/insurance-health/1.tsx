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
import { Checkbox, DateInput, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-health.schema";
import { clauseOnePriceOptions } from "./helpers/options";
import { clauseTwoPriceOptions } from "./helpers/options";
import { clauseThreePriceOptions } from "./helpers/options";

type FormTypes = {
  insuranceStart: Date;
  insuranceEnd: Date;
  clauseOne: boolean;
  clauseTwo: boolean;
  clauseThree: boolean;
  clauseOnePrice: string;
  clauseTwoPrice: string;
  clauseThreePrice: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceHealth?.insuranceData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      clauseOne: true,
      clauseTwo: appDataValid?.clauseTwo,
      clauseThree: appDataValid?.clauseThree,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(pageOneSchema()),
  });
  const { handleSubmit, watch } = methods;

  let showTwoAmount = watch("clauseTwo");
  let showThreeAmount = watch("clauseThree");

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceHealth", "insuranceData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title="InsuranceHealth.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceHealth.title")}</Typography>

      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("InsuranceHealth.Page1.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceHealth.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <DateInput
          name="insuranceStart"
          labelName={t("InsuranceHealth.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <DateInput
          name="insuranceEnd"
          labelName={t("InsuranceHealth.Page1.insuranceEnd")}
          placeholder={t("Form.Placeholder.dateFull")}
          disablePast
        />
        <Typography variant="body1">
          {t("InsuranceHealth.Page1.riskType")}
        </Typography>
        <Checkbox
          name="clauseOne"
          readOnly={true}
          defaultChecked={true}
          labelName={t("InsuranceHealth.Page1.clauseOne")}
        />
        <Select
          name="clauseOnePrice"
          labelName={t("InsuranceHealth.Page1.chooseAmountEuro")}
          options={clauseOnePriceOptions}
          placeholder="Amount:"
        />
        <Checkbox
          name="clauseTwo"
          labelName={t("InsuranceHealth.Page1.clauseTwo")}
        />
        {showTwoAmount && (
          <Select
            name="clauseTwoPrice"
            labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
            options={clauseTwoPriceOptions}
            placeholder="Amount:"
          />
        )}
        <Checkbox
          name="clauseThree"
          labelName={t("InsuranceHealth.Page1.clauseThree")}
        />
        {showThreeAmount && (
          <Select
            name="clauseThreePrice"
            labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
            options={clauseThreePriceOptions}
            placeholder="Amount:"
          />
        )}
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
