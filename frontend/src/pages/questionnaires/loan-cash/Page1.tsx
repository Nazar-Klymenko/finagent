import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormError from "@components/FormError";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiRadio } from "@components/input";

import {
  ApplicantBox,
  ButtonsWrap,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import AddAdditionalIncome from "./AddAdditionalIncome";
import AddApplicant from "./AddApplicant";

type FormTypes = {
  maritalStatus: string;
  bothSpousesStart: string;
  otherNation: string;
  validFrom: Date;
  validUntil: Date;
  name: string;
  surname: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  pesel: string;
  contractFrom: Date;
  contractUntil: Date;
  averageIncome: string;
  currency: string;
  pit: string;
  bank: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Cash loan | FinAgent");

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.loanCash?.ApplicantsData;

  const history = useHistory();

  const { handleSubmit, watch, control } = useForm<FormTypes>({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const maritalStatus = watch("maritalStatus", appDataValid?.maritalStatus);
  const bothSpousesStart = watch(
    "bothSpousesStart",
    appDataValid?.bothSpousesStart
  );

  const formSubmit = handleSubmit((data) => {
    setValues(data, "ApplicantsData");
    // setIsError(t("LoanCash.Error.noFirstApplicant"));
    // setIsError(t("LoanCash.Error.noSecondApplicant"));
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={1}
          label={t("LoanCash.Page1.subtitle")}
        />
        <Subtitle>{t("LoanCash.Page1.subtitle")}</Subtitle>
        <Form id="form" onSubmit={formSubmit}>
          <MuiRadio
            control={control}
            name="maritalStatus"
            legend={t("LoanCash.Page1.maritalStatus")}
            options={[
              {
                label: t("LoanCash.Page1.notMarried"),
                value: "notMarried",
              },
              {
                label: t("LoanCash.Page1.married"),
                value: "married",
              },
            ]}
            defaultValue={appDataValid?.maritalStatus || "notMarried"}
          />
          {maritalStatus === "married" && (
            <>
              <MuiRadio
                control={control}
                name="propertySeparation"
                legend={t("LoanCash.Page1.propertySeparation")}
                options={[
                  {
                    label: t("LoanCash.Page1.no"),
                    value: "no",
                  },
                  {
                    label: t("LoanCash.Page1.yes"),
                    value: "yes",
                  },
                ]}
                defaultValue={appDataValid?.propertySeparation || "no"}
              />

              <MuiRadio
                control={control}
                name="bothSpousesStart"
                legend={t("LoanCash.Page1.bothSpousesStart")}
                options={[
                  {
                    label: t("LoanCash.Page1.no"),
                    value: "no",
                  },
                  {
                    label: t("LoanCash.Page1.yes"),
                    value: "yes",
                  },
                ]}
                defaultValue={appDataValid?.bothSpousesStart || "no"}
              />
            </>
          )}
          <Subtitle>{t("LoanCash.ApplicantBox.title")}</Subtitle>
          {/* {t("LoanCash.ApplicantBox.addApplicant1")} */}
          {/* {t("LoanCash.ApplicantBox.addApplicant2")} */}
          {/* {t("LoanCash.IncomeBox.addIncome")} */}

          {/* {bothSpousesStart === "yes" && maritalStatus === "married" && ()} */}
          <Subtitle>{t("LoanCash.IncomeBox.title")}</Subtitle>
        </Form>
        {/* <AddApplicant
          openModal={openModal}
          setOpenModal={setOpenModal}
          setApplicantData={setApplicantData}
          defaultPerson={defaultPerson}
          applicantNumber={applicantNumber}
        />
        <AddAdditionalIncome
          openIncomeModal={openIncomeModal}
          setOpenIncomeModal={setOpenIncomeModal}
          incomeData={incomeData}
          setIncomeData={setIncomeData}
          defaultIncome={defaultIncome}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        /> */}
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
