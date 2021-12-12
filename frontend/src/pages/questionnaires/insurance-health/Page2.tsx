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
import { policyholderSchema } from "./applicationHelpers/insurance-health.schema";

type FormTypes = {
  policyholder: [
    {
      policyholderIs: string;
      citizenship: string;
      name: string;
      surname: string;
      documentAdded: string;
      birthDate: Date;
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
  useTitle("Health insurance | FinAgent");
  const history = useHistory();
  const { appData, setValues, setAllowSummary } = useData();

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const appDataValid = appData?.insuranceHealth?.insuredData?.policyholder;

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      policyholder: [
        {
          policyholderIs: appDataValid?.[0]?.policyholderIs || "polish",
          citizenship: appDataValid?.[0]?.citizenship || "",
          name: appDataValid?.[0]?.name || "",
          surname: appDataValid?.[0]?.surname || "",
          birthDate: appDataValid?.[0]?.birthDate || null,
          documentAdded: appDataValid?.[0]?.documentAdded || null,
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
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceHealth.ApplicantBox.title")}
        />
        <Subtitle>{t("InsuranceHealth.ApplicantBox.title")}</Subtitle>
        <p>{t("InsuranceHealth.ApplicantBox.maxPeople")}</p>

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
                      legend={t("InsuranceHealth.Page2.policyholderIs")}
                      options={[
                        {
                          label: t("InsuranceHealth.Page2.polish"),
                          value: "polish",
                        },
                        {
                          label: t("InsuranceHealth.Page2.foreigner"),
                          value: "foreigner",
                        },
                      ]}
                      defaultValue={field.policyholderIs || "polish"}
                    />
                    {policyholderIs === "foreigner" && (
                      <MuiInput
                        control={control}
                        name={`policyholder.${index}.citizenship`}
                        labelName={t(
                          "InsuranceHealth.ApplicantModal.citizenship"
                        )}
                        type="text"
                        error={!!errors.policyholder?.[index].citizenship}
                        helperText={
                          errors?.policyholder?.[index].citizenship?.message
                        }
                        placeholder="Type here"
                        defaultValue={field.citizenship}
                      />
                    )}
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.documentAdded`}
                      labelName={`${
                        policyholderIs === "polish"
                          ? t("InsuranceHealth.ApplicantModal.pesel")
                          : t("InsuranceHealth.ApplicantModal.passport")
                      }`}
                      type="text"
                      error={!!errors.policyholder?.[index].documentAdded}
                      helperText={
                        errors?.policyholder?.[index].documentAdded?.message
                      }
                      placeholder="XXXXXXXXXXX"
                      defaultValue={field.documentAdded}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.name`}
                      labelName={t("InsuranceHealth.ApplicantModal.name")}
                      type="text"
                      error={!!errors.policyholder?.[index].name}
                      helperText={errors?.policyholder?.[index].name?.message}
                      placeholder="John"
                      autoComplete="given-name"
                      defaultValue={field.name}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.surname`}
                      labelName={t("InsuranceHealth.ApplicantModal.surname")}
                      type="text"
                      error={!!errors.policyholder?.[index].surname}
                      helperText={
                        errors?.policyholder?.[index].surname?.message
                      }
                      placeholder="Doe"
                      autoComplete="family-name"
                      defaultValue={field.surname}
                    />
                    <DateInput
                      control={control}
                      name={`policyholder.${index}.birthDate`}
                      labelName={t("InsuranceHealth.Page2.birthDate")}
                      error={!!errors.policyholder?.[index].birthDate}
                      helperText={
                        errors?.policyholder?.[index].birthDate?.message
                      }
                      defaultValue={field.birthDate}
                      placeholder={t("Form.Placeholder.dateFull")}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.country`}
                      labelName={t("InsuranceHealth.ApplicantModal.country")}
                      type="text"
                      error={!!errors.policyholder?.[index].country}
                      helperText={
                        errors?.policyholder?.[index].country?.message
                      }
                      placeholder="Poland"
                      defaultValue={field.country}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.city`}
                      labelName={t("InsuranceHealth.ApplicantModal.city")}
                      type="text"
                      error={!!errors.policyholder?.[index].city}
                      helperText={errors?.policyholder?.[index].city?.message}
                      placeholder="Warsaw"
                      defaultValue={field.city}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.postIndex`}
                      labelName={t("InsuranceHealth.ApplicantModal.postIndex")}
                      error={!!errors.policyholder?.[index].postIndex}
                      helperText={
                        errors?.policyholder?.[index].postIndex?.message
                      }
                      placeholder="123-45"
                      defaultValue={field.postIndex}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.street`}
                      labelName={t("InsuranceHealth.ApplicantModal.street")}
                      error={!!errors.policyholder?.[index].street}
                      helperText={errors?.policyholder?.[index].street?.message}
                      placeholder="Bialostocka"
                      defaultValue={field.street}
                    />
                    <MuiInput
                      control={control}
                      name={`policyholder.${index}.houseNumber`}
                      labelName={t(
                        "InsuranceHealth.ApplicantModal.houseNumber"
                      )}
                      error={!!errors.policyholder?.[index].houseNumber}
                      helperText={
                        errors?.policyholder?.[index].houseNumber?.message
                      }
                      defaultValue={field.houseNumber}
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
                {/* @ts-ignore */}
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
                append({ policyholderIs: "polish", name: "", surname: "" });
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
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            large={true}
            text={t("Basic.buttonNext")}
            color="primary"
            form=""
            onClick={finalizeForm}
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;

//
