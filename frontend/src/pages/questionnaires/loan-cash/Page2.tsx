import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import WorkIcon from "@material-ui/icons/Work";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

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
import { pageTwoValues } from "./applicationHelpers/default-values";
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
  useTitle("Cash loan | FinAgent");

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.loanCash?.incomedData?.income;

  const history = useHistory();

  const methods = useForm<FormTypes>({
    defaultValues: pageTwoValues(appDataValid),
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
                    {truckDriver === "no" && (
                      <MuiInput
                        name={`income[${index}].industry`}
                        labelName={t("LoanCash.IncomeModal.industry")}
                        type="text"
                        placeholder="industry"
                        defaultValue={field.industry || ""}
                      />
                    )}

                    <MuiRadio
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
                        <MuiRadio
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
                            <MuiRadio
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

                            <MuiRadio
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
                      <MuiInput
                        name={`income[${index}].averageIncome12`}
                        labelName={t("LoanCash.IncomeModal.averageIncome12")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome12 || ""}
                      />
                    )}
                    {basicIncome === "specificTime" && (
                      <MuiInput
                        name={`income[${index}].averageIncome6`}
                        labelName={t("LoanCash.IncomeModal.averageIncome6")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome6 || ""}
                      />
                    )}
                    {basicIncome === "economicActivity" && (
                      <>
                        <MuiRadio
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
                        <MuiInput
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
                      <MuiInput
                        name={`income[${index}].averageIncome`}
                        labelName={t("LoanCash.IncomeModal.averageIncome3")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome || ""}
                      />
                    )}
                    <MuiInput
                      name={`income[${index}].pit`}
                      labelName={t("LoanCash.IncomeModal.pit")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.pit || ""}
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
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            text={t("Basic.buttonNext")}
            form="form"
            color="primary"
            onClick={finalizeForm}
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
