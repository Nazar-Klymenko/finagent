import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import MuiDialog from "@components/MuiDialog";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import {
  DateInput,
  MuiCheckbox,
  MuiInput,
  MuiRadio,
  Textarea,
} from "@components/input";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { AdditionalIncomeSchema } from "./applicationHelpers/loan-cash.schema";

type FormTypes = {
  income: [
    {
      truckDriver: string;
      industry: string;
      basicIncome: string;
      firstContract: string;
      sameEmployer: string;
      withoutPause: string;
      contractFrom: Date;
      contractUntil: Date;
      averageIncome: string;
      accountancy: string;
      pit: string;
    }
  ];
};

const Page2 = () => {
  const { t } = useTranslation();

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.loanCash?.insuredData?.income;

  const history = useHistory();

  useTitle("Cash loan | FinAgent");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      income: [
        {
          truckDriver: appDataValid?.[0]?.truckDriver || "yes",
          industry: appDataValid?.[0]?.industry,
          basicIncome: appDataValid?.[0]?.basicIncome || "indefinitePeriod",
          firstContract: appDataValid?.[0]?.firstContract || "yes",
          sameEmployer: appDataValid?.[0]?.sameEmployer || "yes",
          withoutPause: appDataValid?.[0]?.withoutPause || "yes",
          contractFrom: appDataValid?.[0]?.contractFrom,
          contractUntil: appDataValid?.[0]?.contractUntil,
          averageIncome: appDataValid?.[0]?.averageIncome,
          accountancy: appDataValid?.[0]?.accountancy || "generalRules",
          pit: appDataValid?.[0]?.pit,
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(AdditionalIncomeSchema()),
  });

  // header={t("LoanCash.IncomeModal.title")}

  const { fields, append, remove } = useFieldArray({
    control,
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
    setValues(data, "insuranceSpecialist", "insuredData");
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

  const finalizeForm = () => {
    if (formInitiated && fields.length > 0 && !!errors.income === false) {
      setAllowSummary(true);
      history.push("./summary");
    } else {
      alert(t("InsuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("LoanCash.Page2.subtitle")}
        />
        <Subtitle>{t("LoanCash.Page2.subtitle")}</Subtitle>

        {editingMode &&
          fields.map((field: any, index: number) => {
            //@ts-ignore
            const truckDriver = watch(`income.${index}.truckDriver`);
            //@ts-ignore
            const basicIncome = watch(`income.${index}.basicIncome`);
            //@ts-ignore
            const firstContract = watch(`income.${index}.firstContract`);

            return (
              editingIndex === index && (
                <MuiDialog
                  key={field.id}
                  isOpen={openDialog}
                  handleClose={() => {
                    handleClose(index);
                  }}
                  formId="insured-data-form"
                  title={t("LoanCash.IncomeModal.title")}
                  description=""
                >
                  <Form id="form" onSubmit={formSubmit}>
                    <MuiRadio
                      control={control}
                      name="truckDriver"
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
                    />
                    {truckDriver === "no" && (
                      <MuiInput
                        control={control}
                        name="industry"
                        labelName={t("LoanCash.IncomeModal.industry")}
                        type="text"
                        error={!!errors.income?.[index]?.industry}
                        helperText={errors?.income?.[index]?.industry?.message}
                        placeholder="industry"
                      />
                    )}

                    <MuiRadio
                      control={control}
                      name="basicIncome"
                      legend={t("LoanCash.IncomeModal.basicIncome")}
                      options={[
                        {
                          label: t("LoanCash.IncomeModal.indefinitePeriod"),
                          value: "indefinitePeriod",
                        },
                        {
                          label: t("LoanCash.IncomeModal.specificTime"),
                          value: "specificTime",
                        },
                        {
                          label: t("LoanCash.IncomeModal.mandate"),
                          value: "mandate",
                        },
                        {
                          label: t("LoanCash.IncomeModal.contract"),
                          value: "contract",
                        },
                        {
                          label: t("LoanCash.IncomeModal.economicActivity"),
                          value: "economicActivity",
                        },
                      ]}
                    />

                    {(basicIncome === "specificTime" ||
                      basicIncome === "mandate" ||
                      basicIncome === "contract") && (
                      <>
                        <MuiRadio
                          control={control}
                          name="firstContract"
                          legend={t("LoanCash.IncomeModal.firstContract")}
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
                        />
                        {firstContract === "no" && (
                          <>
                            <MuiRadio
                              control={control}
                              name="sameEmployer"
                              legend={t("LoanCash.IncomeModal.sameEmployer")}
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
                            />

                            <MuiRadio
                              control={control}
                              name="withoutPause"
                              legend={t("LoanCash.IncomeModal.withoutPause")}
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
                            />
                          </>
                        )}
                        <DateInput
                          control={control}
                          name="contractFrom"
                          labelName={t("LoanCash.IncomeModal.contractFrom")}
                          error={!!errors.income?.[index]?.contractFrom}
                          helperText={
                            errors?.income?.[index]?.contractFrom?.message
                          }
                          placeholder={t("Form.Placeholder.dateFull")}
                        />
                        <DateInput
                          control={control}
                          name="contractUntil"
                          labelName={t("LoanCash.IncomeModal.contractUntil")}
                          error={!!errors.income?.[index]?.contractUntil}
                          helperText={
                            errors?.income?.[index]?.contractUntil?.message
                          }
                          disablePast
                          placeholder={t("Form.Placeholder.dateFull")}
                        />
                      </>
                    )}
                    {basicIncome === "mandate" && (
                      <MuiInput
                        control={control}
                        name="averageIncome"
                        labelName={t("LoanCash.IncomeModal.averageIncome12")}
                        type="text"
                        error={!!errors.income?.[index]?.averageIncome}
                        helperText={
                          errors?.income?.[index]?.averageIncome?.message
                        }
                        placeholder="value"
                      />
                    )}
                    {basicIncome === "specificTime" && (
                      <MuiInput
                        control={control}
                        name="averageIncome"
                        labelName={t("LoanCash.IncomeModal.averageIncome6")}
                        type="text"
                        error={!!errors.income?.[index]?.averageIncome}
                        helperText={
                          errors?.income?.[index]?.averageIncome?.message
                        }
                        placeholder="value"
                      />
                    )}
                    {basicIncome === "economicActivity" && (
                      <>
                        <MuiRadio
                          control={control}
                          name="accountancy"
                          legend={t("LoanCash.IncomeModal.accountancy")}
                          options={[
                            {
                              label: t("LoanCash.IncomeModal.generalRules"),
                              value: "generalRules",
                            },
                            {
                              label: t("LoanCash.IncomeModal.lumpSum"),
                              value: "lumpSum",
                            },
                            {
                              label: t("LoanCash.IncomeModal.taxCard"),
                              value: "taxCard",
                            },
                            {
                              label: t("LoanCash.IncomeModal.fullAccounting"),
                              value: "fullAccounting",
                            },
                          ]}
                        />
                        <MuiInput
                          control={control}
                          name="averageIncome"
                          labelName={t("LoanCash.IncomeModal.averageIncome6")}
                          type="text"
                          error={!!errors.income?.[index]?.averageIncome}
                          helperText={
                            errors?.income?.[index]?.averageIncome?.message
                          }
                          placeholder="value"
                        />
                      </>
                    )}
                    {!(
                      basicIncome === "economicActivity" ||
                      basicIncome === "mandate" ||
                      basicIncome === "specificTime"
                    ) && (
                      <MuiInput
                        control={control}
                        name="averageIncome"
                        labelName={t("LoanCash.IncomeModal.averageIncome3")}
                        type="text"
                        error={!!errors.income?.[index]?.averageIncome}
                        helperText={
                          errors?.income?.[index]?.averageIncome?.message
                        }
                        placeholder="value"
                      />
                    )}
                    <MuiInput
                      control={control}
                      name="pit"
                      labelName={t("LoanCash.IncomeModal.pit")}
                      type="text"
                      error={!!errors.income?.[index]?.pit}
                      helperText={errors?.income?.[index]?.pit?.message}
                      placeholder="value"
                    />
                  </Form>
                </MuiDialog>
              )
            );
          })}

        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
