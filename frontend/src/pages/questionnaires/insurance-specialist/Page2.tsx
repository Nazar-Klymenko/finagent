import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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
  ApplicantAdd,
  ApplicantBox,
  ButtonsWrap,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
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

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormTypes>({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "policyholder",
  });

  function removeData(index: number) {
    remove(index);
    appDataValid.splice(index, 1);
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
      alert("ERROR");
    }
  };

  console.log("rerender");
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
            let policyholderIs = watch(`policyholder.${index}.policyholderIs`);
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
                  <Form id="insured-data-form" onSubmit={formSubmit}>
                    <MuiRadio
                      control={control}
                      name={`policyholder.${index}.policyholderIs`}
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
                      control={control}
                      name={`policyholder.${index}.name`}
                      labelName={t("InsuranceDiagnostic.Page1.name")}
                      error={!!errors.policyholder?.[index].name}
                      helperText={errors?.policyholder?.[index].name?.message}
                      autoComplete="given-name"
                      defaultValue={field.name || ""}
                    />
                    {policyholderIs === "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder.${index}.surname`}
                        labelName={t("InsuranceDiagnostic.Page1.surname")}
                        error={!!errors.policyholder?.[index].surname}
                        helperText={
                          errors?.policyholder?.[index]?.surname?.message
                        }
                        autoComplete="family-name"
                        defaultValue={field.surname || ""}
                      />
                    )}

                    {policyholderIs !== "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].nip`}
                        labelName={t("InsuranceDiagnostic.Page1.nip")}
                        error={!!errors.policyholder?.[index].nip}
                        helperText={errors?.policyholder?.[index].nip?.message}
                        defaultValue={field.nip || ""}
                      />
                    )}
                    {policyholderIs === "individual" && (
                      <DateInput
                        control={control}
                        name={`policyholder[${index}].birthDate`}
                        labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                        error={!!errors.policyholder?.[index].birthDate}
                        helperText={
                          errors?.policyholder?.[index].birthDate?.message
                        }
                        defaultValue={field.birthDate}
                        placeholder={t("Form.Placeholder.dateFull")}
                      />
                    )}
                    {policyholderIs === "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].pesel`}
                        labelName={t("InsuranceDiagnostic.Page1.pesel")}
                        error={!!errors.policyholder?.[index].pesel}
                        helperText={
                          errors?.policyholder?.[index].pesel?.message
                        }
                        defaultValue={field.pesel || ""}
                      />
                    )}
                    {policyholderIs !== "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].regon`}
                        labelName={t("InsuranceDiagnostic.Page1.regon")}
                        error={!!errors.policyholder?.[index].regon}
                        helperText={
                          errors?.policyholder?.[index].regon?.message
                        }
                        defaultValue={field.regon || ""}
                      />
                    )}
                    <MuiPhoneInput
                      control={control}
                      name={`policyholder[${index}].phoneNumber`}
                      labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
                      error={!!errors.policyholder?.[index].phoneNumber}
                      helperText={
                        errors?.policyholder?.[index].phoneNumber?.message
                      }
                      defaultValue={field.phoneNumber || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].email`}
                      labelName={t("InsuranceDiagnostic.Page1.email")}
                      error={!!errors.policyholder?.[index].email}
                      helperText={errors?.policyholder?.[index].email?.message}
                      defaultValue={field.email || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].country`}
                      labelName={t("InsuranceDiagnostic.Page1.country")}
                      error={!!errors.policyholder?.[index].country}
                      helperText={
                        errors?.policyholder?.[index].country?.message
                      }
                      defaultValue={field.country || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].city`}
                      labelName={t("InsuranceDiagnostic.Page1.city")}
                      error={!!errors.policyholder?.[index].city}
                      helperText={errors?.policyholder?.[index].city?.message}
                      defaultValue={field.city || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].postIndex`}
                      labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                      error={!!errors.policyholder?.[index].postIndex}
                      helperText={
                        errors?.policyholder?.[index].postIndex?.message
                      }
                      defaultValue={field.postIndex || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].street`}
                      labelName={t("InsuranceDiagnostic.Page1.street")}
                      error={!!errors.policyholder?.[index].street}
                      helperText={errors?.policyholder?.[index].street?.message}
                      defaultValue={field.street || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].houseNumber`}
                      labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
                      error={!!errors.policyholder?.[index].houseNumber}
                      helperText={
                        errors?.policyholder?.[index].houseNumber?.message
                      }
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
            let policyholder = watch(`policyholder.${index}.name`);
            return (
              <Applicant key={field.id} error={!!errors.policyholder?.[index]}>
                <AvatarStyled>{policyholder?.[0] || ""}</AvatarStyled>
                <ApplicantName>{policyholder}</ApplicantName>
                <IconButton
                  onClick={() => {
                    setEditingMode(true);
                    setEditingIndex(index);
                    setOpenDialog(true);
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
        {!formInitiated && (
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
        )}
        {formInitiated && fields.length < 14 && (
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
              <span>{t("InsuranceDiagnostic.ApplicantBox.addApplicant")}</span>
            </ApplicantAdd>
          </ApplicantBox>
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

const AvatarStyled = styled(Avatar)`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.blue};
`;

const Applicant = styled.div<{ error: boolean }>`
  display: flex;
  border: 1px solid ${({ theme, error }) => (error ? theme.red : theme.gray)};
  padding: 8px 14px;
  border-radius: 4px;
  margin: 6px 0px;
  align-items: center;
`;

const ApplicantName = styled.span`
  flex: 1;
  margin-left: 8px;
`;
