import React from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { addAdditionalIncomeSchema } from "./applicationHelpers/loanMortgageSchema";

import { ButtonsWrap } from "../LocalStyles";
import { Input, RadioGroup, DateInput } from "@components/input";
import { Modal } from "@components/modals";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

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

  const { register, handleSubmit, errors, watch, control } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(addAdditionalIncomeSchema()),
  });

  const truckDriver = watch("truckDriver") || appDataValid.truckDriver;
  const basicIncome = watch("basicIncome") || appDataValid.basicIncome;
  const firstContract = watch("firstContract") || appDataValid.firstContract;

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
      <Modal
        header={t("LoanMortgage.IncomeModal.title")}
        openModal={openIncomeModal}
        setOpenModal={setOpenIncomeModal}
      >
        <Form id="income-form" onSubmit={handleSubmit(AddIncomeSubmit)}>
          <RadioGroup
            name="truckDriver"
            ref={register}
            legend={t("LoanMortgage.IncomeModal.truckDriver")}
            options={[
              {
                label: t("LoanMortgage.IncomeModal.yes"),
                value: "yes",
              },
              {
                label: t("LoanMortgage.IncomeModal.no"),
                value: "no",
              },
            ]}
            defaultChecked={appDataValid.truckDriver || "yes"}
          />
          {truckDriver === "no" && (
            <Input
              ref={register}
              name="industry"
              labelName={t("LoanMortgage.IncomeModal.industry")}
              type="text"
              error={!!errors.industry}
              helperText={errors?.industry?.message}
              placeholder="industry"
              defaultValue={appDataValid.industry}
            />
          )}
          <RadioGroup
            name="basicIncome"
            ref={register}
            legend={t("LoanMortgage.IncomeModal.basicIncome")}
            options={[
              {
                label: t("LoanMortgage.IncomeModal.indefinitePeriod"),
                value: "indefinitePeriod",
              },
              {
                label: t("LoanMortgage.IncomeModal.specificTime"),
                value: "specificTime",
              },
              {
                label: t("LoanMortgage.IncomeModal.mandate"),
                value: "mandate",
              },
              {
                label: t("LoanMortgage.IncomeModal.contract"),
                value: "contract",
              },
              {
                label: t("LoanMortgage.IncomeModal.economicActivity"),
                value: "economicActivity",
              },
            ]}
            defaultChecked={appDataValid.basicIncome || "indefinitePeriod"}
          />

          {(basicIncome === "specificTime" ||
            basicIncome === "mandate" ||
            basicIncome === "contract") && (
            <>
              <RadioGroup
                name="firstContract"
                ref={register}
                legend={t("LoanMortgage.IncomeModal.firstContract")}
                options={[
                  {
                    label: t("LoanMortgage.IncomeModal.yes"),
                    value: "yes",
                  },
                  {
                    label: t("LoanMortgage.IncomeModal.no"),
                    value: "no",
                  },
                ]}
                defaultChecked={appDataValid.firstContract || "yes"}
              />
              {firstContract === "no" && (
                <>
                  <RadioGroup
                    name="sameEmployer"
                    ref={register}
                    legend={t("LoanMortgage.IncomeModal.sameEmployer")}
                    options={[
                      {
                        label: t("LoanMortgage.IncomeModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanMortgage.IncomeModal.no"),
                        value: "no",
                      },
                    ]}
                    defaultChecked={appDataValid.sameEmployer || "yes"}
                  />
                  <RadioGroup
                    name="withoutPause"
                    ref={register}
                    legend={t("LoanMortgage.IncomeModal.withoutPause")}
                    options={[
                      {
                        label: t("LoanMortgage.IncomeModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanMortgage.IncomeModal.no"),
                        value: "no",
                      },
                    ]}
                    defaultChecked={appDataValid.withoutPause || "yes"}
                  />
                </>
              )}
              <DateInput
                control={control}
                name="contractFrom"
                labelName={t("LoanMortgage.IncomeModal.contractFrom")}
                error={!!errors.contractFrom}
                helperText={errors?.contractFrom?.message}
                defaultDate={appDataValid.contractFrom}
              />
              <DateInput
                control={control}
                name="contractUntil"
                labelName={t("LoanMortgage.IncomeModal.contractUntil")}
                error={!!errors.contractUntil}
                helperText={errors?.contractUntil?.message}
                defaultDate={appDataValid.contractUntil}
                disablePastDates
              />
            </>
          )}
          {basicIncome === "mandate" && (
            <Input
              ref={register}
              name="averageIncome"
              labelName={t("LoanMortgage.IncomeModal.averageIncome12")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          {basicIncome === "specificTime" && (
            <Input
              ref={register}
              name="averageIncome"
              labelName={t("LoanMortgage.IncomeModal.averageIncome6")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          {basicIncome === "economicActivity" && (
            <>
              <RadioGroup
                name="accountancy"
                ref={register}
                legend={t("LoanMortgage.IncomeModal.accountancy")}
                options={[
                  {
                    label: t("LoanMortgage.IncomeModal.generalRules"),
                    value: "generalRules",
                  },
                  {
                    label: t("LoanMortgage.IncomeModal.lumpSum"),
                    value: "lumpSum",
                  },
                  {
                    label: t("LoanMortgage.IncomeModal.taxCard"),
                    value: "taxCard",
                  },
                  {
                    label: t("LoanMortgage.IncomeModal.fullAccounting"),
                    value: "fullAccounting",
                  },
                ]}
                defaultChecked={appDataValid.accountancy || "generalRules"}
              />
              <Input
                ref={register}
                name="averageIncome"
                labelName={t("LoanMortgage.IncomeModal.averageIncome6")}
                type="text"
                error={!!errors.averageIncome}
                helperText={errors?.averageIncome?.message}
                placeholder="value"
                defaultValue={appDataValid.averageIncome}
              />
            </>
          )}
          {!(
            basicIncome === "economicActivity" ||
            basicIncome === "mandate" ||
            basicIncome === "specificTime"
          ) && (
            <Input
              ref={register}
              name="averageIncome"
              labelName={t("LoanMortgage.IncomeModal.averageIncome3")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          <Input
            ref={register}
            name="pit"
            labelName={t("LoanMortgage.IncomeModal.pit")}
            type="text"
            error={!!errors.pit}
            helperText={errors?.pit?.message}
            placeholder="value"
            defaultValue={appDataValid.pit}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("LoanMortgage.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenIncomeModal(false)}
          />
          <CTA
            color="primary"
            text={t("LoanMortgage.buttonAdd")}
            form="income-form"
          />
        </ButtonsWrap>
      </Modal>
    )
  );
};

export default AddAdditionalIncome;
