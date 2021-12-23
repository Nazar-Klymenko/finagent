import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormError from "@components/FormError";
import MuiDialog from "@components/MuiDialog";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
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
import { pageOneValues } from "./applicationHelpers/default-values";
import { ApplicantSchema } from "./applicationHelpers/loan-cash.schema";

type FormTypes1 = {
  maritalStatus: string;
  propertySeparation: string;
  bothSpousesStart: string;
};
type FormTypes2 = {
  applicant: [
    {
      otherNation: string;
      nationality: string;
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
    }
  ];
};

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Cash loan | FinAgent");
  const history = useHistory();

  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid1 = appData.loanCash?.applicantData;
  const appDataValid = appData.loanCash?.applicantData?.applicant;

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [maxFields, setMaxFields] = useState(1);

  const methods1 = useForm<FormTypes1>({
    defaultValues: pageOneValues(appDataValid1),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const { watch: watch1 } = methods1;

  const methods = useForm<FormTypes2>({
    defaultValues: {
      applicant: [
        {
          otherNation: appDataValid?.[0]?.otherNation || "no",
          nationality: appDataValid?.[0]?.nationality || "polish",
          validFrom: appDataValid?.[0]?.validFrom || null,
          validUntil: appDataValid?.[0]?.validUntil || null,
          name: appDataValid?.[0]?.name || "",
          surname: appDataValid?.[0]?.surname || "",
          birthDate: appDataValid?.[0]?.birthDate || null,
          phoneNumber: appDataValid?.[0]?.phoneNumber || "",
          email: appDataValid?.[0]?.email || "",
          pesel: appDataValid?.[0]?.pesel || "",
          contractFrom: appDataValid?.[0]?.contractFrom || null,
          contractUntil: appDataValid?.[0]?.contractUntil || null,
          averageIncome: appDataValid?.[0]?.averageIncome || "",
          currency: appDataValid?.[0]?.currency || "",
          pit: appDataValid?.[0]?.pit || "",
          bank: appDataValid?.[0]?.bank || "",
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(ApplicantSchema()),
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicant",
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
    setValues(data, "loanCash", "applicantData");
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
    if (formInitiated && fields.length > 0 && !!errors.applicant === false) {
      appDataValid1.maritalStatus = maritalStatus;
      appDataValid1.bothSpousesStart = bothSpousesStart;
      appDataValid1.propertySeparation = propertySeparation;
      setCurrentPage(2);
      history.push("./2");
    } else {
      alert(t("InsuranceHealth.Error.noApplicant"));
    }
  };

  const maritalStatus = watch1("maritalStatus");
  const bothSpousesStart = watch1("bothSpousesStart");
  const propertySeparation = watch1("propertySeparation");

  useEffect(() => {
    if (bothSpousesStart === "yes") {
      setMaxFields(2);
    } else {
      setMaxFields(1);
    }
  }, [bothSpousesStart]);

  useEffect(() => {
    if (appDataValid?.length === 2 && bothSpousesStart === "no") {
      remove(1);
      appDataValid.splice(1, 1);
    }
  }, [appDataValid, bothSpousesStart, remove]);

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={1}
          label={t("LoanCash.Page1.subtitle")}
        />
        <Subtitle>{t("LoanCash.Page1.subtitle")}</Subtitle>
        <Form
          methods={methods1}
          id="form"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
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
        </Form>

        <Typography variant="body1">
          Dodaj wnioskodawcę ({bothSpousesStart === "yes" ? 2 : 1})
        </Typography>
        {/* {t("LoanCash.ApplicantModal.title")} */}

        {editingMode &&
          fields.map((field: any, index: number) => {
            //@ts-ignore
            const nationality = watch(`applicant[${index}].nationality`);
            //@ts-ignore
            const residenceDocument = watch(`applicant[${index}
            ].residenceDocument`);
            //@ts-ignore
            const basicIncome = watch(`applicant[${index}
            ].basicIncome`);
            //@ts-ignore
            const firstContract = watch(`applicant[${index}
            ].firstContract`);
            return (
              editingIndex === index && (
                <MuiDialog
                  key={field.id}
                  isOpen={openDialog}
                  handleClose={() => {
                    handleClose(index);
                  }}
                  formId="applicant-form"
                  title={t("LoanCash.IncomeModal.title")}
                  description=""
                >
                  <Form
                    methods={methods}
                    id="applicant-form"
                    onSubmit={formSubmit}
                  >
                    <MuiRadio
                      name={`applicant[${index}].nationality`}
                      legend={t("LoanCash.ApplicantModal.citizenship")}
                      options={[
                        {
                          label: t("LoanCash.ApplicantModal.polish"),
                          value: "polish",
                        },
                        {
                          label: t("LoanCash.ApplicantModal.other"),
                          value: "other",
                        },
                      ]}
                      defaultValue={field.nationality || "polish"}
                    />
                    {nationality === "other" && (
                      <>
                        <MuiInput
                          name={`applicant[${index}].otherNation`}
                          labelName={t(
                            "LoanCash.ApplicantModal.otherCitizenship"
                          )}
                          type="text"
                          placeholder="Nation"
                          defaultValue={field.otherNation || ""}
                        />

                        <MuiRadio
                          name={`applicant[${index}].residenceDocument`}
                          legend={t(
                            "LoanCash.ApplicantModal.residenceDocument"
                          )}
                          options={[
                            {
                              label: t("LoanCash.ApplicantModal.temporaryCard"),
                              value: "temporaryCard",
                            },
                            {
                              label: t("LoanCash.ApplicantModal.permanentCard"),
                              value: "permanentCard",
                            },
                            {
                              label: t("LoanCash.ApplicantModal.blueCard"),
                              value: "blueCard",
                            },
                          ]}
                          defaultValue={
                            field.residenceDocument || "temporaryCard"
                          }
                        />
                        <DateInput
                          name={`applicant[${index}].validFrom`}
                          labelName={t("LoanCash.ApplicantModal.validFrom")}
                          placeholder={t("Form.Placeholder.dateFull")}
                          defaultValue={field.validFrom}
                        />
                        {residenceDocument !== "permanentCard" && (
                          <DateInput
                            name={`applicant[${index}].validUntil`}
                            labelName={t("LoanCash.ApplicantModal.validUntil")}
                            disablePast
                            placeholder={t("Form.Placeholder.dateFull")}
                            defaultValue={field.validUntil || null}
                          />
                        )}
                      </>
                    )}
                    <MuiInput
                      name={`applicant[${index}].name`}
                      labelName={t("LoanCash.ApplicantModal.name")}
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      defaultValue={field.name || ""}
                    />
                    <MuiInput
                      name={`applicant[${index}].surname`}
                      labelName={t("LoanCash.ApplicantModal.surname")}
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      defaultValue={field.surname}
                    />
                    <DateInput
                      name={`applicant[${index}].birthDate`}
                      labelName={t("LoanCash.ApplicantModal.birthDate")}
                      placeholder={t("Form.Placeholder.dateFull")}
                      defaultValue={field.birthDate}
                    />
                    <MuiPhoneInput
                      name={`applicant[${index}].phoneNumber`}
                      labelName={t("LoanCash.ApplicantModal.phoneNumber")}
                      defaultValue={field.phoneNumber}
                    />
                    <MuiInput
                      name={`applicant[${index}].email`}
                      labelName={t("LoanCash.ApplicantModal.email")}
                      type="text"
                      placeholder="example@mail.com"
                      defaultValue={field.email}
                    />
                    <MuiInput
                      name={`applicant[${index}].pesel`}
                      labelName={t("LoanCash.ApplicantModal.pesel")}
                      type="text"
                      placeholder="XX XXX XXX XXX"
                      defaultValue={field.pesel}
                    />

                    <MuiRadio
                      name={`applicant[${index}].basicIncome`}
                      legend={t("LoanCash.ApplicantModal.basicIncome")}
                      options={[
                        {
                          label: t("LoanCash.ApplicantModal.indefinitePeriod"),
                          value: "indefinitePeriod",
                        },
                        {
                          label: t("LoanCash.ApplicantModal.specificTime"),
                          value: "specificTime",
                        },
                        {
                          label: t("LoanCash.ApplicantModal.mandate"),
                          value: "mandate",
                        },
                        {
                          label: t("LoanCash.ApplicantModal.contract"),
                          value: "contract",
                        },
                        {
                          label: t("LoanCash.ApplicantModal.economicActivity"),
                          value: "economicActivity",
                        },
                      ]}
                      defaultValue={field.basicIncome || "indefinitePeriod"}
                    />
                    {(basicIncome === "specificTime" ||
                      basicIncome === "mandate" ||
                      basicIncome === "contract") && (
                      <>
                        <MuiRadio
                          name={`applicant[${index}].firstContract`}
                          legend={t("LoanCash.ApplicantModal.firstContract")}
                          options={[
                            {
                              label: t("LoanCash.ApplicantModal.yes"),
                              value: "yes",
                            },
                            {
                              label: t("LoanCash.ApplicantModal.no"),
                              value: "no",
                            },
                          ]}
                          defaultValue={field.firstContract || "yes"}
                        />
                        {firstContract === "no" && (
                          <>
                            <MuiRadio
                              name={`applicant[${index}].sameEmployer`}
                              legend={t("LoanCash.ApplicantModal.sameEmployer")}
                              options={[
                                {
                                  label: t("LoanCash.ApplicantModal.yes"),
                                  value: "yes",
                                },
                                {
                                  label: t("LoanCash.ApplicantModal.no"),
                                  value: "no",
                                },
                              ]}
                              defaultValue={field.sameEmployer || "yes"}
                            />

                            <MuiRadio
                              name={`applicant[${index}].withoutPause`}
                              legend={t("LoanCash.ApplicantModal.withoutPause")}
                              options={[
                                {
                                  label: t("LoanCash.ApplicantModal.yes"),
                                  value: "yes",
                                },
                                {
                                  label: t("LoanCash.ApplicantModal.no"),
                                  value: "no",
                                },
                              ]}
                              defaultValue={field.withoutPause || "yes"}
                            />
                          </>
                        )}
                        <DateInput
                          name={`applicant[${index}].contractFrom`}
                          labelName={t("LoanCash.ApplicantModal.contractFrom")}
                          placeholder={t("Form.Placeholder.dateFull")}
                          defaultValue={field.contractFrom}
                        />
                        <DateInput
                          name={`applicant[${index}].contractUntil`}
                          labelName={t("LoanCash.ApplicantModal.contractUntil")}
                          disablePast
                          placeholder={t("Form.Placeholder.dateFull")}
                          defaultValue={field.contractUntil}
                        />
                      </>
                    )}
                    {basicIncome === "mandate" && (
                      <MuiInput
                        name={`applicant[${index}].averageIncome`}
                        labelName={t("LoanCash.ApplicantModal.averageIncome12")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome}
                      />
                    )}
                    {basicIncome === "specificTime" && (
                      <MuiInput
                        name={`applicant[${index}].averageIncome`}
                        labelName={t("LoanCash.ApplicantModal.averageIncome6")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome}
                      />
                    )}
                    {basicIncome === "economicActivity" && (
                      <>
                        <MuiRadio
                          name={`applicant[${index}].accountancy`}
                          legend={t("LoanCash.ApplicantModal.accountancy")}
                          options={[
                            {
                              label: t("LoanCash.ApplicantModal.generalRules"),
                              value: "generalRules",
                            },
                            {
                              label: t("LoanCash.ApplicantModal.lumpSum"),
                              value: "lumpSum",
                            },
                            {
                              label: t("LoanCash.ApplicantModal.taxCard"),
                              value: "taxCard",
                            },
                            {
                              label: t(
                                "LoanCash.ApplicantModal.fullAccounting"
                              ),
                              value: "fullAccounting",
                            },
                          ]}
                          defaultValue={field.accountancy || "generalRules"}
                        />
                        <MuiInput
                          name={`applicant[${index}].averageIncome`}
                          labelName={t(
                            "LoanCash.ApplicantModal.averageIncome6"
                          )}
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
                      <MuiInput
                        name={`applicant[${index}].averageIncome`}
                        labelName={t("LoanCash.ApplicantModal.averageIncome3")}
                        type="text"
                        placeholder="value"
                        defaultValue={field.averageIncome}
                      />
                    )}
                    <MuiInput
                      name={`applicant[${index}].currency`}
                      labelName={t("LoanCash.ApplicantModal.currency")}
                      type="text"
                      placeholder="PLN"
                      defaultValue={field.currency}
                    />
                    <MuiInput
                      name={`applicant[${index}].pit`}
                      labelName={t("LoanCash.ApplicantModal.pit")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.pit}
                    />
                    <MuiInput
                      name={`applicant[${index}].bank`}
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
            let applicant = watch(`applicant[${index}].name`);
            return (
              <Applicant key={field.id} error={!!errors.applicant?.[index]}>
                {/* @ts-ignore */}
                <AvatarStyled>{applicant?.[0] || ""}</AvatarStyled>
                <ApplicantName>{applicant}</ApplicantName>
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
              <PersonAddIcon />
              <span>{t("InsuranceDiagnostic.ApplicantBox.addApplicant")}</span>
            </ApplicantAdd>
          </ApplicantBox>
        ) : (
          fields.length < maxFields && (
            <ApplicantBox
              onClick={() => {
                append({ name: "", surname: "" });
                setAddingMode(true);
                setEditingMode(true);
                setOpenDialog(true);
                setEditingIndex(fields.length);
              }}
            >
              <ApplicantAdd>
                <PersonAddIcon />
                <span>
                  {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
                </span>
              </ApplicantAdd>
            </ApplicantBox>
          )
        )}
        <ButtonsWrap>
          {/* <MuiButton
            text={t("Basic.buttonNext")}
            form="form"
            color="primary"
            onClick={finalizeForm}
          /> */}

          <MuiButton
            text={t("Basic.buttonNext")}
            color="primary"
            form="form"
            onClick={finalizeForm}
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
