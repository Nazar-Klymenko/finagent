import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
import { DateInput, Input, MuiPhoneInput, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneValues } from "./helpers/default-values";
import { ApplicantSchema } from "./helpers/loan-mortgage.schema";

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
      validFrom: Date | null;
      validUntil: Date | null;
      name: string;
      birthDate: Date | null;
      phoneNumber: string;
      email: string;
      pesel: string;
      contractFrom: Date | null;
      contractUntil: Date | null;
      averageIncome: string;
      currency: string;
      pit: string;
      bank: string;
    }
  ];
};

const Page1 = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid1 = appData.loanMortgage.applicantData;
  //@ts-ignore
  const appDataValid = appData.loanMortgage.applicantData.applicant;

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
          otherNation: appDataValid?.[0]?.otherNation,
          nationality: appDataValid?.[0]?.nationality,
          validFrom: appDataValid?.[0]?.validFrom,
          validUntil: appDataValid?.[0]?.validUntil,
          name: appDataValid?.[0]?.name,
          birthDate: appDataValid?.[0]?.birthDate,
          phoneNumber: appDataValid?.[0]?.phoneNumber,
          email: appDataValid?.[0]?.email,
          pesel: appDataValid?.[0]?.pesel,
          contractFrom: appDataValid?.[0]?.contractFrom,
          contractUntil: appDataValid?.[0]?.contractUntil,
          averageIncome: appDataValid?.[0]?.averageIncome,
          currency: appDataValid?.[0]?.currency,
          pit: appDataValid?.[0]?.pit,
          bank: appDataValid?.[0]?.bank,
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
    setValues(data, "loanMortgage", "applicantData");
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
      router.push("./2");
    } else {
      alert(t("insuranceHealth.Error.noApplicant"));
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
    <PageContainer xs title="LoanMortgage.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("LoanMortgage.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={1}
        label={t("LoanMortgage.Page1.subtitle")}
      />
      <Typography variant="h6">{t("LoanMortgage.Page1.subtitle")}</Typography>
      <Form
        methods={methods1}
        id="form"
        onSubmit={(e: any) => {
          e.preventDefault();
        }}
      >
        <Radio
          name="maritalStatus"
          labelName={t("LoanMortgage.Page1.maritalStatus")}
          options={[
            {
              label: t("LoanMortgage.Page1.notMarried"),
              value: "notMarried",
            },
            {
              label: t("LoanMortgage.Page1.married"),
              value: "married",
            },
          ]}
        />
        {maritalStatus === "married" && (
          <>
            <Radio
              name="propertySeparation"
              labelName={t("LoanMortgage.Page1.propertySeparation")}
              options={[
                {
                  label: t("LoanMortgage.Page1.no"),
                  value: "no",
                },
                {
                  label: t("LoanMortgage.Page1.yes"),
                  value: "yes",
                },
              ]}
            />

            <Radio
              name="bothSpousesStart"
              labelName={t("LoanMortgage.Page1.bothSpousesStart")}
              options={[
                {
                  label: t("LoanMortgage.Page1.no"),
                  value: "no",
                },
                {
                  label: t("LoanMortgage.Page1.yes"),
                  value: "yes",
                },
              ]}
            />
          </>
        )}
        <Typography variant="body1">
          {t("LoanMortgage.ApplicantBox.title")}
        </Typography>
      </Form>

      {editingMode &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          const nationality = watch(
            `applicant[${index}].nationality`
          ) as unknown as string;
          //@ts-ignore
          const residenceDocument = watch(`applicant[${index}
            ].residenceDocument`) as unknown as string;
          //@ts-ignore
          const basicIncome = watch(`applicant[${index}
            ].basicIncome`) as unknown as string;
          //@ts-ignore
          const firstContract = watch(`applicant[${index}
            ].firstContract`) as unknown as string;
          return (
            editingIndex === index && (
              <MuiDialog
                key={field.id}
                isOpen={openDialog}
                handleClose={() => {
                  handleClose(index);
                }}
                formId="applicant-form"
                title={t("LoanMortgage.IncomeModal.title")}
                description=""
              >
                <Form
                  methods={methods}
                  id="applicant-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`applicant[${index}].nationality`}
                    labelName={t("LoanMortgage.policyholder.citizenship")}
                    options={[
                      {
                        label: t("LoanMortgage.policyholder.polish"),
                        value: "polish",
                      },
                      {
                        label: t("LoanMortgage.policyholder.other"),
                        value: "other",
                      },
                    ]}
                    defaultValue={field.nationality || "polish"}
                  />
                  {nationality === "other" && (
                    <>
                      <Input
                        name={`applicant[${index}].otherNation`}
                        labelName={t(
                          "LoanMortgage.policyholder.otherCitizenship"
                        )}
                        type="text"
                        placeholder="Nation"
                        defaultValue={field.otherNation || ""}
                      />

                      <Radio
                        name={`applicant[${index}].residenceDocument`}
                        labelName={t(
                          "LoanMortgage.policyholder.residenceDocument"
                        )}
                        options={[
                          {
                            label: t("LoanMortgage.policyholder.temporaryCard"),
                            value: "temporaryCard",
                          },
                          {
                            label: t("LoanMortgage.policyholder.permanentCard"),
                            value: "permanentCard",
                          },
                          {
                            label: t("LoanMortgage.policyholder.blueCard"),
                            value: "blueCard",
                          },
                        ]}
                        defaultValue={
                          field.residenceDocument || "temporaryCard"
                        }
                      />
                      <DateInput
                        name={`applicant[${index}].validFrom`}
                        labelName={t("LoanMortgage.policyholder.validFrom")}
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.validFrom}
                      />
                      {residenceDocument !== "permanentCard" && (
                        <DateInput
                          name={`applicant[${index}].validUntil`}
                          labelName={t("LoanMortgage.policyholder.validUntil")}
                          disablePast
                          placeholder={t("Form.Placeholder.dateFull")}
                          defaultValue={field.validUntil || null}
                        />
                      )}
                    </>
                  )}
                  <Input
                    name={`applicant[${index}].name`}
                    labelName={t("LoanMortgage.policyholder.name")}
                    type="text"
                    autoComplete="name"
                    defaultValue={field.name || ""}
                  />

                  <DateInput
                    name={`applicant[${index}].birthDate`}
                    labelName={t("LoanMortgage.policyholder.birthDate")}
                    placeholder={t("Form.Placeholder.dateFull")}
                    defaultValue={field.birthDate}
                  />
                  <MuiPhoneInput
                    name={`applicant[${index}].phoneNumber`}
                    labelName={t("LoanMortgage.policyholder.phoneNumber")}
                    defaultValue={field.phoneNumber}
                  />
                  <Input
                    name={`applicant[${index}].email`}
                    labelName={t("LoanMortgage.policyholder.email")}
                    type="text"
                    defaultValue={field.email}
                  />
                  <Input
                    name={`applicant[${index}].pesel`}
                    labelName={t("LoanMortgage.policyholder.pesel")}
                    type="text"
                    defaultValue={field.pesel}
                  />

                  <Radio
                    name={`applicant[${index}].basicIncome`}
                    labelName={t("LoanMortgage.policyholder.basicIncome")}
                    options={[
                      {
                        label: t("LoanMortgage.policyholder.indefinitePeriod"),
                        value: "indefinitePeriod",
                      },
                      {
                        label: t("LoanMortgage.policyholder.specificTime"),
                        value: "specificTime",
                      },
                      {
                        label: t("LoanMortgage.policyholder.mandate"),
                        value: "mandate",
                      },
                      {
                        label: t("LoanMortgage.policyholder.contract"),
                        value: "contract",
                      },
                      {
                        label: t("LoanMortgage.policyholder.economicActivity"),
                        value: "economicActivity",
                      },
                    ]}
                    defaultValue={field.basicIncome || "indefinitePeriod"}
                  />
                  {(basicIncome === "specificTime" ||
                    basicIncome === "mandate" ||
                    basicIncome === "contract") && (
                    <>
                      <Radio
                        name={`applicant[${index}].firstContract`}
                        labelName={t("LoanMortgage.policyholder.firstContract")}
                        options={[
                          {
                            label: t("LoanMortgage.policyholder.yes"),
                            value: "yes",
                          },
                          {
                            label: t("LoanMortgage.policyholder.no"),
                            value: "no",
                          },
                        ]}
                        defaultValue={field.firstContract || "yes"}
                      />
                      {firstContract === "no" && (
                        <>
                          <Radio
                            name={`applicant[${index}].sameEmployer`}
                            labelName={t(
                              "LoanMortgage.policyholder.sameEmployer"
                            )}
                            options={[
                              {
                                label: t("LoanMortgage.policyholder.yes"),
                                value: "yes",
                              },
                              {
                                label: t("LoanMortgage.policyholder.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.sameEmployer || "yes"}
                          />

                          <Radio
                            name={`applicant[${index}].withoutPause`}
                            labelName={t(
                              "LoanMortgage.policyholder.withoutPause"
                            )}
                            options={[
                              {
                                label: t("LoanMortgage.policyholder.yes"),
                                value: "yes",
                              },
                              {
                                label: t("LoanMortgage.policyholder.no"),
                                value: "no",
                              },
                            ]}
                            defaultValue={field.withoutPause || "yes"}
                          />
                        </>
                      )}
                      <DateInput
                        name={`applicant[${index}].contractFrom`}
                        labelName={t("LoanMortgage.policyholder.contractFrom")}
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractFrom}
                      />
                      <DateInput
                        name={`applicant[${index}].contractUntil`}
                        labelName={t("LoanMortgage.policyholder.contractUntil")}
                        disablePast
                        placeholder={t("Form.Placeholder.dateFull")}
                        defaultValue={field.contractUntil}
                      />
                    </>
                  )}
                  {basicIncome === "mandate" && (
                    <Input
                      name={`applicant[${index}].averageIncome`}
                      labelName={t("LoanMortgage.policyholder.averageIncome12")}
                      type="text"
                      defaultValue={field.averageIncome}
                    />
                  )}
                  {basicIncome === "specificTime" && (
                    <Input
                      name={`applicant[${index}].averageIncome`}
                      labelName={t("LoanMortgage.policyholder.averageIncome6")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome}
                    />
                  )}
                  {basicIncome === "economicActivity" && (
                    <>
                      <Radio
                        name={`applicant[${index}].accountancy`}
                        labelName={t("LoanMortgage.policyholder.accountancy")}
                        options={[
                          {
                            label: t("LoanMortgage.policyholder.generalRules"),
                            value: "generalRules",
                          },
                          {
                            label: t("LoanMortgage.policyholder.lumpSum"),
                            value: "lumpSum",
                          },
                          {
                            label: t("LoanMortgage.policyholder.taxCard"),
                            value: "taxCard",
                          },
                          {
                            label: t(
                              "LoanMortgage.policyholder.fullAccounting"
                            ),
                            value: "fullAccounting",
                          },
                        ]}
                        defaultValue={field.accountancy || "generalRules"}
                      />
                      <Input
                        name={`applicant[${index}].averageIncome`}
                        labelName={t(
                          "LoanMortgage.policyholder.averageIncome6"
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
                    <Input
                      name={`applicant[${index}].averageIncome`}
                      labelName={t("LoanMortgage.policyholder.averageIncome3")}
                      type="text"
                      placeholder="value"
                      defaultValue={field.averageIncome}
                    />
                  )}
                  <Input
                    name={`applicant[${index}].currency`}
                    labelName={t("LoanMortgage.policyholder.currency")}
                    type="text"
                    placeholder="PLN"
                    defaultValue={field.currency}
                  />
                  <Input
                    name={`applicant[${index}].pit`}
                    labelName={t("LoanMortgage.policyholder.pit")}
                    type="text"
                    placeholder="value"
                    defaultValue={field.pit}
                  />
                  <Input
                    name={`applicant[${index}].bank`}
                    labelName={t("LoanMortgage.policyholder.bank")}
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
            <FormBuilder.Applicant
              key={field.id}
              error={!!errors.applicant?.[index]}
            >
              {/* @ts-ignore */}
              <FormBuilder.AvatarStyled>
                {applicant?.[0] || ""}
              </FormBuilder.AvatarStyled>
              <FormBuilder.ApplicantName>{applicant}</FormBuilder.ApplicantName>
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
            <PersonAddIcon />
            <span>{t("insuranceSpecialist.ApplicantBox.addApplicant")}</span>
          </FormBuilder.ApplicantAdd>
        </FormBuilder.ApplicantBox>
      ) : (
        fields.length < maxFields && (
          <FormBuilder.ApplicantBox
            onClick={() => {
              append({ name: "" });
              setAddingMode(true);
              setEditingMode(true);
              setOpenDialog(true);
              setEditingIndex(fields.length);
            }}
          >
            <FormBuilder.ApplicantAdd>
              <PersonAddIcon />
              <span>{t("insuranceSpecialist.ApplicantBox.addApplicant")}</span>
            </FormBuilder.ApplicantAdd>
          </FormBuilder.ApplicantBox>
        )
      )}
      <FormBuilder.ButtonsWrap>
        <Button color="primary" form="form" onClick={finalizeForm}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};
export default Page1;
