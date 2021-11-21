import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAdditionalIncomeSchema } from "./applicationHelpers/loanCashSchema";
import { useTranslation } from "react-i18next";
import { ButtonsWrap } from "../LocalStyles";
import { MuiInput, MuiRadio, DateInput } from "@components/input";
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

  const {
    handleSubmit,
    watch,
    control,

    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
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
        header={t("LoanCash.IncomeModal.title")}
        openModal={openIncomeModal}
        setOpenModal={setOpenIncomeModal}
      >
        <Form id="income-form" onSubmit={handleSubmit(AddIncomeSubmit)}>
          <MuiRadio
            control={control}
            name="truckDriver"
            legend={t("LoanCash.IncomeModal.truckDriver")}
            options={[
              {
                label: t("LoanCash.IncomeModal.yes"),
                value: "yes",
              },
              {
                label: t("LoanCash.IncomeModal.no"),
                value: "no",
              },
            ]}
            defaultChecked={appDataValid.truckDriver || "yes"}
          />
          {truckDriver === "no" && (
            <MuiInput
              control={control}
              name="industry"
              labelName={t("LoanCash.IncomeModal.industry")}
              type="text"
              error={!!errors.industry}
              helperText={errors?.industry?.message}
              placeholder="industry"
              defaultValue={appDataValid.industry}
            />
          )}

          <MuiRadio
            control={control}
            name="basicIncome"
            legend={t("LoanCash.IncomeModal.basicIncome")}
            options={[
              {
                label: t("LoanCash.IncomeModal.indefinitePeriod"),
                value: "indefinitePeriod",
              },
              {
                label: t("LoanCash.IncomeModal.specificTime"),
                value: "specificTime",
              },
              {
                label: t("LoanCash.IncomeModal.mandate"),
                value: "mandate",
              },
              {
                label: t("LoanCash.IncomeModal.contract"),
                value: "contract",
              },
              {
                label: t("LoanCash.IncomeModal.economicActivity"),
                value: "economicActivity",
              },
            ]}
            defaultChecked={appDataValid.basicIncome || "indefinitePeriod"}
          />

          {(basicIncome === "specificTime" ||
            basicIncome === "mandate" ||
            basicIncome === "contract") && (
            <>
              <MuiRadio
                control={control}
                name="firstContract"
                legend={t("LoanCash.IncomeModal.firstContract")}
                options={[
                  {
                    label: t("LoanCash.IncomeModal.yes"),
                    value: "yes",
                  },
                  {
                    label: t("LoanCash.IncomeModal.no"),
                    value: "no",
                  },
                ]}
                defaultChecked={appDataValid.firstContract || "yes"}
              />
              {firstContract === "no" && (
                <>
                  <MuiRadio
                    control={control}
                    name="sameEmployer"
                    legend={t("LoanCash.IncomeModal.sameEmployer")}
                    options={[
                      {
                        label: t("LoanCash.IncomeModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanCash.IncomeModal.no"),
                        value: "no",
                      },
                    ]}
                    defaultChecked={appDataValid.sameEmployer || "yes"}
                  />

                  <MuiRadio
                    control={control}
                    name="withoutPause"
                    legend={t("LoanCash.IncomeModal.withoutPause")}
                    options={[
                      {
                        label: t("LoanCash.IncomeModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanCash.IncomeModal.no"),
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
                labelName={t("LoanCash.IncomeModal.contractFrom")}
                error={!!errors.contractFrom}
                helperText={errors?.contractFrom?.message}
                defaultDate={appDataValid.contractFrom}
              />
              <DateInput
                control={control}
                name="contractUntil"
                labelName={t("LoanCash.IncomeModal.contractUntil")}
                error={!!errors.contractUntil}
                helperText={errors?.contractUntil?.message}
                defaultDate={appDataValid.contractUntil}
                disablePast
              />
            </>
          )}
          {basicIncome === "mandate" && (
            <MuiInput
              control={control}
              name="averageIncome"
              labelName={t("LoanCash.IncomeModal.averageIncome12")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          {basicIncome === "specificTime" && (
            <MuiInput
              control={control}
              name="averageIncome"
              labelName={t("LoanCash.IncomeModal.averageIncome6")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          {basicIncome === "economicActivity" && (
            <>
              <MuiRadio
                control={control}
                name="accountancy"
                legend={t("LoanCash.IncomeModal.accountancy")}
                options={[
                  {
                    label: t("LoanCash.IncomeModal.generalRules"),
                    value: "generalRules",
                  },
                  {
                    label: t("LoanCash.IncomeModal.lumpSum"),
                    value: "lumpSum",
                  },
                  {
                    label: t("LoanCash.IncomeModal.taxCard"),
                    value: "taxCard",
                  },
                  {
                    label: t("LoanCash.IncomeModal.fullAccounting"),
                    value: "fullAccounting",
                  },
                ]}
                defaultChecked={appDataValid.accountancy || "generalRules"}
              />
              <MuiInput
                control={control}
                name="averageIncome"
                labelName={t("LoanCash.IncomeModal.averageIncome6")}
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
            <MuiInput
              control={control}
              name="averageIncome"
              labelName={t("LoanCash.IncomeModal.averageIncome3")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          <MuiInput
            control={control}
            name="pit"
            labelName={t("LoanCash.IncomeModal.pit")}
            type="text"
            error={!!errors.pit}
            helperText={errors?.pit?.message}
            placeholder="value"
            defaultValue={appDataValid.pit}
          />
        </Form>
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
