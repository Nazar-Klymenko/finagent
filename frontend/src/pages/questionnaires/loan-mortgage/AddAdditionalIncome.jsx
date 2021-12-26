import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import { MuiButton } from "@components/buttons";
import { DateInput, MuiInput, MuiRadio } from "@components/input";

import { ButtonsWrap } from "../LocalStyles";
import { addAdditionalIncomeSchema } from "./applicationHelpers/loan-mortgage.schema";

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
  return null;

  // return (
  //   openIncomeModal && (
  //     <Modal
  //       header={t("LoanMortgage.IncomeModal.title")}
  //       openModal={openIncomeModal}
  //       setOpenModal={setOpenIncomeModal}
  //     >
  //       <Form id="income-form" onSubmit={handleSubmit(AddIncomeSubmit)}>
  //         <MuiRadio
  //           control={control}
  //           name="truckDriver"
  //           legend={t("LoanMortgage.IncomeModal.truckDriver")}
  //           options={[
  //             {
  //               label: t("LoanMortgage.IncomeModal.yes"),
  //               value: "yes",
  //             },
  //             {
  //               label: t("LoanMortgage.IncomeModal.no"),
  //               value: "no",
  //             },
  //           ]}
  //           defaultValue={appDataValid.truckDriver || "yes"}
  //         />
  //         {truckDriver === "no" && (
  //           <MuiInput
  //             control={control}
  //             name="industry"
  //             labelName={t("LoanMortgage.IncomeModal.industry")}
  //             type="text"
  //             error={!!errors.industry}
  //             helperText={errors?.industry?.message}
  //             placeholder="industry"
  //             defaultValue={appDataValid.industry}
  //           />
  //         )}

  //         <MuiRadio
  //           control={control}
  //           name="basicIncome"
  //           legend={t("LoanMortgage.IncomeModal.basicIncome")}
  //           options={[
  //             {
  //               label: t("LoanMortgage.IncomeModal.indefinitePeriod"),
  //               value: "indefinitePeriod",
  //             },
  //             {
  //               label: t("LoanMortgage.IncomeModal.specificTime"),
  //               value: "specificTime",
  //             },
  //             {
  //               label: t("LoanMortgage.IncomeModal.mandate"),
  //               value: "mandate",
  //             },
  //             {
  //               label: t("LoanMortgage.IncomeModal.contract"),
  //               value: "contract",
  //             },
  //             {
  //               label: t("LoanMortgage.IncomeModal.economicActivity"),
  //               value: "economicActivity",
  //             },
  //           ]}
  //           defaultValue={appDataValid.basicIncome || "indefinitePeriod"}
  //         />

  //         {(basicIncome === "specificTime" ||
  //           basicIncome === "mandate" ||
  //           basicIncome === "contract") && (
  //           <>
  //             <MuiRadio
  //               control={control}
  //               name="firstContract"
  //               legend={t("LoanMortgage.IncomeModal.firstContract")}
  //               options={[
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.yes"),
  //                   value: "yes",
  //                 },
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.no"),
  //                   value: "no",
  //                 },
  //               ]}
  //               defaultValue={appDataValid.firstContract || "yes"}
  //             />
  //             {firstContract === "no" && (
  //               <>
  //                 <MuiRadio
  //                   control={control}
  //                   name="sameEmployer"
  //                   legend={t("LoanMortgage.IncomeModal.sameEmployer")}
  //                   options={[
  //                     {
  //                       label: t("LoanMortgage.IncomeModal.yes"),
  //                       value: "yes",
  //                     },
  //                     {
  //                       label: t("LoanMortgage.IncomeModal.no"),
  //                       value: "no",
  //                     },
  //                   ]}
  //                   defaultValue={appDataValid.sameEmployer || "yes"}
  //                 />

  //                 <MuiRadio
  //                   control={control}
  //                   name="withoutPause"
  //                   legend={t("LoanMortgage.IncomeModal.withoutPause")}
  //                   options={[
  //                     {
  //                       label: t("LoanMortgage.IncomeModal.yes"),
  //                       value: "yes",
  //                     },
  //                     {
  //                       label: t("LoanMortgage.IncomeModal.no"),
  //                       value: "no",
  //                     },
  //                   ]}
  //                   defaultValue={appDataValid.withoutPause || "yes"}
  //                 />
  //               </>
  //             )}
  //             <DateInput
  //               control={control}
  //               name="contractFrom"
  //               labelName={t("LoanMortgage.IncomeModal.contractFrom")}
  //               error={!!errors.contractFrom}
  //               helperText={errors?.contractFrom?.message}
  //               defaultValue={appDataValid.contractFrom}
  //             />
  //             <DateInput
  //               control={control}
  //               name="contractUntil"
  //               labelName={t("LoanMortgage.IncomeModal.contractUntil")}
  //               error={!!errors.contractUntil}
  //               helperText={errors?.contractUntil?.message}
  //               defaultValue={appDataValid.contractUntil}
  //               disablePast
  //             />
  //           </>
  //         )}
  //         {basicIncome === "mandate" && (
  //           <MuiInput
  //             control={control}
  //             name="averageIncome"
  //             labelName={t("LoanMortgage.IncomeModal.averageIncome12")}
  //             type="text"
  //             error={!!errors.averageIncome}
  //             helperText={errors?.averageIncome?.message}
  //             placeholder="value"
  //             defaultValue={appDataValid.averageIncome}
  //           />
  //         )}
  //         {basicIncome === "specificTime" && (
  //           <MuiInput
  //             control={control}
  //             name="averageIncome"
  //             labelName={t("LoanMortgage.IncomeModal.averageIncome6")}
  //             type="text"
  //             error={!!errors.averageIncome}
  //             helperText={errors?.averageIncome?.message}
  //             placeholder="value"
  //             defaultValue={appDataValid.averageIncome}
  //           />
  //         )}
  //         {basicIncome === "economicActivity" && (
  //           <>
  //             <MuiRadio
  //               control={control}
  //               name="accountancy"
  //               legend={t("LoanMortgage.IncomeModal.accountancy")}
  //               options={[
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.generalRules"),
  //                   value: "generalRules",
  //                 },
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.lumpSum"),
  //                   value: "lumpSum",
  //                 },
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.taxCard"),
  //                   value: "taxCard",
  //                 },
  //                 {
  //                   label: t("LoanMortgage.IncomeModal.fullAccounting"),
  //                   value: "fullAccounting",
  //                 },
  //               ]}
  //               defaultValue={appDataValid.accountancy || "generalRules"}
  //             />
  //             <MuiInput
  //               control={control}
  //               name="averageIncome"
  //               labelName={t("LoanMortgage.IncomeModal.averageIncome6")}
  //               type="text"
  //               error={!!errors.averageIncome}
  //               helperText={errors?.averageIncome?.message}
  //               placeholder="value"
  //               defaultValue={appDataValid.averageIncome}
  //             />
  //           </>
  //         )}
  //         {!(
  //           basicIncome === "economicActivity" ||
  //           basicIncome === "mandate" ||
  //           basicIncome === "specificTime"
  //         ) && (
  //           <MuiInput
  //             control={control}
  //             name="averageIncome"
  //             labelName={t("LoanMortgage.IncomeModal.averageIncome3")}
  //             type="text"
  //             error={!!errors.averageIncome}
  //             helperText={errors?.averageIncome?.message}
  //             placeholder="value"
  //             defaultValue={appDataValid.averageIncome}
  //           />
  //         )}
  //         <MuiInput
  //           control={control}
  //           name="pit"
  //           labelName={t("LoanMortgage.IncomeModal.pit")}
  //           type="text"
  //           error={!!errors.pit}
  //           helperText={errors?.pit?.message}
  //           placeholder="value"
  //           defaultValue={appDataValid.pit}
  //         />
  //       </Form>
  //       <ButtonsWrap multiple>
  //         <MuiButton
  //           text={t("Basic.buttonBack")}
  //           form=""
  //           color="secondary"
  //           onClick={() => setOpenIncomeModal(false)}
  //         />
  //         <MuiButton
  //           color="primary"
  //           text={t("Basic.buttonAdd")}
  //           form="income-form"
  //         />
  //       </ButtonsWrap>
  //     </Modal>
  //   )
  // );
};

export default AddAdditionalIncome;
