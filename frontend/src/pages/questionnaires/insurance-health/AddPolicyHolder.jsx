import React from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { policyholderSchema } from "./applicationHelpers/insuranceHealthSchema";

import { ButtonsWrap } from "../LocalStyles";
import { MuiInput, MuiRadio, DateInput } from "@components/input";
import { Modal } from "@components/modals";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

const AddPolicyHolder = ({
  openModal,
  setOpenModal,
  insuredData,
  setInsuredData,
  defaultPerson,
  isEditing,
  setIsEditing,
}) => {
  const { t } = useTranslation();
  const { appData } = useData();

  const appDataValid = validateAppData(
    appData.insuranceHealth["InsuredData"] || appData,
    defaultPerson
  );

  const {
    handleSubmit,
    control,
    watch,

    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(policyholderSchema()),
  });

  const documentType = watch("policyholderIs") || appDataValid.policyholderIs;

  const addPolicyHolderSubmit = (data) => {
    if (isEditing) {
      data.documentType =
        documentType === "polish"
          ? t("InsuranceHealth.ApplicantModal.pesel")
          : t("InsuranceHealth.ApplicantModal.passport");
      let newInsured = [...insuredData];
      newInsured[defaultPerson] = data;
      setIsEditing(false);
      setInsuredData(newInsured);
    } else {
      data.documentType =
        documentType === "polish"
          ? t("InsuranceHealth.ApplicantModal.pesel")
          : t("InsuranceHealth.ApplicantModal.passport");
      setInsuredData((prevData) => [...prevData, data]);
    }
    setOpenModal(false);
  };

  return (
    openModal && (
      <Modal
        header={t("InsuranceHealth.ApplicantModal.addApplicant")}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Form id="modal-form" onSubmit={handleSubmit(addPolicyHolderSubmit)}>
          <MuiRadio
            control={control}
            name="policyholderIs"
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
            defaultChecked={appDataValid.policyholderIs || "polish"}
          />
          {documentType === "foreigner" && (
            <MuiInput
              control={control}
              name="citizenship"
              labelName={t("InsuranceHealth.ApplicantModal.citizenship")}
              type="text"
              error={!!errors.citizenship}
              helperText={errors?.citizenship?.message}
              placeholder="Type here"
              defaultValue={appDataValid.citizenship}
            />
          )}
          <MuiInput
            control={control}
            name="documentAdded"
            labelName={`${
              documentType === "polish"
                ? t("InsuranceHealth.ApplicantModal.pesel")
                : t("InsuranceHealth.ApplicantModal.passport")
            }`}
            type="text"
            error={!!errors.documentAdded}
            helperText={errors?.documentAdded?.message}
            placeholder="XXXXXXXXXXX"
            defaultValue={appDataValid.documentAdded}
          />
          <MuiInput
            control={control}
            name="name"
            labelName={t("InsuranceHealth.ApplicantModal.name")}
            type="text"
            error={!!errors.name}
            helperText={errors?.name?.message}
            placeholder="John"
            autoComplete="given-name"
            defaultValue={appDataValid.name}
          />
          <MuiInput
            control={control}
            name="surname"
            labelName={t("InsuranceHealth.ApplicantModal.surname")}
            type="text"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            placeholder="Doe"
            autoComplete="family-name"
            defaultValue={appDataValid.surname}
          />
          <DateInput
            control={control}
            name="birthDate"
            labelName={t("InsuranceHealth.Page2.birthDate")}
            error={!!errors.birthDate}
            helperText={errors?.birthDate?.message}
            defaultDate={appDataValid.birthDate}
          />
          <MuiInput
            control={control}
            name="country"
            labelName={t("InsuranceHealth.ApplicantModal.country")}
            type="text"
            error={!!errors.country}
            helperText={errors?.country?.message}
            placeholder="Poland"
            defaultValue={appDataValid.country}
          />
          <MuiInput
            control={control}
            name="city"
            labelName={t("InsuranceHealth.ApplicantModal.city")}
            type="text"
            error={!!errors.city}
            helperText={errors?.city?.message}
            placeholder="Warsaw"
            defaultValue={appDataValid.city}
          />
          <MuiInput
            control={control}
            name="postIndex"
            labelName={t("InsuranceHealth.ApplicantModal.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            placeholder="123-45"
            defaultValue={appDataValid.postIndex}
          />
          <MuiInput
            control={control}
            name="street"
            labelName={t("InsuranceHealth.ApplicantModal.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
            placeholder="Bialostocka"
            defaultValue={appDataValid.street}
          />
          <MuiInput
            control={control}
            name="houseNumber"
            labelName={t("InsuranceHealth.ApplicantModal.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
            placeholder="14"
            defaultValue={appDataValid.houseNumber}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenModal(false)}
          />
          <CTA color="primary" text={t("Basic.buttonAdd")} form="modal-form" />
        </ButtonsWrap>
      </Modal>
    )
  );
};

export default AddPolicyHolder;
