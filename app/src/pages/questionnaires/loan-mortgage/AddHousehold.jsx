import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { addHouseholdSchema } from "./applicationHelpers/loanMortgageSchema";

import { useTranslation } from "react-i18next";

import { ButtonsWrap } from "../LocalStyles";
import { Input } from "@components/input";

import Modal from "@components/modals/Modal";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

const AddHousehold = ({
  openModal,
  setOpenModal,
  householdData,
  setHouseholdData,
  defaultHousehold,
  isEditing,
  setIsEditing,
}) => {
  const { t } = useTranslation();
  const { appData } = useData();

  const appDataValid = validateAppData(
    appData["HouseholdData"] || appData,
    defaultHousehold
  );

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(addHouseholdSchema()),
  });

  const AddHouseholdSubmit = (data) => {
    if (isEditing) {
      let newInsured = [...householdData];
      newInsured[defaultHousehold] = data;
      setIsEditing(false);
      setHouseholdData(newInsured);
    } else {
      setHouseholdData((prevData) => [...prevData, data]);
    }
    setOpenModal(false);
  };

  return (
    openModal && (
      <Modal
        header={t("LoanMortgage.HouseholdModal.title")}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Form id="household-form" onSubmit={handleSubmit(AddHouseholdSubmit)}>
          <Input
            ref={register}
            name="peopleInHousehold"
            labelName={t("LoanMortgage.HouseholdModal.peopleInHousehold")}
            type="text"
            error={!!errors.peopleInHousehold}
            helperText={errors?.peopleInHousehold?.message}
            placeholder="number"
            defaultValue={appDataValid.peopleInHousehold}
          />
          <Input
            ref={register}
            name="monthlyExpenses"
            labelName={t("LoanMortgage.HouseholdModal.monthlyExpenses")}
            type="text"
            error={!!errors.monthlyExpenses}
            helperText={errors?.monthlyExpenses?.message}
            placeholder="number"
            defaultValue={appDataValid.monthlyExpenses}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("LoanMortgage.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenModal(false)}
          />
          <CTA
            color="primary"
            text={t("LoanMortgage.buttonAdd")}
            form="household-form"
          />
        </ButtonsWrap>
      </Modal>
    )
  );
};

export default AddHousehold;
