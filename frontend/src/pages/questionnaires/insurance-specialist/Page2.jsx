import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import MuiDialog from "@components/MuiDialog";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
} from "@components/input";

import {
  ApplicantAdd,
  ApplicantBox,
  ButtonsWrap,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import { policyholderSchema } from "./applicationHelpers/insurance-specialist.schema";

const Page2 = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useTitle("Specialists access | FinAgent");

  const [openDialog, setOpenDialog] = useState(true);
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
    defaultValues: {
      policyholder: [{ policyholderIs: "firm", name: "", surname: "" }],
    },
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
      control,
      name: "policyholder",
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
        {/* <MuiDialog
          formId="add-applicant"
          handleClose={handleClose}
          isOpen={openDialog}
          title="Add another applicant"
        > */}
        {fields.map((field, index) => (
          <>
            <MuiRadio
              control={control}
              key={field.id}
              name={`policyholder.${index}.policyholderIs`}
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
            />
            <MuiInput
              control={control}
              key={field.id}
              name={`policyholder.${index}.name`}
              labelName={t("InsuranceDiagnostic.Page1.name")}
              error={!!errors.name}
              helperText={errors?.name?.message}
              autoComplete="given-name"
              // defaultValue={policyHolders[currentlySelected]?.name}
            />
            {policyholderIs === "individual" && (
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.surname`}
                labelName={t("InsuranceDiagnostic.Page1.surname")}
                error={!!errors.surname}
                helperText={errors?.surname?.message}
                autoComplete="family-name"
                // defaultValue={policyHolders[currentlySelected]?.surname}
              />
            )}
            <CTA
              text={t("Basic.buttonBack")}
              color="secondary"
              onClick={() => {
                append({});
              }}
            />
          </>
        ))}
        {/* </MuiDialog> */}

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

/* // defaultValue={
                //   policyHolders[currentlySelected]?.policyholderIs || "firm"
                // } */

/* 
{!(policyholderIs === "individual") && (
                <MuiInput
                  control={control}
                  key={field.id}
                  name={`policyholder.${index}.nip`}
                  labelName={t("InsuranceDiagnostic.Page1.nip")}
                  error={!!errors.nip}
                  helperText={errors?.nip?.message}
                  // defaultValue={policyHolders[currentlySelected]?.nip}
                />
              )}
              {policyholderIs === "individual" && (
                <DateInput
                  control={control}
                  key={field.id}
                  name={`policyholder.${index}.birthDate`}
                  labelName={t("InsuranceDiagnostic.Page1.birthDate")}
                  error={!!errors.birthDate}
                  helperText={errors?.birthDate?.message}
                  // defaultValue={policyHolders[currentlySelected]?.birthDate}
                />
              )}
              {policyholderIs === "individual" && (
                <MuiInput
                  control={control}
                  key={field.id}
                  name={`policyholder.${index}.pesel`}
                  labelName={t("InsuranceDiagnostic.Page1.pesel")}
                  error={!!errors.pesel}
                  helperText={errors?.pesel?.message}
                  // defaultValue={policyHolders[currentlySelected]?.pesel}
                />
              )}
              {!(policyholderIs === "individual") && (
                <MuiInput
                  control={control}
                  key={field.id}
                  name={`policyholder.${index}.regon`}
                  labelName={t("InsuranceDiagnostic.Page1.regon")}
                  error={!!errors.regon}
                  helperText={errors?.regon?.message}
                  // defaultValue={policyHolders[currentlySelected]?.regon}
                />
              )}
              <MuiPhoneInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.phoneNumber`}
                labelName={t("InsuranceDiagnostic.Page1.phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                // defaultValue={policyHolders[currentlySelected]?.phoneNumber}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.email`}
                labelName={t("InsuranceDiagnostic.Page1.email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
                // defaultValue={policyHolders[currentlySelected]?.email}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.country`}
                labelName={t("InsuranceDiagnostic.Page1.country")}
                error={!!errors.country}
                helperText={errors?.country?.message}
                // defaultValue={policyHolders[currentlySelected]?.country}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.city`}
                labelName={t("InsuranceDiagnostic.Page1.city")}
                error={!!errors.city}
                helperText={errors?.city?.message}
                // defaultValue={policyHolders[currentlySelected]?.city}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.postIndex`}
                labelName={t("InsuranceDiagnostic.Page1.postIndex")}
                error={!!errors.postIndex}
                helperText={errors?.postIndex?.message}
                // defaultValue={policyHolders[currentlySelected]?.postIndex}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.street`}
                labelName={t("InsuranceDiagnostic.Page1.street")}
                error={!!errors.street}
                helperText={errors?.street?.message}
                // defaultValue={policyHolders[currentlySelected]?.street}
              />
              <MuiInput
                control={control}
                key={field.id}
                name={`policyholder.${index}.houseNumber`}
                labelName={t("InsuranceDiagnostic.Page1.houseNumber")}
                error={!!errors.houseNumber}
                helperText={errors?.houseNumber?.message}
                // defaultValue={policyHolders[currentlySelected]?.houseNumber}
              /> */

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
