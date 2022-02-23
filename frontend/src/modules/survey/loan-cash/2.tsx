import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import WorkIcon from "@material-ui/icons/Work";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { MuiDialog } from "@components/MuiDialog";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import ContentWrap from "@components/content/ContentWrap";
import {
  DateInput,
  Input,
  MuiCheckbox,
  Radio,
  Textarea,
} from "@components/input";

import {
  Applicant,
  ApplicantAdd,
  ApplicantBox,
  ApplicantName,
  AvatarStyled,
  ButtonsWrap,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
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
      contractFrom: Date;
      contractUntil: Date;
      averageIncome: string;
      accountancy: string;
      pit: string;
      bank: string;
    }
  ];
};

const Page2 = () => {
  const { t } = useTranslation();
  useTitle("Cash loan | FinAgent");

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.loanCash?.incomeData?.income;

  const router = useRouter();

  const methods = useForm<FormTypes>({
    defaultValues: {
      income: [
        {
          truckDriver: appDataValid?.[0]?.truckDriver || "no",
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
          bank: appDataValid?.[0]?.bank || "",
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
      history.push("./3");
    } else {
      alert(t("InsuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <PageContainer xs title="">
      <QuestState data={appData} />

      <Title>{t("LoanCash.title")}</Title>
      <ProgressBar
        maxSteps={3}
        currentStep={2}
        label={t("LoanCash.Page2.subtitle")}
      />
      <Subtitle>{t("LoanCash.Page2.subtitle")}</Subtitle>
      <Typography variant="body1">
        This is optional. If you do not have any additional income, simply press
        next.
      </Typography>
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
                  <Radio
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
                  {truckDriver === "no" && (
                    <Input
                      name={`income[${index}].industry`}
                      labelName={t("LoanCash.IncomeModal.industry")}
                      type="text"
                      placeholder="industry"
                      defaultValue={field.industry || ""}
                    />
                  )}

                  <Radio
                    name={`income[${index}].basicIncome`}
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
                    defaultValue={field.basicIncome || ""}
                  />

                  {(basicIncome === "specificTime" ||
                    basicIncome === "mandate" ||
                    basicIncome === "contract") && (
                    <>
                      <Radio
                        name={`income[${index}].firstContract`}
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
                        defaultValue={field.firstContract || "yes"}
                      />
                      {firstContract === "no" && (
                        <>
                          <Radio
                            name={`income[${index}].sameEmployer`}
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
                            defaultValue={field.sameEmployer || ""}
                          />

                          <Radio
                            name={`income[${index}].withoutPause`}
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
                            defaultValue={field.withoutPause || ""}
                          />
                        </>
                      )}
                      <DateInput
                        name={`income[${index}].contractFrom`}
                        labelName={t("LoanCash.IncomeModal.contractFrom")}
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractFrom || null}
                      />
                      <DateInput
                        name={`income[${index}].contractUntil`}
                        labelName={t("LoanCash.IncomeModal.contractUntil")}
                        disablePast
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractUntil || null}
                      />
                    </>
                  )}
                  {basicIncome === "mandate" && (
                    <Input
                      name={`income[${index}].averageIncome12`}
                      labelName={t("LoanCash.IncomeModal.averageIncome12")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome12 || ""}
                    />
                  )}
                  {basicIncome === "specificTime" && (
                    <Input
                      name={`income[${index}].averageIncome6`}
                      labelName={t("LoanCash.IncomeModal.averageIncome6")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome6 || ""}
                    />
                  )}
                  {basicIncome === "economicActivity" && (
                    <>
                      <Radio
                        name={`income[${index}].accountancy`}
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
                        defaultValue={field.accountancy || ""}
                      />
                      <Input
                        name={`income[${index}].averageIncome`}
                        labelName={t("LoanCash.IncomeModal.averageIncome6")}
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
                      labelName={t("LoanCash.IncomeModal.averageIncome3")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome || ""}
                    />
                  )}
                  <Input
                    name={`income[${index}].pit`}
                    labelName={t("LoanCash.IncomeModal.pit")}
                    type="text"
                    placeholder="value"
                    defaultValue={field.pit || ""}
                  />
                  <Input
                    name={`income[${index}].bank`}
                    labelName={t("LoanCash.ApplicantModal.bank")}
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
            <Applicant key={field.id} error={!!errors.income?.[index]}>
              <AvatarStyled>
                <WorkIcon />
              </AvatarStyled>
              <ApplicantName>{income}</ApplicantName>
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
            </Applicant>
          );
        })}
      {!formInitiated ? (
        <ApplicantBox
          onClick={() => {
            setEditingMode(true);
            setOpenDialog(true);
          }}
        >
          <ApplicantAdd>
            <WorkIcon />
            <span>{t("LoanCash.IncomeBox.addIncome")}</span>
          </ApplicantAdd>
        </ApplicantBox>
      ) : (
        fields.length < 5 && (
          <ApplicantBox
            onClick={() => {
              append({ truckDriver: "no" });
              setAddingMode(true);
              setEditingMode(true);
              setOpenDialog(true);
              setEditingIndex(fields.length);
            }}
          >
            <ApplicantAdd>
              <WorkIcon />
              <span>{t("LoanCash.IncomeBox.addIncome")}</span>
            </ApplicantAdd>
          </ApplicantBox>
        )
      )}
      <FormBuilder.ButtonsWrap multiple>
        <Button
          text={t("Basic.buttonBack")}
          form=""
          color="secondary"
          onClick={() => {
            history.push("./1");
          }}
        />
        <Button
          text={t("Basic.buttonNext")}
          form="form"
          color="primary"
          onClick={finalizeForm}
        />
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;
