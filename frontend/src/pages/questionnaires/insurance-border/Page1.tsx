import React from "react";

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
import { MuiInput, MuiRadio, MuiSelect } from "@components/input";
import { ContentWrap } from "@components/layout";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insurance-border.schema";
import { insurancePeriodOptions } from "./applicationHelpers/options";

type FormTypes = {
  documentType: string;
  pesel: string;
  passportNumber: string;
  registeredNotInEU: boolean;
  insurancePeriod: Date;
};

const Page1 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceBorder",
    "insuranceData"
  );

  const methods = useForm<FormTypes>({
    defaultValues: {
      pesel: appDataValid.pesel,
      passportNumber: appDataValid.passportNumber,
      insurancePeriod: appDataValid.insurancePeriod,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const documentTypeName = watch("documentType") || appDataValid.documentType;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "insuranceData");
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={1}
          label={t("InsuranceBorder.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceBorder.Page1.subtitle")}</Subtitle>

        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiRadio
            name="documentType"
            legend={t("InsuranceBorder.Page1.documentType")}
            options={[
              {
                label: t("InsuranceBorder.Page1.pesel"),
                value: "pesel",
              },
              {
                label: t("InsuranceBorder.Page1.passportNumber"),
                value: "passportNumber",
              },
            ]}
            defaultValue={appDataValid.documentType || "pesel"}
          />
          {!(documentTypeName === "passportNumber") && (
            <MuiInput
              name="pesel"
              labelName={t("InsuranceBorder.Page1.pesel")}
            />
          )}
          {documentTypeName === "passportNumber" && (
            <MuiInput
              name="passportNumber"
              labelName={t("InsuranceBorder.Page1.passportNumber")}
            />
          )}

          <MuiRadio
            name="registeredNotInEU"
            legend={t("InsuranceBorder.Page1.registeredNotInEU")}
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
            defaultValue={appDataValid.registeredNotInEU || "no"}
          />
          <MuiSelect
            name="insurancePeriod"
            labelName={t("InsuranceBorder.Page1.insurancePeriod")}
            defaultValue={appDataValid.insurancePeriod}
            optionArray={insurancePeriodOptions}
          />
        </Form>
        <ButtonsWrap>
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
