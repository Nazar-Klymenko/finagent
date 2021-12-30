import React, { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import { DateInput, MuiCheckbox, MuiSelect } from "@components/input";
import { ContentWrap } from "@components/layout";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insurance-health.schema";
import { clauseOnePriceOptions } from "./applicationHelpers/options";
import { clauseTwoPriceOptions } from "./applicationHelpers/options";
import { clauseThreePriceOptions } from "./applicationHelpers/options";

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
  useTitle("Health insurance | FinAgent");
  const history = useHistory();

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
    history.push("./2");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceHealth.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceHealth.Page1.subtitle")}</Subtitle>

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
          <Subtitle>{t("InsuranceHealth.Page1.riskType")}</Subtitle>
          <MuiCheckbox
            name="clauseOne"
            readOnly={true}
            defaultChecked={true}
            labelName={t("InsuranceHealth.Page1.clauseOne")}
          />
          <MuiSelect
            name="clauseOnePrice"
            labelName={t("InsuranceHealth.Page1.chooseAmountEuro")}
            optionArray={clauseOnePriceOptions}
            placeholder="Amount:"
          />
          <MuiCheckbox
            name="clauseTwo"
            labelName={t("InsuranceHealth.Page1.clauseTwo")}
          />
          {showTwoAmount && (
            <MuiSelect
              name="clauseTwoPrice"
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={clauseTwoPriceOptions}
              placeholder="Amount:"
            />
          )}
          <MuiCheckbox
            name="clauseThree"
            labelName={t("InsuranceHealth.Page1.clauseThree")}
          />
          {showThreeAmount && (
            <MuiSelect
              name="clauseThreePrice"
              labelName={t("InsuranceHealth.Page1.chooseAmountZlote")}
              optionArray={clauseThreePriceOptions}
              placeholder="Amount:"
            />
          )}
        </Form>
        <ButtonsWrap>
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
