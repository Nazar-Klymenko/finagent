import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useFieldArray, useForm } from "react-hook-form";
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
import { pageOneValues } from "./applicationHelpers/default-values";

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
  const history = useHistory();

  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = appData.loanCash?.ApplicantsData;

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const methods = useForm<FormTypes>({
    defaultValues: pageOneValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const { handleSubmit, watch, control } = methods;

  const maritalStatus = watch("maritalStatus");
  const bothSpousesStart = watch("bothSpousesStart");

  const { fields, append, remove } = useFieldArray({
    control,

    //@ts-ignore
    name: "income",
  });

  function removeData(index: number) {
    remove(index);
    appDataValid.splice(index, 1);
  }
  function editData(index: number) {
    setEditingMode(true);
    setEditingIndex(index);
    setOpenDialog(true);
  }

  const formSubmit = handleSubmit((data) => {
    setFormInitiated(true);
    setEditingMode(false);
    setAddingMode(false);
    setValues(data, "loanCash", "incomedData");
  });

  const handleClose = (index: number) => {
    if (addingMode) {
      removeData(index);
      setAddingMode(false);
    } else {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    if (appDataValid && !formInitiated) {
      setFormInitiated(true);
      setAddingMode(false);

      for (let i = 1; i < appDataValid.length; i++) {
        //@ts-ignore
        append(appDataValid[i]);
      }
    }
  }, [appDataValid, append, formInitiated]);

  // const finalizeForm = () => {
  //   if (formInitiated && fields.length > 0 && !!errors.income === false) {
  //     setValues(data, "ApplicantsData");
  //     setCurrentPage(2);
  //     history.push("./2");
  //   } else {
  //     alert(t("InsuranceHealth.Error.noApplicant"));
  //   }
  // };

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
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiRadio
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
          />
          {maritalStatus === "married" && (
            <>
              <MuiRadio
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
              />

              <MuiRadio
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
              />
            </>
          )}
          <Subtitle>{t("LoanCash.ApplicantBox.title")}</Subtitle>
          {/* {t("LoanCash.ApplicantBox.addApplicant1")} */}
          {/* {t("LoanCash.ApplicantBox.addApplicant2")} */}
          {/* {t("LoanCash.IncomeBox.addIncome")} */}

          <Subtitle>{t("LoanCash.IncomeBox.title")}</Subtitle>
        </Form>

        {/* <Form>


          {editingMode &&
          fields.map((field: any, index: number) => {
            //@ts-ignore
            const truckDriver = watch(`income[${index}].truckDriver`);
            //@ts-ignore
            const basicIncome = watch(`income[${index}].basicIncome`);
            //@ts-ignore
            const firstContract = watch(`income[${index}].firstContract`);

            return (
              editingIndex === index && (
                <MuiDialog
                  key={field.id}
                  isOpen={openDialog}
                  handleClose={() => {
                    handleClose(index);
                  }}
                  formId="additional-income-form"
                  title={t("LoanCash.IncomeModal.title")}
                  description=""
                >
                  <Form
                    methods={methods}
                    id="additional-income-form"
                    onSubmit={formSubmit}
                  >
                    <MuiRadio
                      name={`income[${index}].truckDriver`}
                      legend={t("LoanCash.IncomeModal.truckDriver")}
                      options={[
                        {
                          label: t("LoanCash.IncomeModal.yes"),
                          value: "yes",
                        },
                        {
                          label: t("LoanCash.IncomeModal.no"),
                          value: "no",
                        },
                      ]}
                      defaultValue={field.truckDriver || ""}
                    />
        </Form> */}
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
