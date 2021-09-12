import React, { useState, useEffect } from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { RadioGroup } from "@components/input";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  ApplicantBox,
} from "../LocalStyles";
import FormError from "@components/FormError";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";

import AddApplicant from "./AddApplicant";
import AddAdditionalIncome from "./AddAdditionalIncome";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Cash loan | FinAgent");

  const {
    appData,
    setValues,
    setCurrentPage,
    peopleData,
    setPeopleData,
    additionalData,
    setAdditionalData,
  } = useData();

  const appDataValid = validateAppData(appData, "ApplicantsData");
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const [openIncomeModal, setOpenIncomeModal] = useState(false);

  const [isError, setIsError] = useState("");

  let [defaultPerson, setDefaultPerson] = useState(null);
  let [defaultIncome, setDefaultIncome] = useState(null);

  const [applicantNumber, setApplicantNumber] = useState(null);

  let [applicantData, setApplicantData] = useState(peopleData || []);
  let [incomeData, setIncomeData] = useState(additionalData || []);

  let [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const maritalStatus = watch("maritalStatus") || appDataValid.maritalStatus;
  const bothSpousesStart =
    watch("bothSpousesStart") || appDataValid.bothSpousesStart;

  const formSubmit = (data) => {
    setValues(data, "ApplicantsData");
    if (!applicantData["Applicant1"]?.basicIncome) {
      setIsError(t("LoanCash.Error.noFirstApplicant"));
    } else if (
      bothSpousesStart === "yes" &&
      !applicantData["Applicant2"]?.basicIncome
    ) {
      setIsError(t("LoanCash.Error.noSecondApplicant"));
    } else {
      setCurrentPage(2);
      history.push("./2");
    }
  };

  useEffect(() => {
    setValues(applicantData, "Applicants");
    setPeopleData(applicantData);
    setIsError("");
  }, [applicantData]);

  useEffect(() => {
    setValues(incomeData, "AdditionalIncome");
    setAdditionalData(incomeData);
  }, [incomeData]);

  const removeIncome = (e) => {
    let newIncome = [...incomeData];
    const idx = e.target.getAttribute("value");
    newIncome.splice(idx, 1);
    setIncomeData(newIncome);
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("LoanCash.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={1} label="Applicants Info" />
        <Subtitle>{t("LoanCash.Page1.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <RadioGroup
            name="maritalStatus"
            ref={register}
            legend={t("LoanCash.Page1.maritalStatus")}
            options={[
              {
                label: t("LoanCash.Page1.notMarried"),
                value: "notMarried",
              },
              {
                label: t("LoanCash.Page1.married"),
                value: "married",
              },
            ]}
            defaultChecked={appDataValid.maritalStatus || "notMarried"}
          />
          {maritalStatus === "married" && (
            <>
              <RadioGroup
                name="propertySeparation"
                ref={register}
                legend={t("LoanCash.Page1.propertySeparation")}
                options={[
                  {
                    label: t("LoanCash.Page1.no"),
                    value: "no",
                  },
                  {
                    label: t("LoanCash.Page1.yes"),
                    value: "yes",
                  },
                ]}
                defaultChecked={appDataValid.propertySeparation || "no"}
              />
              <RadioGroup
                name="bothSpousesStart"
                ref={register}
                legend={t("LoanCash.Page1.bothSpousesStart")}
                options={[
                  {
                    label: t("LoanCash.Page1.no"),
                    value: "no",
                  },
                  {
                    label: t("LoanCash.Page1.yes"),
                    value: "yes",
                  },
                ]}
                defaultChecked={appDataValid.bothSpousesStart || "no"}
              />
            </>
          )}
          <Subtitle>{t("LoanCash.ApplicantBox.title")}</Subtitle>
          <ApplicantBox>
            {applicantData.Applicant1 && (
              <div className="person">
                <div className="minor-data-place">
                  <span>{applicantData.Applicant1.name}</span>
                  <span>{applicantData.Applicant1.surname}</span>
                </div>
                <div className="action-place">
                  <span
                    className="edit"
                    onClick={() => {
                      setDefaultPerson("Applicant1");
                      setOpenModal(true);
                    }}
                  >
                    {t("LoanCash.ApplicantBox.edit")}
                  </span>
                </div>
              </div>
            )}
            {!applicantData.Applicant1 && (
              <span
                className="add"
                onClick={() => {
                  setApplicantNumber(1);
                  setOpenModal(true);
                  setDefaultPerson(null);
                }}
              >
                {t("LoanCash.ApplicantBox.addApplicant1")}
              </span>
            )}
          </ApplicantBox>
          {bothSpousesStart === "yes" && maritalStatus === "married" && (
            <>
              <ApplicantBox>
                {applicantData.Applicant2 && (
                  <div className="person">
                    <div className="minor-data-place">
                      <span>{applicantData.Applicant2.name}</span>
                      <span>{applicantData.Applicant2.surname}</span>
                    </div>
                    <div className="action-place">
                      <span
                        className="edit"
                        onClick={() => {
                          setDefaultPerson("Applicant2");
                          setOpenModal(true);
                        }}
                      >
                        {t("LoanCash.ApplicantBox.edit")}
                      </span>
                    </div>
                  </div>
                )}
                {!applicantData.Applicant2 && (
                  <span
                    className="add"
                    onClick={() => {
                      setApplicantNumber(2);
                      setOpenModal(true);
                      setDefaultPerson(null);
                    }}
                  >
                    {t("LoanCash.ApplicantBox.addApplicant2")}
                  </span>
                )}
              </ApplicantBox>
            </>
          )}
          <Subtitle>{t("LoanCash.IncomeBox.title")}</Subtitle>
          <ApplicantBox>
            {incomeData &&
              incomeData.map((income, idx) => (
                <div key={idx} className="person">
                  <div className="minor-data-place">
                    <span>
                      {income?.industry ||
                        t("LoanCash.IncomeBox.transportDriver")}
                    </span>
                  </div>
                  <div className="action-place">
                    <span
                      className="edit"
                      onClick={() => {
                        setIsEditing(true);
                        setDefaultIncome(idx);
                        setOpenIncomeModal(true);
                      }}
                    >
                      {t("LoanCash.IncomeBox.edit")}
                    </span>
                    <span className="delete" value={idx} onClick={removeIncome}>
                      {t("InsuranceHealth.ApplicantBox.delete")}
                    </span>
                  </div>
                </div>
              ))}
            <span
              className="add"
              onClick={() => {
                setDefaultIncome(null);
                setOpenIncomeModal(true);
              }}
            >
              {t("LoanCash.IncomeBox.addIncome")}
            </span>
          </ApplicantBox>
        </Form>
        <AddApplicant
          openModal={openModal}
          setOpenModal={setOpenModal}
          setApplicantData={setApplicantData}
          defaultPerson={defaultPerson}
          applicantNumber={applicantNumber}
        />
        <AddAdditionalIncome
          openIncomeModal={openIncomeModal}
          setOpenIncomeModal={setOpenIncomeModal}
          incomeData={incomeData}
          setIncomeData={setIncomeData}
          defaultIncome={defaultIncome}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <ButtonsWrap>
          <CTA text={t("LoanCash.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
        {isError && <FormError>{isError}</FormError>}
      </Page>
    </ContentWrap>
  );
};

export default Page1;
