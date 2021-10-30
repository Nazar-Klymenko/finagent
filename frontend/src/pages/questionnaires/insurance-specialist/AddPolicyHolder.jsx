import React from "react";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { policyholderSchema } from "./applicationHelpers/specialistAccessSchema";

import { ButtonsWrap } from "../LocalStyles";
import { Input, MuiRadio, DateInput, PhoneInput } from "@components/input";
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
    appData["InsuredData"] || appData,
    defaultPerson
  );

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(policyholderSchema()),
  });

  const policyholderIs = watch("policyholderIs") || appDataValid.policyholderIs;

  const addPolicyHolderSubmit = (data) => {
    if (isEditing) {
      let newInsured = [...insuredData];
      newInsured[defaultPerson] = data;
      setIsEditing(false);
      setInsuredData(newInsured);
    } else {
      setInsuredData((prevData) => [...prevData, data]);
    }
    setOpenModal(false);
  };

  return (
    openModal && (
      <Modal
        header={t("InsuranceDiagnostic.ApplicantModal.title")}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Form id="modal-form" onSubmit={handleSubmit(addPolicyHolderSubmit)}>
          <MuiRadio
            control={control}
            name="policyholderIs"
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
            defaultChecked={appDataValid.policyholderIs || "firm"}
          />
          <Input
            ref={register}
            name="name"
            labelName={t("InsuranceDiagnostic.Page1.name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
            defaultValue={appDataValid.name}
          />
          {policyholderIs === "individual" && (
            <Input
              ref={register}
              name="surname"
              labelName={t("InsuranceDiagnostic.Page1.surname")}
              error={!!errors.surname}
              helperText={errors?.surname?.message}
              autoComplete="family-name"
              defaultValue={appDataValid.surname}
            />
          )}
          {!(policyholderIs === "individual") && (
            <Input
              ref={register}
              name="nip"
              labelName={t("InsuranceDiagnostic.Page1.nip")}
              error={!!errors.nip}
              helperText={errors?.nip?.message}
              defaultValue={appDataValid.nip}
            />
          )}
          {policyholderIs === "individual" && (
            <DateInput
              control={control}
              name="birthDate"
              labelName={t("InsuranceDiagnostic.Page1.birthDate")}
              error={!!errors.birthDate}
              helperText={errors?.birthDate?.message}
              defaultDate={appDataValid.birthDate}
            />
          )}
          {policyholderIs === "individual" && (
            <Input
              ref={register}
              name="pesel"
              labelName={t("InsuranceDiagnostic.Page1.pesel")}
              error={!!errors.pesel}
              helperText={errors?.pesel?.message}
              defaultValue={appDataValid.pesel}
            />
          )}
          {!(policyholderIs === "individual") && (
            <Input
              ref={register}
              name="regon"
              labelName={t("InsuranceDiagnostic.Page1.regon")}
              error={!!errors.regon}
              helperText={errors?.regon?.message}
              defaultValue={appDataValid.regon}
            />
          )}
          <PhoneInput
            ref={register}
            name="phoneNumber"
            labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            defaultValue={appDataValid.phoneNumber}
          />
          <Input
            ref={register}
            name="email"
            labelName={t("InsuranceDiagnostic.Page1.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            defaultValue={appDataValid.email}
          />
          <Input
            ref={register}
            name="country"
            labelName={t("InsuranceDiagnostic.Page1.country")}
            error={!!errors.country}
            helperText={errors?.country?.message}
            defaultValue={appDataValid.country}
          />
          <Input
            ref={register}
            name="city"
            labelName={t("InsuranceDiagnostic.Page1.city")}
            error={!!errors.city}
            helperText={errors?.city?.message}
            defaultValue={appDataValid.city}
          />
          <Input
            ref={register}
            name="postIndex"
            labelName={t("InsuranceDiagnostic.Page1.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            defaultValue={appDataValid.postIndex}
          />
          <Input
            ref={register}
            name="street"
            labelName={t("InsuranceDiagnostic.Page1.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
            defaultValue={appDataValid.street}
          />
          <Input
            ref={register}
            name="houseNumber"
            labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
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
