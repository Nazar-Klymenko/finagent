import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import { IconButton, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { MuiDialog } from "@components/MuiDialog";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { DateInput, Input, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageTwoValues } from "./helpers/default-values";
import { AdditionalIncomeSchema } from "./helpers/loan-cash.schema";

type FormTypes = {
  income: [
    {
      truckDriver: string;
      industry: string;
      basicIncome: string;
      firstContract: string;
      sameEmployer: string;
      withoutPause: string;
      contractFrom: Date | null;
      contractUntil: Date | null;
      averageIncome: string;
      accountancy: string;
      pit: string;
      bank: string;
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

  const { appData, setValues, setCurrentPage } = useData();

  //@ts-ignore
  const appDataValid = appData.loanCash.incomeData.income;

  const router = useRouter();

  const methods = useForm<FormTypes>({
    defaultValues: {
      income: [
        {
          truckDriver: appDataValid?.[0]?.truckDriver,
          industry: appDataValid?.[0]?.industry,
          basicIncome: appDataValid?.[0]?.basicIncome,
          firstContract: appDataValid?.[0]?.firstContract,
          sameEmployer: appDataValid?.[0]?.sameEmployer,
          withoutPause: appDataValid?.[0]?.withoutPause,
          contractFrom: appDataValid?.[0]?.contractFrom,
          contractUntil: appDataValid?.[0]?.contractUntil,
          averageIncome: appDataValid?.[0]?.averageIncome,
          accountancy: appDataValid?.[0]?.accountancy,
          pit: appDataValid?.[0]?.pit,
          bank: appDataValid?.[0]?.bank,
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
    shouldFocusError: true,
    resolver: yupResolver(AdditionalIncomeSchema()),
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

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
    setValues(data, "loanCash", "incomeData");
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
    if (!!errors.income === false) {
      setCurrentPage(3);
      router.push("./3");
    } else {
      alert(t("insuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <PageContainer xs title="loanCash.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("loanCash.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={2}
        label={t("loanCash.Page2.subtitle")}
      />
      <Typography variant="h6">{t("loanCash.Page2.subtitle")}</Typography>

      {editingMode &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          const truckDriver = watch(
            //@ts-ignore
            `income[${index}].truckDriver`
          ) as unknown as string;
          //@ts-ignore
          const basicIncome = watch(
            //@ts-ignore
            `income[${index}].basicIncome`
          ) as unknown as string;
          //@ts-ignore
          const firstContract = watch(
            //@ts-ignore
            `income[${index}].firstContract`
          ) as unknown as string;

          return (
            editingIndex === index && (
              <MuiDialog
                key={field.id}
                isOpen={openDialog}
                handleClose={() => {
                  handleClose(index);
                }}
                formId="additional-income-form"
                title={t("loanCash.income.title")}
                description=""
              >
                <Form
                  methods={methods}
                  id="additional-income-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`income[${index}].truckDriver`}
                    labelName={t("loanCash.income.truckDriver")}
                    options={[
                      {
                        label: t("loanCash.income.yes"),
                        value: "yes",
                      },
                      {
                        label: t("loanCash.income.no"),
                        value: "no",
                      },
                    ]}
                    defaultValue={field.truckDriver || ""}
                  />
                  {truckDriver === "no" && (
                    <Input
                      name={`income[${index}].industry`}
                      labelName={t("loanCash.income.industry")}
                      type="text"
                      placeholder="industry"
                      defaultValue={field.industry || ""}
                    />
                  )}

                  <Radio
                    name={`income[${index}].basicIncome`}
                    labelName={t("loanCash.income.basicIncome")}
                    options={[
                      {
                        label: t("loanCash.income.indefinitePeriod"),
                        value: "indefinitePeriod",
                      },
                      {
                        label: t("loanCash.income.specificTime"),
                        value: "specificTime",
                      },
                      {
                        label: t("loanCash.income.mandate"),
                        value: "mandate",
                      },
                      {
                        label: t("loanCash.income.contract"),
                        value: "contract",
                      },
                      {
                        label: t("loanCash.income.economicActivity"),
                        value: "economicActivity",
                      },
                    ]}
                    defaultValue={field.basicIncome || ""}
                  />

                  {(basicIncome === "specificTime" ||
                    basicIncome === "mandate" ||
                    basicIncome === "contract") && (
                    <>
                      <Radio
                        name={`income[${index}].firstContract`}
                        labelName={t("loanCash.income.firstContract")}
                        options={[
                          {
                            label: t("loanCash.income.yes"),
                            value: "yes",
                          },
                          {
                            label: t("loanCash.income.no"),
                            value: "no",
                          },
                        ]}
                        defaultValue={field.firstContract || "yes"}
                      />
                      {firstContract === "no" && (
                        <>
                          <Radio
                            name={`income[${index}].sameEmployer`}
                            labelName={t("loanCash.income.sameEmployer")}
                            options={[
                              {
                                label: t("loanCash.income.yes"),
                                value: "yes",
                              },
                              {
                                label: t("loanCash.income.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.sameEmployer || ""}
                          />

                          <Radio
                            name={`income[${index}].withoutPause`}
                            labelName={t("loanCash.income.withoutPause")}
                            options={[
                              {
                                label: t("loanCash.income.yes"),
                                value: "yes",
                              },
                              {
                                label: t("loanCash.income.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.withoutPause || ""}
                          />
                        </>
                      )}
                      <DateInput
                        name={`income[${index}].contractFrom`}
                        labelName={t("loanCash.income.contractFrom")}
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractFrom || null}
                      />
                      <DateInput
                        name={`income[${index}].contractUntil`}
                        labelName={t("loanCash.income.contractUntil")}
                        disablePast
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractUntil || null}
                      />
                    </>
                  )}
                  {basicIncome === "mandate" && (
                    <Input
                      name={`income[${index}].averageIncome12`}
                      labelName={t("loanCash.income.averageIncome12")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome12 || ""}
                    />
                  )}
                  {basicIncome === "specificTime" && (
                    <Input
                      name={`income[${index}].averageIncome6`}
                      labelName={t("loanCash.income.averageIncome6")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome6 || ""}
                    />
                  )}
                  {basicIncome === "economicActivity" && (
                    <>
                      <Radio
                        name={`income[${index}].accountancy`}
                        labelName={t("loanCash.income.accountancy")}
                        options={[
                          {
                            label: t("loanCash.income.generalRules"),
                            value: "generalRules",
                          },
                          {
                            label: t("loanCash.income.lumpSum"),
                            value: "lumpSum",
                          },
                          {
                            label: t("loanCash.income.taxCard"),
                            value: "taxCard",
                          },
                          {
                            label: t("loanCash.income.fullAccounting"),
                            value: "fullAccounting",
                          },
                        ]}
                        defaultValue={field.accountancy || ""}
                      />
                      <Input
                        name={`income[${index}].averageIncome`}
                        labelName={t("loanCash.income.averageIncome6")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome || ""}
                      />
                    </>
                  )}
                  {!(
                    basicIncome === "economicActivity" ||
                    basicIncome === "mandate" ||
                    basicIncome === "specificTime"
                  ) && (
                    <Input
                      name={`income[${index}].averageIncome`}
                      labelName={t("loanCash.income.averageIncome3")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome || ""}
                    />
                  )}
                  <Input
                    name={`income[${index}].pit`}
                    labelName={t("loanCash.income.pit")}
                    type="text"
                    placeholder="value"
                    defaultValue={field.pit || ""}
                  />
                  <Input
                    name={`income[${index}].bank`}
                    labelName={t("loanCash.policyholder.bank")}
                    type="text"
                    placeholder="Millenium"
                    defaultValue={field.bank}
                  />
                </Form>
              </MuiDialog>
            )
          );
        })}
      {formInitiated &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          let income = watch(`income[${index}].industry`);
          return (
            <FormBuilder.Applicant
              key={field.id}
              error={!!errors.income?.[index]}
            >
              <FormBuilder.AvatarStyled>
                <WorkIcon />
              </FormBuilder.AvatarStyled>
              <FormBuilder.ApplicantName>{income}</FormBuilder.ApplicantName>
              <IconButton
                onClick={() => {
                  editData(index);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  removeData(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </FormBuilder.Applicant>
          );
        })}
      {!formInitiated ? (
        <FormBuilder.ApplicantBox
          onClick={() => {
            setEditingMode(true);
            setOpenDialog(true);
          }}
        >
          <FormBuilder.ApplicantAdd>
            <WorkIcon />
            <span>{t("loanCash.IncomeBox.addIncome")}</span>
          </FormBuilder.ApplicantAdd>
        </FormBuilder.ApplicantBox>
      ) : (
        fields.length < 5 && (
          <FormBuilder.ApplicantBox
            onClick={() => {
              append({ truckDriver: "no" });
              setAddingMode(true);
              setEditingMode(true);
              setOpenDialog(true);
              setEditingIndex(fields.length);
            }}
          >
            <FormBuilder.ApplicantAdd>
              <WorkIcon />
              <span>{t("loanCash.IncomeBox.addIncome")}</span>
            </FormBuilder.ApplicantAdd>
          </FormBuilder.ApplicantBox>
        )
      )}
      <FormBuilder.ButtonsWrap multiple>
        <Button
          form=""
          color="secondary"
          onClick={() => {
            router.push("./1");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form" color="primary" onClick={finalizeForm}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;
