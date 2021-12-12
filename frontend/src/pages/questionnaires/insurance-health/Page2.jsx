import React, { useEffect, useState } from "react";

import { QuestState } from "@dev/QuestState";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";

import {
  ApplicantBox,
  ButtonsWrap,
  ErrorBottom,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import AddPolicyHolder from "./AddPolicyHolder";

const Page2 = () => {
  const { t } = useTranslation();
  useTitle("Health insurance | FinAgent");
  const history = useHistory();
  const { appData, setValues, setAllowSummary, peopleData, setPeopleData } =
    useData();

  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState("");

  let [insuredData, setInsuredData] = useState(peopleData || []);
  let [defaultPerson, setDefaultPerson] = useState(null);
  let [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValues(insuredData, "insuranceHealth", "InsuredData");
    setPeopleData(insuredData);
    setIsError("");
  }, [insuredData]);

  const removeInsured = (e) => {
    let newInsured = [...insuredData];
    const idx = e.target.getAttribute("value");
    newInsured.splice(idx, 1);
    setInsuredData(newInsured);
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceHealth.ApplicantBox.title")}
        />
        <Subtitle>{t("InsuranceHealth.ApplicantBox.title")}</Subtitle>
        <p>{t("InsuranceHealth.ApplicantBox.maxPeople")}</p>
        <ApplicantBox>
          {insuredData &&
            insuredData.map((person, idx) => (
              <div key={idx} className="person">
                <div className="minor-data-place">
                  <span>{person.name}</span>
                  <span>{person.surname}</span>
                </div>
                <div className="action-place">
                  <span
                    className="edit"
                    onClick={() => {
                      setDefaultPerson(idx);
                      setIsEditing(!isEditing);
                      setOpenModal(true);
                    }}
                  >
                    {t("InsuranceHealth.ApplicantBox.edit")}
                  </span>
                  <span className="delete" value={idx} onClick={removeInsured}>
                    {t("InsuranceHealth.ApplicantBox.delete")}
                  </span>
                </div>
              </div>
            ))}
          {insuredData.length < 9 && (
            <span
              className="add"
              onClick={() => {
                setOpenModal(true);
                setDefaultPerson(null);
              }}
            >
              {t("InsuranceHealth.ApplicantBox.addApplicant")}
            </span>
          )}
        </ApplicantBox>

        <AddPolicyHolder
          openModal={openModal}
          setOpenModal={setOpenModal}
          insuredData={insuredData}
          setInsuredData={setInsuredData}
          defaultPerson={defaultPerson}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
            onClick={() => {
              history.push("./1");
            }}
          />
          <CTA
            large={true}
            text={t("Basic.buttonNext")}
            color="primary"
            form=""
            onClick={() => {
              if (insuredData.length === 0) {
                setIsError(t("InsuranceHealth.Error.noApplicant"));
              } else {
                setAllowSummary(true);
                history.push("./summary");
              }
            }}
          />
        </ButtonsWrap>
        {isError && <ErrorBottom>{isError}</ErrorBottom>}
      </Page>
    </ContentWrap>
  );
};

export default Page2;

// <MuiRadio
//         control={control}
//         name="policyholderIs"
//         legend={t("InsuranceHealth.Page2.policyholderIs")}
//         options={[
//           {
//             label: t("InsuranceHealth.Page2.polish"),
//             value: "polish",
//           },
//           {
//             label: t("InsuranceHealth.Page2.foreigner"),
//             value: "foreigner",
//           },
//         ]}
//         defaultValue={appDataValid.policyholderIs || "polish"}
//       />
//       {documentType === "foreigner" && (
//         <MuiInput
//           control={control}
//           name="citizenship"
//           labelName={t("InsuranceHealth.ApplicantModal.citizenship")}
//           type="text"
//           error={!!errors.citizenship}
//           helperText={errors?.citizenship?.message}
//           placeholder="Type here"
//           defaultValue={appDataValid.citizenship}
//         />
//       )}
//       <MuiInput
//         control={control}
//         name="documentAdded"
//         labelName={`${
//           documentType === "polish"
//             ? t("InsuranceHealth.ApplicantModal.pesel")
//             : t("InsuranceHealth.ApplicantModal.passport")
//         }`}
//         type="text"
//         error={!!errors.documentAdded}
//         helperText={errors?.documentAdded?.message}
//         placeholder="XXXXXXXXXXX"
//         defaultValue={appDataValid.documentAdded}
//       />
//       <MuiInput
//         control={control}
//         name="name"
//         labelName={t("InsuranceHealth.ApplicantModal.name")}
//         type="text"
//         error={!!errors.name}
//         helperText={errors?.name?.message}
//         placeholder="John"
//         autoComplete="given-name"
//         defaultValue={appDataValid.name}
//       />
//       <MuiInput
//         control={control}
//         name="surname"
//         labelName={t("InsuranceHealth.ApplicantModal.surname")}
//         type="text"
//         error={!!errors.surname}
//         helperText={errors?.surname?.message}
//         placeholder="Doe"
//         autoComplete="family-name"
//         defaultValue={appDataValid.surname}
//       />
//       <DateInput
//         control={control}
//         name="birthDate"
//         labelName={t("InsuranceHealth.Page2.birthDate")}
//         error={!!errors.birthDate}
//         helperText={errors?.birthDate?.message}
//         defaultValue={appDataValid.birthDate}
//       />
//       <MuiInput
//         control={control}
//         name="country"
//         labelName={t("InsuranceHealth.ApplicantModal.country")}
//         type="text"
//         error={!!errors.country}
//         helperText={errors?.country?.message}
//         placeholder="Poland"
//         defaultValue={appDataValid.country}
//       />
//       <MuiInput
//         control={control}
//         name="city"
//         labelName={t("InsuranceHealth.ApplicantModal.city")}
//         type="text"
//         error={!!errors.city}
//         helperText={errors?.city?.message}
//         placeholder="Warsaw"
//         defaultValue={appDataValid.city}
//       />
//       <MuiInput
//         control={control}
//         name="postIndex"
//         labelName={t("InsuranceHealth.ApplicantModal.postIndex")}
//         error={!!errors.postIndex}
//         helperText={errors?.postIndex?.message}
//         placeholder="123-45"
//         defaultValue={appDataValid.postIndex}
//       />
//       <MuiInput
//         control={control}
//         name="street"
//         labelName={t("InsuranceHealth.ApplicantModal.street")}
//         error={!!errors.street}
//         helperText={errors?.street?.message}
//         placeholder="Bialostocka"
//         defaultValue={appDataValid.street}
//       />
//       <MuiInput
//         control={control}
//         name="houseNumber"
//         labelName={t("InsuranceHealth.ApplicantModal.houseNumber")}
//         error={!!errors.houseNumber}
//         helperText={errors?.houseNumber?.message}
//         placeholder="14"
//         defaultValue={appDataValid.houseNumber}
//       />
