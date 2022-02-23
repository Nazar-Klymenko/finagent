import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
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

import { policyholderValue } from "./helpers/default-values";
import { policyholderSchema } from "./helpers/insurance-specialist.schema";

type FormTypes = {
  policyholder: [
    {
      policyholderIs: string;
      name: string;
      surname: string;
      birthDate: any;
      nip: string;
      pesel: string;
      regon: string;
      phoneNumber: string;
      email: string;
      country: string;
      city: string;
      postIndex: string;
      street: string;
      houseNumber: string;
    }
  ];
};

const Page2 = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = appData?.insuranceSpecialist?.insuredData?.policyholder;

  const methods = useForm<FormTypes>({
    defaultValues: {
      policyholder: [
        {
          policyholderIs: appDataValid?.[0]?.policyholderIs || "firm",
          name: appDataValid?.[0]?.name || "",
          surname: appDataValid?.[0]?.surname || "",
          nip: appDataValid?.[0]?.nip || "",
          birthDate: appDataValid?.[0]?.birthDate || null,
          pesel: appDataValid?.[0]?.pesel || "",
          regon: appDataValid?.[0]?.regon || "",
          phoneNumber: appDataValid?.[0]?.phoneNumber || "",
          email: appDataValid?.[0]?.email || "",
          country: appDataValid?.[0]?.country || "",
          city: appDataValid?.[0]?.city || "",
          postIndex: appDataValid?.[0]?.postIndex || "",
          street: appDataValid?.[0]?.street || "",
          houseNumber: appDataValid?.[0]?.houseNumber || "",
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(policyholderSchema()),
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "policyholder",
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
    if (formInitiated && fields.length > 0 && !!errors.policyholder === false) {
      setAllowSummary(true);
      router.push("./summary");
    } else {
      alert(t("InsuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <PageContainer xs title="InsuranceDiagnostic.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceDiagnostic.title")}</Typography>
      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("InsuranceDiagnostic.ApplicantBox.title")}
      />
      <Typography variant="h6">
        {t("InsuranceDiagnostic.ApplicantBox.title")}
      </Typography>
      {editingMode &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          let policyholderIs = watch(`policyholder[${index}].policyholderIs`);
          return (
            editingIndex === index && (
              <MuiDialog
                key={field.id}
                isOpen={openDialog}
                handleClose={() => {
                  handleClose(index);
                }}
                formId="insured-data-form"
                title={t("InsuranceDiagnostic.ApplicantBox.title")}
                description=""
              >
                <Form
                  methods={methods}
                  id="insured-data-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`policyholder[${index}].policyholderIs`}
                    labelName={t("InsuranceDiagnostic.Page1.policyholderIs")}
                    options={[
                      {
                        label: t("InsuranceDiagnostic.Page1.firm"),
                        value: "firm",
                      },
                      {
                        label: t("InsuranceDiagnostic.Page1.individual"),
                        value: "individual",
                      },
                      {
                        label: t("InsuranceDiagnostic.Page1.legal"),
                        value: "legal",
                      },
                    ]}
                    defaultValue={field.policyholderIs || ""}
                  />
                  <Input
                    name={`policyholder[${index}].name`}
                    labelName={t(
                      `InsuranceDiagnostic.Page1.${
                        policyholderIs === "individual" ? "name" : "companyName"
                      }`
                    )}
                    autoComplete="given-name"
                    defaultValue={field.name || ""}
                  />
                  {policyholderIs === "individual" && (
                    <Input
                      name={`policyholder[${index}].surname`}
                      labelName={t("InsuranceDiagnostic.Page1.surname")}
                      autoComplete="family-name"
                      defaultValue={field.surname || ""}
                    />
                  )}

                  {policyholderIs !== "individual" && (
                    <Input
                      name={`policyholder[${index}].nip`}
                      labelName={t("InsuranceDiagnostic.Page1.nip")}
                      defaultValue={field.nip || ""}
                    />
                  )}
                  {policyholderIs === "individual" && (
                    <DateInput
                      name={`policyholder[${index}].birthDate`}
                      labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                      defaultValue={field.birthDate}
                      placeholder={t("Form.Placeholder.dateFull")}
                    />
                  )}
                  {policyholderIs === "individual" && (
                    <Input
                      name={`policyholder[${index}].pesel`}
                      labelName={t("InsuranceDiagnostic.Page1.pesel")}
                      defaultValue={field.pesel || ""}
                    />
                  )}
                  {policyholderIs !== "individual" && (
                    <Input
                      name={`policyholder[${index}].regon`}
                      labelName={t("InsuranceDiagnostic.Page1.regon")}
                      defaultValue={field.regon || ""}
                    />
                  )}
                  <MuiPhoneInput
                    name={`policyholder[${index}].phoneNumber`}
                    labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
                    defaultValue={field.phoneNumber || ""}
                  />
                  <Input
                    name={`policyholder[${index}].email`}
                    labelName={t("InsuranceDiagnostic.Page1.email")}
                    defaultValue={field.email || ""}
                  />
                  <Input
                    name={`policyholder[${index}].country`}
                    labelName={t("InsuranceDiagnostic.Page1.country")}
                    defaultValue={field.country || ""}
                  />
                  <Input
                    name={`policyholder[${index}].city`}
                    labelName={t("InsuranceDiagnostic.Page1.city")}
                    defaultValue={field.city || ""}
                  />
                  <Input
                    name={`policyholder[${index}].postIndex`}
                    labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                    defaultValue={field.postIndex || ""}
                  />
                  <Input
                    name={`policyholder[${index}].street`}
                    labelName={t("InsuranceDiagnostic.Page1.street")}
                    defaultValue={field.street || ""}
                  />
                  <Input
                    name={`policyholder[${index}].houseNumber`}
                    labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
                    defaultValue={field.houseNumber || ""}
                  />
                </Form>
              </MuiDialog>
            )
          );
        })}
      {formInitiated &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          let policyholder = watch(`policyholder[${index}].name`);
          return (
            <FormBuilder.Applicant
              key={field.id}
              error={!!errors.policyholder?.[index]}
            >
              <FormBuilder.AvatarStyled>
                {policyholder?.[0] || ""}
              </FormBuilder.AvatarStyled>
              <FormBuilder.ApplicantName>
                {policyholder}
              </FormBuilder.ApplicantName>
              <IconButton
                onClick={() => {
                  editData(index);
                }}
                size="large"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  removeData(index);
                }}
                size="large"
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
            <span>{t("InsuranceDiagnostic.ApplicantBox.addApplicant")}</span>
          </FormBuilder.ApplicantAdd>
        </FormBuilder.ApplicantBox>
      ) : (
        fields.length < 14 && (
          <FormBuilder.ApplicantBox
            onClick={() => {
              append({ policyholderIs: "firm", name: "", surname: "" });
              setAddingMode(true);
              setEditingMode(true);
              setOpenDialog(true);
              setEditingIndex(fields.length);
            }}
          >
            <FormBuilder.ApplicantAdd>
              <PersonAddIcon />
              <span>{t("InsuranceDiagnostic.ApplicantBox.addApplicant")}</span>
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
        <Button form="insured-data-form" color="primary" onClick={finalizeForm}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;
