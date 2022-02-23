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
import { DateInput, Input, Radio } from "@components/input";
import { PageContainer } from "@components/layout";

import { policyholderSchema } from "./helpers/insurance-health.schema";

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
  const router = useRouter();
  const { appData, setValues, setAllowSummary } = useData();

  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const appDataValid = appData?.insuranceHealth?.insuredData?.policyholder;

  const methods = useForm<FormTypes>({
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
    <PageContainer xs title="InsuranceHealth.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("InsuranceHealth.title")}</Typography>

      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("InsuranceHealth.ApplicantBox.title")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceHealth.ApplicantBox.title")}
      </Typography>

      <Typography>{t("InsuranceHealth.ApplicantBox.maxPeople")}</Typography>

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
                <Form
                  methods={methods}
                  id="insured-data-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`policyholder.${index}.policyholderIs`}
                    labelName={t("InsuranceHealth.Page2.policyholderIs")}
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
                    <Input
                      name={`policyholder.${index}.citizenship`}
                      labelName={t(
                        "InsuranceHealth.ApplicantModal.citizenship"
                      )}
                      type="text"
                      placeholder="Type here"
                      defaultValue={field.citizenship}
                    />
                  )}
                  <Input
                    name={`policyholder.${index}.documentAdded`}
                    labelName={`${
                      policyholderIs === "polish"
                        ? t("InsuranceHealth.ApplicantModal.pesel")
                        : t("InsuranceHealth.ApplicantModal.passport")
                    }`}
                    type="text"
                    placeholder="XXXXXXXXXXX"
                    defaultValue={field.documentAdded}
                  />
                  <Input
                    name={`policyholder.${index}.name`}
                    labelName={t("InsuranceHealth.ApplicantModal.name")}
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    defaultValue={field.name}
                  />
                  <Input
                    name={`policyholder.${index}.surname`}
                    labelName={t("InsuranceHealth.ApplicantModal.surname")}
                    type="text"
                    placeholder="Doe"
                    autoComplete="family-name"
                    defaultValue={field.surname}
                  />
                  <DateInput
                    name={`policyholder.${index}.birthDate`}
                    labelName={t("InsuranceHealth.Page2.birthDate")}
                    defaultValue={field.birthDate}
                    placeholder={t("Form.Placeholder.dateFull")}
                  />
                  <Input
                    name={`policyholder.${index}.country`}
                    labelName={t("InsuranceHealth.ApplicantModal.country")}
                    type="text"
                    placeholder="Poland"
                    defaultValue={field.country}
                  />
                  <Input
                    name={`policyholder.${index}.city`}
                    labelName={t("InsuranceHealth.ApplicantModal.city")}
                    type="text"
                    placeholder="Warsaw"
                    defaultValue={field.city}
                  />
                  <Input
                    name={`policyholder.${index}.postIndex`}
                    labelName={t("InsuranceHealth.ApplicantModal.postIndex")}
                    placeholder="123-45"
                    defaultValue={field.postIndex}
                  />
                  <Input
                    name={`policyholder.${index}.street`}
                    labelName={t("InsuranceHealth.ApplicantModal.street")}
                    placeholder="Bialostocka"
                    defaultValue={field.street}
                  />
                  <Input
                    name={`policyholder.${index}.houseNumber`}
                    labelName={t("InsuranceHealth.ApplicantModal.houseNumber")}
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
            <FormBuilder.Applicant
              key={field.id}
              error={!!errors.policyholder?.[index]}
            >
              {/* @ts-ignore */}
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
              append({ policyholderIs: "polish", name: "", surname: "" });
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
          color="secondary"
          form=""
          onClick={() => {
            router.push("./1");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button color="primary" form="" onClick={finalizeForm}>
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page2;

//
