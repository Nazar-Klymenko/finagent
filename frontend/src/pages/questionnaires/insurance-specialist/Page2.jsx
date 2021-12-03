import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
  const [formInitiated, setFormInitiated] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

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
    // resolver: yupResolver(policyholderSchema()),
  });

  const formSubmit = (data) => {
    setFormInitiated(true);
    setEditingMode(false);
    // setValues(data, "insuranceSpecialist", "insuredData");
    // setAllowSummary(true);
    // history.push("./summary");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "policyholder",
  });

  const policyholderIs = watch(`policyholder[${editingIndex}].policyholderIs`);
  const policyholders = useWatch({ control, name: "policyholder" });

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

        {editingMode &&
          fields.map((field, index) => (
            <MuiDialog
              key={field.id}
              isOpen={openDialog}
              handleClose={handleClose}
              formId="insured-data-form"
              title="test"
              description="test"
            >
              <Form
                key={field.id}
                id="insured-data-form"
                onSubmit={handleSubmit(formSubmit)}
              >
                <MuiRadio
                  control={control}
                  name={`policyholder[${index}].policyholderIs`}
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
                  defaultValue={
                    policyholders[editingIndex]?.policyholderIs || ""
                  }
                />
                <MuiInput
                  control={control}
                  name={`policyholder[${index}].name`}
                  labelName={t("InsuranceDiagnostic.Page1.name")}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  autoComplete="given-name"
                  defaultValue={policyholders[editingIndex]?.name || ""}
                />
                {policyholderIs === "individual" && (
                  <MuiInput
                    control={control}
                    name={`policyholder[${index}].surname`}
                    labelName={t("InsuranceDiagnostic.Page1.surname")}
                    error={!!errors.surname}
                    helperText={errors?.surname?.message}
                    autoComplete="family-name"
                    defaultValue={policyholders[editingIndex]?.surname || ""}
                  />
                )}
              </Form>
            </MuiDialog>
          ))}

        {formInitiated &&
          policyholders.map((field, index) => (
            <Applicant>
              <AvatarStyled>{field.name[0] || ""}</AvatarStyled>
              <ApplicantName>{field.name}</ApplicantName>

              <IconButton>
                <EditIcon
                  onClick={() => {
                    setEditingMode(true);
                    setEditingIndex(index);
                    setOpenDialog(true);
                  }}
                />
              </IconButton>

              <IconButton>
                <DeleteIcon
                  onClick={() => {
                    remove(index);
                  }}
                />
              </IconButton>
            </Applicant>
          ))}

        {!formInitiated && (
          <ApplicantBox>
            <ApplicantAdd
              onClick={() => {
                setEditingMode(true);
                setOpenDialog(true);
              }}
            >
              {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
            </ApplicantAdd>
          </ApplicantBox>
        )}

        {formInitiated && fields.length < 2 && (
          <ApplicantBox>
            <ApplicantAdd
              onClick={() => {
                append({ policyholderIs: "firm", name: "", surname: "" });
                setEditingMode(true);
                setOpenDialog(true);
                setEditingIndex(fields.length);
              }}
            >
              {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
            </ApplicantAdd>
          </ApplicantBox>
        )}
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
        <DevTool control={control} placement="bottom-right" />
      </Page>
    </ContentWrap>
  );
};

export default Page2;

const AvatarStyled = styled(Avatar)`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.blue};
`;

const Applicant = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.gray};
  padding: 8px 14px;
  border-radius: 4px;
  margin: 6px 0px;
  align-items: center;
`;

const ApplicantName = styled.span`
  flex: 1;
  margin-left: 8px;
`;
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

// import React from "react";
// import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";

// import "./styles.css";

// function App() {
//   const [indexes, setIndexes] = React.useState([]);
//   const [counter, setCounter] = React.useState(0);
//   const { register, handleSubmit } = useForm();

//   const onSubmit = data => {
//     console.log(data);
//   };

//   const addFriend = () => {
//     setIndexes(prevIndexes => [...prevIndexes, counter]);
//     setCounter(prevCounter => prevCounter + 1);
//   };

//   const removeFriend = index => () => {
//     setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
//     setCounter(prevCounter => prevCounter - 1);
//   };

//   const clearFriends = () => {
//     setIndexes([]);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {indexes.map(index => {
//         const fieldName = `friends[${index}]`;
//         return (
//           <fieldset name={fieldName} key={fieldName}>
//             <label>
//               First Name {index}:
//               <input
//                 type="text"
//                 name={`${fieldName}.firstName`}
//                 ref={register}
//               />
//             </label>

//             <label>
//               Last Name {index}:
//               <input
//                 type="text"
//                 name={`${fieldName}.lastName`}
//                 ref={register}
//               />
//             </label>
//             <button type="button" onClick={removeFriend(index)}>
//               Remove
//             </button>
//           </fieldset>
//         );
//       })}

//       <button type="button" onClick={addFriend}>
//         Add Friend
//       </button>
//       <button type="button" onClick={clearFriends}>
//         Clear Friends
//       </button>
//       <input type="submit" />
//     </form>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
