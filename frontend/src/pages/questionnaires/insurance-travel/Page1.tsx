import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { DateInput, MuiCheckbox, MuiInput, MuiRadio } from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageOneSchema } from "./applicationHelpers/insurance-travel.schema";

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
  useTitle("Travel insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = appData?.InsuranceData?.InsuraceTravel;
  const history = useHistory();

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
    history.push("./2");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTravel.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("InsuranceTravel.Page1.title")}
        />
        <Subtitle>{t("InsuranceTravel.Page1.title")}</Subtitle>

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
          <MuiCheckbox
            name="inPoland"
            labelName={t("InsuranceTravel.Page1.inPoland")}
          />

          <MuiRadio
            name="insuranceType"
            legend={t("InsuranceTravel.Page1.insuranceType")}
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
            <MuiInput
              name="peopleAmount"
              labelName={t("InsuranceTravel.Page1.peopleAmount")}
            />
          )}
          <MuiInput
            name="destination"
            labelName={t("InsuranceTravel.Page1.destination")}
          />
          <MuiInput
            name="purpose"
            labelName={t("InsuranceTravel.Page1.purpose")}
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
