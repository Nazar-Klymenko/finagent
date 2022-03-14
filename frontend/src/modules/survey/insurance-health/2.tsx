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
      documentAdded: string;
      birthDate: Date | null;
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

  //@ts-ignore
  const appDataValid = appData.insuranceHealth.insuredData?.policyholder;

  const methods = useForm<FormTypes>({
    defaultValues: {
      policyholder: [
        {
          policyholderIs: appDataValid?.[0]?.policyholderIs,
          name: appDataValid?.[0]?.name,
          citizenship: appDataValid?.[0]?.citizenship,
          birthDate: appDataValid?.[0]?.birthDate,
          documentAdded: appDataValid?.[0]?.documentAdded,
          country: appDataValid?.[0]?.country,
          city: appDataValid?.[0]?.city,
          postIndex: appDataValid?.[0]?.postIndex,
          street: appDataValid?.[0]?.street,
          houseNumber: appDataValid?.[0]?.houseNumber,
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
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
    setValues(data, "insuranceHealth", "insuredData");
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
      alert(t("insuranceHealth.Error.noApplicant"));
    }
  };

  return (
    <PageContainer xs title="insuranceHealth.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceHealth.title")}</Typography>

      <ProgressBar
        maxSteps={2}
        currentStep={2}
        label={t("insuranceHealth.ApplicantBox.title")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceHealth.ApplicantBox.title")}
      </Typography>

      <Typography>{t("insuranceHealth.ApplicantBox.maxPeople")}</Typography>

      {editingMode &&
        fields.map((field: any, index: number) => {
          //@ts-ignore
          let policyholderIs = watch(
            `policyholder.${index}.policyholderIs`
          ) as unknown as string;
          return (
            editingIndex === index && (
              <MuiDialog
                key={field.id}
                isOpen={openDialog}
                handleClose={() => {
                  handleClose(index);
                }}
                formId="insured-data-form"
                title={t("insuranceSpecialist.ApplicantBox.title")}
                description=""
              >
                <Form
                  methods={methods}
                  id="insured-data-form"
                  onSubmit={formSubmit}
                >
                  <Radio
                    name={`policyholder.${index}.policyholderIs`}
                    labelName={t("insuranceHealth.Page2.policyholderIs")}
                    options={[
                      {
                        label: t("insuranceHealth.Page2.polish"),
                        value: "polish",
                      },
                      {
                        label: t("insuranceHealth.Page2.foreigner"),
                        value: "foreigner",
                      },
                    ]}
                    defaultValue={field.policyholderIs || "polish"}
                  />
                  {policyholderIs === "foreigner" && (
                    <Input
                      name={`policyholder.${index}.citizenship`}
                      labelName={t(
                        "insuranceHealth.ApplicantModal.citizenship"
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
                        ? t("insuranceHealth.ApplicantModal.pesel")
                        : t("insuranceHealth.ApplicantModal.passport")
                    }`}
                    type="text"
                    placeholder="XXXXXXXXXXX"
                    defaultValue={field.documentAdded}
                  />
                  <Input
                    name={`policyholder.${index}.name`}
                    labelName={t("insuranceHealth.ApplicantModal.name")}
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    defaultValue={field.name}
                  />

                  <DateInput
                    name={`policyholder.${index}.birthDate`}
                    labelName={t("insuranceHealth.Page2.birthDate")}
                    defaultValue={field.birthDate}
                    placeholder={t("Form.Placeholder.dateFull")}
                  />
                  <Input
                    name={`policyholder.${index}.country`}
                    labelName={t("insuranceHealth.ApplicantModal.country")}
                    type="text"
                    placeholder="Poland"
                    defaultValue={field.country}
                  />
                  <Input
                    name={`policyholder.${index}.city`}
                    labelName={t("insuranceHealth.ApplicantModal.city")}
                    type="text"
                    placeholder="Warsaw"
                    defaultValue={field.city}
                  />
                  <Input
                    name={`policyholder.${index}.postIndex`}
                    labelName={t("insuranceHealth.ApplicantModal.postIndex")}
                    placeholder="123-45"
                    defaultValue={field.postIndex}
                  />
                  <Input
                    name={`policyholder.${index}.street`}
                    labelName={t("insuranceHealth.ApplicantModal.street")}
                    placeholder="Bialostocka"
                    defaultValue={field.street}
                  />
                  <Input
                    name={`policyholder.${index}.houseNumber`}
                    labelName={t("insuranceHealth.ApplicantModal.houseNumber")}
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
            <span>{t("insuranceSpecialist.ApplicantBox.addApplicant")}</span>
          </FormBuilder.ApplicantAdd>
        </FormBuilder.ApplicantBox>
      ) : (
        fields.length < 14 && (
          <FormBuilder.ApplicantBox
            onClick={() => {
              append({ policyholderIs: "polish", name: "" });
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
