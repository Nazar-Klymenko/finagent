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
import { Checkbox, DateInput, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-health.schema";
import { clauseOnePriceOptions } from "./helpers/options";
import { clauseTwoPriceOptions } from "./helpers/options";
import { clauseThreePriceOptions } from "./helpers/options";

type FormTypes = {
  insuranceStart: Date | null;
  insuranceEnd: Date | null;
  clauseOne: boolean;
  clauseTwo: boolean;
  clauseThree: boolean;
  clauseOnePrice: string;
  clauseTwoPrice: string;
  clauseThreePrice: string;
};

const Page1 = () => {
  const { t } = i18next;
  const router = useRouter();

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceHealth.insuranceData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      insuranceStart: appDataValid.insuranceStart,
      insuranceEnd: appDataValid.insuranceEnd,
      clauseOne: appDataValid.clauseOne,
      clauseTwo: appDataValid.clauseTwo,
      clauseThree: appDataValid.clauseThree,
      clauseOnePrice: appDataValid.clauseOnePrice,
      clauseTwoPrice: appDataValid.clauseTwoPrice,
      clauseThreePrice: appDataValid.clauseThreePrice,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: true,
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
    <PageContainer xs title={t("insuranceHealth.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceHealth.title")}</Typography>

      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("insuranceHealth.Page1.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceHealth.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form-health" onSubmit={formSubmit}>
        <DateInput
          name="insuranceStart"
          labelName={t("insuranceHealth.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <DateInput
          name="insuranceEnd"
          labelName={t("insuranceHealth.Page1.insuranceEnd")}
          placeholder={t("Form.Placeholder.dateFull")}
          disablePast
        />
        <Typography variant="body1">
          {t("insuranceHealth.Page1.riskType")}
        </Typography>
        <Checkbox
          name="clauseOne"
          readOnly={true}
          defaultChecked={true}
          labelName={t("insuranceHealth.Page1.clauseOne")}
        />
        <Select
          name="clauseOnePrice"
          labelName={t("insuranceHealth.Page1.chooseAmountEuro")}
          options={clauseOnePriceOptions}
          placeholder="Amount:"
        />
        <Checkbox
          name="clauseTwo"
          labelName={t("insuranceHealth.Page1.clauseTwo")}
        />
        {showTwoAmount && (
          <Select
            name="clauseTwoPrice"
            labelName={t("insuranceHealth.Page1.chooseAmountZlote")}
            options={clauseTwoPriceOptions}
            placeholder="Amount:"
          />
        )}
        <Checkbox
          name="clauseThree"
          labelName={t("insuranceHealth.Page1.clauseThree")}
        />
        {showThreeAmount && (
          <Select
            name="clauseThreePrice"
            labelName={t("insuranceHealth.Page1.chooseAmountZlote")}
            options={clauseThreePriceOptions}
            placeholder="Amount:"
          />
        )}
      </Form>
      <FormBuilder.ButtonsWrap>
        <Button form="form-health" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page1;
