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

  useTitle("Health insurance | FinAgent");

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
        <Title>{t("InsuranceHealth.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={2} label="Insured Info" />
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
