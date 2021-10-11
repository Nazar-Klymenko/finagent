import React, { useState, useEffect } from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  ApplicantBox,
  ErrorBottom,
} from "../LocalStyles";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import ProgressBar from "@components/ProgressBar";
import { useData } from "@context/dataContext";
import AddPolicyHolder from "./AddPolicyHolder";
import { QuestState } from "@dev/QuestState";

const Page2 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary, peopleData, setPeopleData } =
    useData();
  const history = useHistory();

  useTitle("Specialists access | FinAgent");

  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState("");

  let [insuredData, setInsuredData] = useState(peopleData || []);
  let [defaultPerson, setDefaultPerson] = useState(null);
  let [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValues(insuredData, "InsuredData");
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
        <Title>{t("InsuranceDiagnostic.title")}</Title>
        <ProgressBar
          maxSteps={2}
          currentStep={2}
          label={t("InsuranceDiagnostic.ApplicantBox.title")}
        />
        <Subtitle>{t("InsuranceDiagnostic.ApplicantBox.title")}</Subtitle>
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
                    {t("InsuranceDiagnostic.ApplicantBox.edit")}
                  </span>
                  <span className="delete" value={idx} onClick={removeInsured}>
                    {t("InsuranceDiagnostic.ApplicantBox.delete")}
                  </span>
                </div>
              </div>
            ))}
          {insuredData.length < 14 && (
            <span
              className="add"
              onClick={() => {
                setOpenModal(true);
                setDefaultPerson(null);
              }}
            >
              {t("InsuranceDiagnostic.ApplicantBox.addApplicant")}
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
            form=""
            color="primary"
            onClick={() => {
              if (insuredData.length === 0) {
                setIsError(t("InsuranceDiagnostic.Error.noApplicant"));
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
