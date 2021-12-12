import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import { CTA } from "@components/buttons";
import { DateInput, MuiInput, MuiRadio } from "@components/input";
import { Modal } from "@components/modals";

import { ButtonsWrap } from "../LocalStyles";
import { addAdditionalIncomeSchema } from "./applicationHelpers/loan-cash.schema";

const AddAdditionalIncome = ({
  openIncomeModal,
  setOpenIncomeModal,
  incomeData,
  setIncomeData,
  defaultIncome,
  isEditing,
  setIsEditing,
}) => {
  const { t } = useTranslation();
  const { appData } = useData();
  const appDataValid = validateAppData(
    appData["AdditionalIncome"] || appData,
    defaultIncome
  );

  const {
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(addAdditionalIncomeSchema()),
  });

  const AddIncomeSubmit = (data) => {
    if (isEditing) {
      let newInsured = [...incomeData];
      newInsured[defaultIncome] = data;
      setIsEditing(false);
      setIncomeData(newInsured);
    } else {
      setIncomeData((prevData) => [...prevData, data]);
    }
    setOpenIncomeModal(false);
  };

  return (
    openIncomeModal && (
      <Modal openModal={openIncomeModal} setOpenModal={setOpenIncomeModal}>
        <Form id="income-form" onSubmit={handleSubmit(AddIncomeSubmit)}></Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenIncomeModal(false)}
          />
          <CTA color="primary" text={t("Basic.buttonAdd")} form="income-form" />
        </ButtonsWrap>
      </Modal>
    )
  );
};

export default AddAdditionalIncome;
