import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";

import { FormBuilder } from "@components/FormBuilder";

const useReactHookFormFieldArray = (
  appDataValid: any,
  remove: any,
  append: any,
  fields: any
) => {
  const [openDialog, setOpenDialog] = useState(true);
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [addingMode, setAddingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  function removeData(index: number) {
    remove(index);
    appDataValid.splice(index, 1);
  }

  const onArraySubmit = () => {
    setFormInitiated(true);
    setEditingMode(false);
    setAddingMode(false);
  };

  function handleClose(index: number) {
    if (addingMode) {
      removeData(index);
      setAddingMode(false);
    } else {
      setOpenDialog(false);
    }
  }
  function editData(index: number) {
    setEditingMode(true);
    setEditingIndex(index);
    setOpenDialog(true);
  }

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

  const AppendedBox = (): JSX.Element => {
    {
      formInitiated &&
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
        });
    }
    {
      !formInitiated ? (
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
      );
    }
  };

  return {
    openDialog,
    formInitiated,
    editingMode,
    addingMode,
    editingIndex,
    setOpenDialog,
    handleClose,
  };
};

export { useReactHookFormFieldArray };
