import React, { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import { IconButton, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

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
import { AdditionalIncomeSchema } from "./helpers/loan-mortgage.schema";

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
  const appDataValid = appData.loanMortgage?.incomeData?.income;

  const router = useRouter();

  const methods = useForm<FormTypes>({
    defaultValues: {
      income: [
        {
          truckDriver: appDataValid?.[0]?.truckDriver || "no",
          industry: appDataValid?.[0]?.industry,
          basicIncome: appDataValid?.[0]?.basicIncome || "indefinitePeriod",
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
    setValues(data, "loanMortgage", "incomeData");
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
    <PageContainer xs title={t("loanMortgage.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("loanMortgage.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={2}
        label={t("loanMortgage.Page3.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("loanMortgage.Page3.subtitle")}
      </Typography>

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
                title={t("loanMortgage.income.title")}
                description=""
              >
                <Form
                  methods={methods}
                  id="additional-income-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`income[${index}].truckDriver`}
                    labelName={t("loanMortgage.income.truckDriver")}
                    options={[
                      {
                        label: t("loanMortgage.income.yes"),
                        value: "yes",
                      },
                      {
                        label: t("loanMortgage.income.no"),
                        value: "no",
                      },
                    ]}
                    defaultValue={field.truckDriver}
                  />
                  {truckDriver === "no" && (
                    <Input
                      name={`income[${index}].industry`}
                      labelName={t("loanMortgage.income.industry")}
                      type="text"
                      defaultValue={field.industry}
                    />
                  )}

                  <Radio
                    name={`income[${index}].basicIncome`}
                    labelName={t("loanMortgage.income.basicIncome")}
                    options={[
                      {
                        label: t("loanMortgage.income.indefinitePeriod"),
                        value: "indefinitePeriod",
                      },
                      {
                        label: t("loanMortgage.income.specificTime"),
                        value: "specificTime",
                      },
                      {
                        label: t("loanMortgage.income.mandate"),
                        value: "mandate",
                      },
                      {
                        label: t("loanMortgage.income.contract"),
                        value: "contract",
                      },
                      {
                        label: t("loanMortgage.income.economicActivity"),
                        value: "economicActivity",
                      },
                    ]}
                    defaultValue={field.basicIncome}
                  />
                  {/* //@ts-ignore */}
                  {(basicIncome === "specificTime" ||
                    basicIncome === "mandate" ||
                    basicIncome === "indefinitePeriod" ||
                    basicIncome === "contract") && (
                    <>
                      <Radio
                        name={`income[${index}].firstContract`}
                        labelName={t("loanMortgage.income.firstContract")}
                        options={[
                          {
                            label: t("loanMortgage.income.yes"),
                            value: "yes",
                          },
                          {
                            label: t("loanMortgage.income.no"),
                            value: "no",
                          },
                        ]}
                        defaultValue={field.firstContract || "yes"}
                      />
                      {firstContract === "no" && (
                        <>
                          <Radio
                            name={`income[${index}].sameEmployer`}
                            labelName={t("loanMortgage.income.sameEmployer")}
                            options={[
                              {
                                label: t("loanMortgage.income.yes"),
                                value: "yes",
                              },
                              {
                                label: t("loanMortgage.income.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.sameEmployer}
                          />

                          <Radio
                            name={`income[${index}].withoutPause`}
                            labelName={t("loanMortgage.income.withoutPause")}
                            options={[
                              {
                                label: t("loanMortgage.income.yes"),
                                value: "yes",
                              },
                              {
                                label: t("loanMortgage.income.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.withoutPause}
                          />
                        </>
                      )}
                      <DateInput
                        name={`income[${index}].contractFrom`}
                        labelName={t("loanMortgage.income.contractFrom")}
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractFrom || null}
                      />
                      {basicIncome !== "indefinitePeriod" && (
                        <DateInput
                          name={`income[${index}].contractUntil`}
                          labelName={t("loanMortgage.income.contractUntil")}
                          disablePast
                          placeholder={t("Form.Placeholder.dateFull")}
                          defaultValue={field.contractUntil || null}
                        />
                      )}
                    </>
                  )}
                  {basicIncome === "mandate" && (
                    <Input
                      name={`income[${index}].averageIncome12`}
                      labelName={t("loanMortgage.income.averageIncome12")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome12}
                    />
                  )}
                  {basicIncome === "specificTime" && (
                    <Input
                      name={`income[${index}].averageIncome6`}
                      labelName={t("loanMortgage.income.averageIncome6")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome6}
                    />
                  )}
                  {basicIncome === "economicActivity" && (
                    <>
                      <Radio
                        name={`income[${index}].accountancy`}
                        labelName={t("loanMortgage.income.accountancy")}
                        options={[
                          {
                            label: t("loanMortgage.income.generalRules"),
                            value: "generalRules",
                          },
                          {
                            label: t("loanMortgage.income.lumpSum"),
                            value: "lumpSum",
                          },
                          {
                            label: t("loanMortgage.income.taxCard"),
                            value: "taxCard",
                          },
                          {
                            label: t("loanMortgage.income.fullAccounting"),
                            value: "fullAccounting",
                          },
                        ]}
                        defaultValue={field.accountancy}
                      />
                      <Input
                        name={`income[${index}].averageIncome`}
                        labelName={t("loanMortgage.income.averageIncome6")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome}
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
                      labelName={t("loanMortgage.income.averageIncome3")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome}
                    />
                  )}
                  <Input
                    name={`income[${index}].pit`}
                    labelName={t("loanMortgage.income.pit")}
                    type="text"
                    placeholder="value"
                    defaultValue={field.pit}
                  />
                  <Input
                    name={`income[${index}].bank`}
                    labelName={t("loanMortgage.policyholder.bank")}
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
            <span>{t("loanMortgage.IncomeBox.addIncome")}</span>
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
              <span>{t("loanMortgage.IncomeBox.addIncome")}</span>
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
