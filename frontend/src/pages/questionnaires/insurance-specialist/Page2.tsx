import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import MuiDialog from "@components/MuiDialog";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
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
import { policyholderValue } from "./applicationHelpers/default-values";
import { policyholderSchema } from "./applicationHelpers/insurance-specialist.schema";

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
  const history = useHistory();
  useTitle("Specialists access | FinAgent");

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = appData?.insuranceSpecialist?.insuredData?.policyholder;

  const methods = useForm<FormTypes>({
    defaultValues: policyholderValue(appDataValid),
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
      history.push("./summary");
    } else {
      alert(t("InsuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceDiagnostic.ApplicantBox.title")}
        />
        <Subtitle>{t("InsuranceDiagnostic.ApplicantBox.title")}</Subtitle>
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
                    <MuiRadio
                      name={`policyholder[${index}].policyholderIs`}
                      legend={t("InsuranceDiagnostic.Page1.policyholderIs")}
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
                    <MuiInput
                      name={`policyholder[${index}].name`}
                      labelName={t("InsuranceDiagnostic.Page1.name")}
                      autoComplete="given-name"
                      defaultValue={field.name || ""}
                    />
                    {policyholderIs === "individual" && (
                      <MuiInput
                        name={`policyholder[${index}].surname`}
                        labelName={t("InsuranceDiagnostic.Page1.surname")}
                        autoComplete="family-name"
                        defaultValue={field.surname || ""}
                      />
                    )}

                    {policyholderIs !== "individual" && (
                      <MuiInput
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
                      <MuiInput
                        name={`policyholder[${index}].pesel`}
                        labelName={t("InsuranceDiagnostic.Page1.pesel")}
                        defaultValue={field.pesel || ""}
                      />
                    )}
                    {policyholderIs !== "individual" && (
                      <MuiInput
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
                    <MuiInput
                      name={`policyholder[${index}].email`}
                      labelName={t("InsuranceDiagnostic.Page1.email")}
                      defaultValue={field.email || ""}
                    />
                    <MuiInput
                      name={`policyholder[${index}].country`}
                      labelName={t("InsuranceDiagnostic.Page1.country")}
                      defaultValue={field.country || ""}
                    />
                    <MuiInput
                      name={`policyholder[${index}].city`}
                      labelName={t("InsuranceDiagnostic.Page1.city")}
                      defaultValue={field.city || ""}
                    />
                    <MuiInput
                      name={`policyholder[${index}].postIndex`}
                      labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                      defaultValue={field.postIndex || ""}
                    />
                    <MuiInput
                      name={`policyholder[${index}].street`}
                      labelName={t("InsuranceDiagnostic.Page1.street")}
                      defaultValue={field.street || ""}
                    />
                    <MuiInput
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
              <Applicant key={field.id} error={!!errors.policyholder?.[index]}>
                <AvatarStyled>{policyholder?.[0] || ""}</AvatarStyled>
                <ApplicantName>{policyholder}</ApplicantName>
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
          fields.length < 14 && (
            <ApplicantBox
              onClick={() => {
                append({ policyholderIs: "firm", name: "", surname: "" });
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

        <ButtonsWrap multiple>
          <CTA
            form=""
            text={t("Basic.buttonBack")}
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            large={true}
            text={t("Basic.buttonNext")}
            form="insured-data-form"
            color="primary"
            onClick={finalizeForm}
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;
