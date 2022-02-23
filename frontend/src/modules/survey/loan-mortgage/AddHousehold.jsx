import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { Input } from "@components/input";
import Modal from "@components/modals/Modal";

import { ButtonsWrap } from "../LocalStyles";
import { addHouseholdSchema } from "./applicationHelpers/loan-mortgage.schema";

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

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
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
            control={control}
            name="peopleInHousehold"
            labelName={t("LoanMortgage.HouseholdModal.peopleInHousehold")}
            type="text"
            error={!!errors.peopleInHousehold}
            helperText={errors?.peopleInHousehold?.message}
            placeholder="number"
            defaultValue={appDataValid.peopleInHousehold}
          />
          <Input
            control={control}
            name="monthlyExpenses"
            labelName={t("LoanMortgage.HouseholdModal.monthlyExpenses")}
            type="text"
            error={!!errors.monthlyExpenses}
            helperText={errors?.monthlyExpenses?.message}
            placeholder="number"
            defaultValue={appDataValid.monthlyExpenses}
          />
        </Form>
        <FormBuilder.ButtonsWrap multiple>
          <Button
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenModal(false)}
          />
          <Button
            color="primary"
            text={t("Basic.buttonAdd")}
            form="household-form"
          />
        </FormBuilder.ButtonsWrap>
      </Modal>
    )
  );
};

export default AddHousehold;
