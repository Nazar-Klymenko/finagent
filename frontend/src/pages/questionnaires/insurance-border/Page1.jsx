import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageOneSchema } from "./applicationHelpers/insuranceBorderSchema";

import { Input, MuiSelect, MuiRadio } from "@components/input";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

import { insurancePeriodOptions } from "./applicationHelpers/insuranceBorderOptions";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();

  const appDataValid = validateAppData(appData, "InsuranceData");

  const { register, handleSubmit, errors, watch, control } = useForm({
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

  const documentTypeName = watch("documentType") || appDataValid.documentType;

  const formSubmit = (data) => {
    setValues(data, "InsuranceData");
    setCurrentPage(2);
    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar maxSteps={3} currentStep={1} label="Insurance Info" />
        <Subtitle>{t("InsuranceBorder.Page1.subtitle")}</Subtitle>

        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiRadio
            name="documentType"
            control={control}
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
            defaultChecked={appDataValid.documentType || "pesel"}
          />
          {!(documentTypeName === "passportNumber") && (
            <Input
              ref={register}
              name="pesel"
              labelName={t("InsuranceBorder.Page1.pesel")}
              error={!!errors.pesel}
              helperText={errors?.pesel?.message}
            />
          )}
          {documentTypeName === "passportNumber" && (
            <Input
              ref={register}
              name="passportNumber"
              labelName={t("InsuranceBorder.Page1.passportNumber")}
              error={!!errors.passportNumber}
              helperText={errors?.passportNumber?.message}
            />
          )}

          <MuiRadio
            control={control}
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
            defaultChecked={appDataValid.registeredNotInEU || "no"}
          />
          <MuiSelect
            control={control}
            name="insurancePeriod"
            labelName={t("InsuranceBorder.Page1.insurancePeriod")}
            defaultValue={appDataValid.insurancePeriod}
            optionArray={insurancePeriodOptions}
            error={!!errors.insurancePeriod}
            helperText={errors?.insurancePeriod?.message}
          />
        </Form>
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
