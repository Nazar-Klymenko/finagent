import React, { useState } from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
      birthDate: Date;
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

  const handleClose = () => {
    setOpenDialog(false);
  };
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const { appData, setValues, setAllowSummary } = useData();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      policyholder: [
        {
          policyholderIs: "firm",
          name: "",
          surname: "",
          nip: "",
          birthDate: undefined,
          pesel: "",
          regon: "",
          phoneNumber: "",
          email: "",
          country: "",
          city: "",
          postIndex: "",
          street: "",
          houseNumber: "",
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(policyholderSchema()),
  });

  const formSubmit = handleSubmit((data) => {
    setFormInitiated(true);
    setEditingMode(false);
    setValues(data, "insuranceSpecialist", "insuredData");
    // setAllowSummary(true);
    // history.push("./summary");
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "policyholder",
  });

  const policyholders = useWatch({ control, name: "policyholder" });

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
            return (
              editingIndex === index && (
                <MuiDialog
                  key={field.id}
                  isOpen={openDialog}
                  handleClose={handleClose}
                  formId="insured-data-form"
                  title="test"
                  description="test"
                >
                  <Form id="insured-data-form" onSubmit={formSubmit}>
                    <MuiRadio
                      control={control}
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
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].name`}
                      labelName={t("InsuranceDiagnostic.Page1.name")}
                      error={!!errors.policyholder?.[index].name}
                      helperText={errors?.policyholder?.[index].name?.message}
                      autoComplete="given-name"
                      defaultValue={field.value || ""}
                    />
                    {policyholders[editingIndex]?.policyholderIs ===
                      "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].surname`}
                        labelName={t("InsuranceDiagnostic.Page1.surname")}
                        error={!!errors.policyholder?.[index].surname}
                        helperText={
                          errors?.policyholder?.[index]?.surname?.message
                        }
                        autoComplete="family-name"
                        defaultValue={field.value || ""}
                      />
                    )}
                    {policyholders[editingIndex]?.policyholderIs !==
                      "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].nip`}
                        labelName={t("InsuranceDiagnostic.Page1.nip")}
                        error={!!errors.policyholder?.[index].nip}
                        helperText={errors?.policyholder?.[index].nip?.message}
                        defaultValue={field.value || ""}
                      />
                    )}
                    {policyholders[editingIndex]?.policyholderIs ===
                      "individual" && (
                      <DateInput
                        control={control}
                        name={`policyholder[${index}].birthDate`}
                        labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                        error={!!errors.policyholder?.[index].birthDate}
                        helperText={
                          errors?.policyholder?.[index].birthDate?.message
                        }
                        defaultValue={field.value || ""}
                        placeholder={t("Form.Placeholder.dateFull")}
                      />
                    )}
                    {policyholders[editingIndex]?.policyholderIs ===
                      "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].pesel`}
                        labelName={t("InsuranceDiagnostic.Page1.pesel")}
                        error={!!errors.policyholder?.[index].pesel}
                        helperText={
                          errors?.policyholder?.[index].pesel?.message
                        }
                        defaultValue={field.value || ""}
                      />
                    )}
                    {policyholders[editingIndex]?.policyholderIs !==
                      "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].regon`}
                        labelName={t("InsuranceDiagnostic.Page1.regon")}
                        error={!!errors.policyholder?.[index].regon}
                        helperText={
                          errors?.policyholder?.[index].regon?.message
                        }
                        defaultValue={field.value || ""}
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
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].email`}
                      labelName={t("InsuranceDiagnostic.Page1.email")}
                      error={!!errors.policyholder?.[index].email}
                      helperText={errors?.policyholder?.[index].email?.message}
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].country`}
                      labelName={t("InsuranceDiagnostic.Page1.country")}
                      error={!!errors.policyholder?.[index].country}
                      helperText={
                        errors?.policyholder?.[index].country?.message
                      }
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].city`}
                      labelName={t("InsuranceDiagnostic.Page1.city")}
                      error={!!errors.policyholder?.[index].city}
                      helperText={errors?.policyholder?.[index].city?.message}
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].postIndex`}
                      labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                      error={!!errors.policyholder?.[index].postIndex}
                      helperText={
                        errors?.policyholder?.[index].postIndex?.message
                      }
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].street`}
                      labelName={t("InsuranceDiagnostic.Page1.street")}
                      error={!!errors.policyholder?.[index].street}
                      helperText={errors?.policyholder?.[index].street?.message}
                      defaultValue={field.value || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].houseNumber`}
                      labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
                      error={!!errors.policyholder?.[index].houseNumber}
                      helperText={
                        errors?.policyholder?.[index].houseNumber?.message
                      }
                      defaultValue={field.value || ""}
                    />
                  </Form>
                </MuiDialog>
              )
            );
          })}
        {formInitiated &&
          policyholders.map((field: any, index: number) => (
            <Applicant key={field.id}>
              <AvatarStyled>{field.name[0] || ""}</AvatarStyled>
              <ApplicantName>{field.name}</ApplicantName>

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
                  remove(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Applicant>
          ))}
        {!formInitiated && (
          <ApplicantBox>
            <ApplicantAdd
              onClick={() => {
                setEditingMode(true);
                setOpenDialog(true);
              }}
            >
              {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
            </ApplicantAdd>
          </ApplicantBox>
        )}
        {formInitiated && fields.length < 14 && (
          <ApplicantBox>
            <ApplicantAdd
              onClick={() => {
                append({ policyholderIs: "firm", name: "", surname: "" });
                setEditingMode(true);
                setOpenDialog(true);
                setEditingIndex(fields.length);
              }}
            >
              {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
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

const Applicant = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.gray};
  padding: 8px 14px;
  border-radius: 4px;
  margin: 6px 0px;
  align-items: center;
`;

const ApplicantName = styled.span`
  flex: 1;
  margin-left: 8px;
`;
