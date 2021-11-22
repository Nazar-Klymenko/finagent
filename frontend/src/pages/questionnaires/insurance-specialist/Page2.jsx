import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { DevTool } from "@hookform/devtools";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  ApplicantBox,
  ApplicantAdd,
} from "../LocalStyles";
import {
  MuiInput,
  MuiRadio,
  DateInput,
  MuiPhoneInput,
} from "@components/input";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import ProgressBar from "@components/ProgressBar";
import { useData } from "@context/dataContext";
import { QuestState } from "@dev/QuestState";
import validateAppData from "@helpers/validateAppData";
import MuiDialog from "@components/MuiDialog";
import { useForm, useFieldArray } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { policyholderSchema } from "./applicationHelpers/insurance-specialist.schema";
import Form from "@components/Form";

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Specialists access | FinAgent");

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const { appData, setValues, setAllowSummary } = useData();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(policyholderSchema()),
  });

  const formSubmit = (data) => {
    setValues(data, "insuranceSpecialist", "insuredData");
    setAllowSummary(true);
    history.push("./summary");
  };

  const [policyholderIs, setPolicyholderIs] = useState("firm");

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "test", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceDiagnostic.ApplicantBox.title")}
        />
        <Subtitle>{t("InsuranceDiagnostic.ApplicantBox.title")}</Subtitle>

        <Form id="insured-data-form" onSubmit={handleSubmit(formSubmit)} />
        <MuiDialog
          formId="add-applicant"
          handleClose={handleClose}
          isOpen={openDialog}
          title="Add another applicant"
        >
          <Form id="add-applicant">
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
              // defaultValue={
              //   policyHolders[currentlySelected]?.policyholderIs || "firm"
              // }
            />
            <MuiInput
              control={control}
              name="name"
              labelName={t("InsuranceDiagnostic.Page1.name")}
              error={!!errors.name}
              helperText={errors?.name?.message}
              autoComplete="given-name"
              // defaultValue={policyHolders[currentlySelected]?.name}
            />
            {policyholderIs === "individual" && (
              <MuiInput
                control={control}
                name="surname"
                labelName={t("InsuranceDiagnostic.Page1.surname")}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
                autoComplete="family-name"
                // defaultValue={policyHolders[currentlySelected]?.surname}
              />
            )}
            {!(policyholderIs === "individual") && (
              <MuiInput
                control={control}
                name="nip"
                labelName={t("InsuranceDiagnostic.Page1.nip")}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
                // defaultValue={policyHolders[currentlySelected]?.nip}
              />
            )}
            {policyholderIs === "individual" && (
              <DateInput
                control={control}
                name="birthDate"
                labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                error={!!errors.birthDate}
                helperText={errors?.birthDate?.message}
                // defaultValue={policyHolders[currentlySelected]?.birthDate}
              />
            )}
            {policyholderIs === "individual" && (
              <MuiInput
                control={control}
                name="pesel"
                labelName={t("InsuranceDiagnostic.Page1.pesel")}
                error={!!errors.pesel}
                helperText={errors?.pesel?.message}
                // defaultValue={policyHolders[currentlySelected]?.pesel}
              />
            )}
            {!(policyholderIs === "individual") && (
              <MuiInput
                control={control}
                name="regon"
                labelName={t("InsuranceDiagnostic.Page1.regon")}
                error={!!errors.regon}
                helperText={errors?.regon?.message}
                // defaultValue={policyHolders[currentlySelected]?.regon}
              />
            )}
            <MuiPhoneInput
              control={control}
              name="phoneNumber"
              labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors?.phoneNumber?.message}
              // defaultValue={policyHolders[currentlySelected]?.phoneNumber}
            />
            <MuiInput
              control={control}
              name="email"
              labelName={t("InsuranceDiagnostic.Page1.email")}
              error={!!errors.email}
              helperText={errors?.email?.message}
              // defaultValue={policyHolders[currentlySelected]?.email}
            />
            <MuiInput
              control={control}
              name="country"
              labelName={t("InsuranceDiagnostic.Page1.country")}
              error={!!errors.country}
              helperText={errors?.country?.message}
              // defaultValue={policyHolders[currentlySelected]?.country}
            />
            <MuiInput
              control={control}
              name="city"
              labelName={t("InsuranceDiagnostic.Page1.city")}
              error={!!errors.city}
              helperText={errors?.city?.message}
              // defaultValue={policyHolders[currentlySelected]?.city}
            />
            <MuiInput
              control={control}
              name="postIndex"
              labelName={t("InsuranceDiagnostic.Page1.postIndex")}
              error={!!errors.postIndex}
              helperText={errors?.postIndex?.message}
              // defaultValue={policyHolders[currentlySelected]?.postIndex}
            />
            <MuiInput
              control={control}
              name="street"
              labelName={t("InsuranceDiagnostic.Page1.street")}
              error={!!errors.street}
              helperText={errors?.street?.message}
              // defaultValue={policyHolders[currentlySelected]?.street}
            />
            <MuiInput
              control={control}
              name="houseNumber"
              labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
              error={!!errors.houseNumber}
              helperText={errors?.houseNumber?.message}
              // defaultValue={policyHolders[currentlySelected]?.houseNumber}
            />
          </Form>
        </MuiDialog>

        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            color="secondary"
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            large={true}
            text={t("Basic.buttonNext")}
            form="insured-data-form"
            color="primary"
          />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page2;

// const [policyHolders, setPolicyHolders] = useState([]);
// const [currentlySelected, setCurretlySelected] = useState(null);
// const [editingMode, setEditingMode] = useState(false);

// const editPolicyHolder = (idx) => {
//   setEditingMode(true);
//   setCurretlySelected(idx);
//   handleClickOpen();
// };
// const deletePolicyHolder = (idx) => {
//   let newArr = [...policyHolders];
//   newArr.splice(idx, 1);
//   setPolicyHolders(newArr);
// };

// const addPolicyHolderSubmit = (data) => {
//   if (editingMode) {
//     let newArr = [...policyHolders];
//     newArr[currentlySelected] = data;
//     setPolicyHolders(newArr);
//     setEditingMode(false);
//     setCurretlySelected(null);
//   } else {
//     setPolicyHolders((previousValue) => [...previousValue, data]);
//   }
//   handleClose();
// };

// useEffect(() => {
//   let testpolicyholderIs = watch(`policyholderIs`);

//   if (editingMode) {
//     setPolicyholderIs(policyHolders[currentlySelected].policyholderIs);
//   } else {
//     setPolicyholderIs(testpolicyholderIs);
//   }
// }, [policyHolders, currentlySelected, editingMode, watch]);

// {isError && <ErrorBottom>{isError}</ErrorBottom>}

// {
//   /* {appDataValid.length > 0 &&
//             appDataValid.map((person, idx) => (
//               <div key={idx} className="person">
//                 <div className="minor-data-place">
//                   <span>{person.name}</span>
//                   <span>{person.surname}</span>
//                 </div>
//                 <div className="action-place">
//                   <span
//                     className="edit"
//                     onClick={() => {
//                       setOpenModal(true);
//                     }}
//                   >
//                     {t("InsuranceDiagnostic.ApplicantBox.edit")}
//                   </span>
//                   <span className="delete" value={idx}>
//                     {t("InsuranceDiagnostic.ApplicantBox.delete")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             */
// }

// const appDataValid = validateAppData(
//   appData,
//   "insuranceSpecialist",
//   "insuredData"
// );

// const addPolicyHolderSubmit = (data) => {
//   if (editingMode) {
//     let newArr = [...policyHolders];
//     newArr[currentlySelected] = data;
//     setPolicyHolders(newArr);
//     setEditingMode(false);
//     setCurretlySelected(null);
//   } else {
//     setPolicyHolders((previousValue) => [...previousValue, data]);
//   }
//   handleClose();
// };

const Applicant = styled.div`
  display: flex;
`;

const ApplicantName = styled.span`
  flex: 1;
`;

// {
//   /* {policyHolders.length > 0 &&
//           policyHolders.map((policyHolder, idx) => (
//             <Applicant key={idx}>
//               <ApplicantName>{policyHolder.name}</ApplicantName>
//               <EditIcon
//                 onClick={() => {
//                   editPolicyHolder(idx);
//                 }}
//               />
//               <DeleteIcon
//                 onClick={() => {
//                   deletePolicyHolder(idx);
//                 }}
//               />
//             </Applicant>
//           ))} */
// }

// {
//   /* <ApplicantBox>
//           {policyHolders.length < 14 && (
//             <ApplicantAdd onClick={handleClickOpen}>
//               {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
//             </ApplicantAdd>
//           )}
//         </ApplicantBox> */
// }
