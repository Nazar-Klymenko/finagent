import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import validateAppData from "@helpers/validateAppData";

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

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Specialists access | FinAgent");

  const [openDialog, setOpenDialog] = useState(true);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
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
  } = useForm({
    defaultValues: {
      policyholder: [
        {
          policyholderIs: "firm",
          name: "",
          surname: "",
          nip: "",
          birthDate: "",
          pesel: "",
          regon: "",
          phoneNumber: "",
          email: "",
          contry: "",
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

  const formSubmit = (data) => {
    setFormInitiated(true);
    setEditingMode(false);
    // setValues(data, "insuranceSpecialist", "insuredData");
    // setAllowSummary(true);
    // history.push("./summary");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "policyholder",
  });

  const policyholders = useWatch({ control, name: "policyholder" });
  const policyholderIs = useWatch({
    control,
    name: `policyholder[${editingIndex}].policyholderIs`,
  });

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
          fields.map((field, index) => {
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
                  <Form
                    id="insured-data-form"
                    onSubmit={handleSubmit(formSubmit)}
                  >
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
                      defaultValue={
                        policyholders[editingIndex]?.policyholderIs || ""
                      }
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].name`}
                      labelName={t("InsuranceDiagnostic.Page1.name")}
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      autoComplete="given-name"
                      defaultValue={policyholders[editingIndex]?.name || ""}
                    />
                    {policyholderIs === "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].surname`}
                        labelName={t("InsuranceDiagnostic.Page1.surname")}
                        error={!!errors.surname}
                        helperText={errors?.surname?.message}
                        autoComplete="family-name"
                        defaultValue={
                          policyholders[editingIndex]?.surname || ""
                        }
                      />
                    )}
                    {policyholderIs !== "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].nip`}
                        labelName={t("InsuranceDiagnostic.Page1.nip")}
                        error={!!errors.nip}
                        helperText={errors?.nip?.message}
                        defaultValue={policyholders[editingIndex]?.nip || ""}
                      />
                    )}
                    {policyholderIs === "individual" && (
                      <DateInput
                        control={control}
                        name={`policyholder[${index}].birthDate`}
                        labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                        error={!!errors.birthDate}
                        helperText={errors?.birthDate?.message}
                        defaultValue={
                          policyholders[editingIndex]?.birthDate || ""
                        }
                      />
                    )}
                    {policyholderIs === "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].pesel`}
                        labelName={t("InsuranceDiagnostic.Page1.pesel")}
                        error={!!errors.pesel}
                        helperText={errors?.pesel?.message}
                        defaultValue={policyholders[editingIndex]?.pesel || ""}
                      />
                    )}
                    {policyholderIs !== "individual" && (
                      <MuiInput
                        control={control}
                        name={`policyholder[${index}].regon`}
                        labelName={t("InsuranceDiagnostic.Page1.regon")}
                        error={!!errors.regon}
                        helperText={errors?.regon?.message}
                        defaultValue={policyholders[editingIndex]?.regon || ""}
                      />
                    )}
                    <MuiPhoneInput
                      control={control}
                      name={`policyholder[${index}].phoneNumber`}
                      labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors?.phoneNumber?.message}
                      defaultValue={
                        policyholders[editingIndex]?.phoneNumber || ""
                      }
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].email`}
                      labelName={t("InsuranceDiagnostic.Page1.email")}
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      defaultValue={policyholders[editingIndex]?.email || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].country`}
                      labelName={t("InsuranceDiagnostic.Page1.country")}
                      error={!!errors.country}
                      helperText={errors?.country?.message}
                      defaultValue={policyholders[editingIndex]?.country || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].city`}
                      labelName={t("InsuranceDiagnostic.Page1.city")}
                      error={!!errors.city}
                      helperText={errors?.city?.message}
                      defaultValue={policyholders[editingIndex]?.city || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].postIndex`}
                      labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                      error={!!errors.postIndex}
                      helperText={errors?.postIndex?.message}
                      defaultValue={
                        policyholders[editingIndex]?.postIndex || ""
                      }
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].street`}
                      labelName={t("InsuranceDiagnostic.Page1.street")}
                      error={!!errors.street}
                      helperText={errors?.street?.message}
                      defaultValue={policyholders[editingIndex]?.street || ""}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder[${index}].houseNumber`}
                      labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
                      error={!!errors.houseNumber}
                      helperText={errors?.houseNumber?.message}
                      defaultValue={
                        policyholders[editingIndex]?.houseNumber || ""
                      }
                    />
                  </Form>
                </MuiDialog>
              )
            );
          })}

        {formInitiated &&
          policyholders.map((field, index) => (
            <Applicant>
              <AvatarStyled>{field.name[0] || ""}</AvatarStyled>
              <ApplicantName>{field.name}</ApplicantName>

              <IconButton>
                <EditIcon
                  onClick={() => {
                    setEditingMode(true);
                    setEditingIndex(index);
                    setOpenDialog(true);
                  }}
                />
              </IconButton>

              <IconButton>
                <DeleteIcon
                  onClick={() => {
                    remove(index);
                  }}
                />
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
        <DevTool control={control} placement="bottom-right" />
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
