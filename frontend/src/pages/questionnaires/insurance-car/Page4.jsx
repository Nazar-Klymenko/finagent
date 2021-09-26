import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { SelectInput } from "@components/input";

import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageFourSchema } from "./applicationHelpers/validationSchema";
import { pageFourValues } from "./applicationHelpers/defaultValues";

const Page4 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(appData, "AdditionalData");

  const history = useHistory();

  useTitle("Transport insurance | FinAgent");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: pageFourValues(appDataValid),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageFourSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "AdditionalData");
    setCurrentPage(5);
    history.push("./5");
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>

        <ProgressBar maxSteps={5} currentStep={4} label="Additional info" />

        <Subtitle>{t("InsuranceTransport.Page4.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <SelectInput
            ref={register}
            name="predictMileage"
            labelName={t("InsuranceTransport.Page4.predictMileage")}
            defaultValue={appDataValid.predictMileage}
            optionArray={[
              "< 5 000",
              "5 001 - 7 500",
              "7 501 - 10 000",
              "10 001 - 12 500",
              "12 501 - 15 000",
              "15 001 - 17 500",
              "17 501 - 20 000",
              "20 001 - 22 500",
              "22 501 - 25 000",
              "25 001 - 30 000",
              "30 001 - 35 000",
              "35 001 - 40 000",
              "40 001 - 45 000",
              "45 001 - 100 000",
              "> 100 000",
            ]}
            error={!!errors.predictMileage}
            helperText={errors?.predictMileage?.message}
          />
          <SelectInput
            ref={register}
            name="useAbroad"
            labelName={t("InsuranceTransport.Page4.useAbroad")}
            defaultValue={appDataValid.useAbroad}
            optionArray={[
              "InsuranceTransport.SelectAbroad.noUse",
              "InsuranceTransport.SelectAbroad.twoWeeks",
              "InsuranceTransport.SelectAbroad.month",
              "InsuranceTransport.SelectAbroad.month2",
              "InsuranceTransport.SelectAbroad.month3",
              "InsuranceTransport.SelectAbroad.month6",
              "InsuranceTransport.SelectAbroad.year",
            ]}
            error={!!errors.useAbroad}
            helperText={errors?.useAbroad?.message}
          />
          <SelectInput
            ref={register}
            name="usePurpose"
            labelName={t("InsuranceTransport.Page4.usePurpose")}
            defaultValue={appDataValid.usePurpose}
            optionArray={[
              "InsuranceTransport.SelectPurpose.regular",
              "InsuranceTransport.SelectPurpose.taxi",
              "InsuranceTransport.SelectPurpose.rent",
              "InsuranceTransport.SelectPurpose.lease",
              "InsuranceTransport.SelectPurpose.bank",
              "InsuranceTransport.SelectPurpose.course",
            ]}
            error={!!errors.usePurpose}
            helperText={errors?.usePurpose?.message}
          />
          <SelectInput
            ref={register}
            name="parkingPlace"
            labelName={t("InsuranceTransport.Page4.parkingPlace")}
            defaultValue={appDataValid.parkingPlace}
            optionArray={[
              "InsuranceTransport.SelectParking.individual",
              "InsuranceTransport.SelectParking.shared",
              "InsuranceTransport.SelectParking.guarded",
              "InsuranceTransport.SelectParking.fenced",
              "InsuranceTransport.SelectParking.unsecured",
            ]}
            error={!!errors.parkingPlace}
            helperText={errors?.parkingPlace?.message}
          />
          <SelectInput
            name="security"
            labelName={t("InsuranceTransport.Page4.security")}
            defaultValue={appDataValid.security}
            optionArray={[
              "InsuranceTransport.SelectSecurity.alarm",
              "InsuranceTransport.SelectSecurity.immob",
              "InsuranceTransport.SelectSecurity.alarmImmob",
              "InsuranceTransport.SelectSecurity.alarmImmonOther",
              "InsuranceTransport.SelectSecurity.other",
              "InsuranceTransport.SelectSecurity.none",
            ]}
            error={!!errors.security}
            helperText={errors?.security?.message}
            ref={register}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./3");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page4;
