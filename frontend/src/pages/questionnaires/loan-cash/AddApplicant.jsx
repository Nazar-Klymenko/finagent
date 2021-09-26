import React from "react";
import { useData } from "@context/dataContext";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { addApplicantSchema } from "./applicationHelpers/loanCashSchema";
import { useTranslation } from "react-i18next";

import { ButtonsWrap } from "../LocalStyles";
import { Input, RadioGroup, DateInput, PhoneInput } from "@components/input";
import Modal from "@components/modals/Modal";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

const AddApplicant = ({
  openModal,
  setOpenModal,
  setApplicantData,
  defaultPerson,
  applicantNumber,
}) => {
  const { t } = useTranslation();
  const { appData } = useData();
  const appDataValid = validateAppData(
    appData.Applicants || appData,
    defaultPerson
  );

  const { register, handleSubmit, errors, watch, control } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(addApplicantSchema()),
  });

  const nationality = watch("nationality") || appDataValid.nationality;
  const residenceDocument =
    watch("residenceDocument") || appDataValid.residenceDocument;
  const basicIncome = watch("basicIncome") || appDataValid.basicIncome;
  const firstContract = watch("firstContract") || appDataValid.firstContract;

  const setPeopleValues = (values, wrapper) => {
    setApplicantData((prevData) => ({
      ...prevData,
      [wrapper]: { ...values },
    }));
  };

  const addApplicantSubmit = (data) => {
    if (defaultPerson) {
      setPeopleValues(data, defaultPerson);
    } else {
      setPeopleValues(data, `Applicant${applicantNumber}`);
    }
    setOpenModal(false);
  };

  return (
    openModal && (
      <Modal
        header={t("LoanCash.ApplicantModal.title")}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Form id="applicant-form" onSubmit={handleSubmit(addApplicantSubmit)}>
          <RadioGroup
            name="nationality"
            ref={register}
            legend={t("LoanCash.ApplicantModal.citizenship")}
            options={[
              {
                label: t("LoanCash.ApplicantModal.polish"),
                value: "polish",
              },
              {
                label: t("LoanCash.ApplicantModal.other"),
                value: "other",
              },
            ]}
            defaultChecked={appDataValid.nationality || "polish"}
          />
          {nationality === "other" && (
            <>
              <Input
                ref={register}
                name="otherNation"
                labelName={t("LoanCash.ApplicantModal.otherCitizenship")}
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
                placeholder="Nation"
                defaultValue={appDataValid.otherNation}
              />
              <RadioGroup
                name="residenceDocument"
                ref={register}
                legend={t("LoanCash.ApplicantModal.residenceDocument")}
                options={[
                  {
                    label: t("LoanCash.ApplicantModal.temporaryCard"),
                    value: "temporaryCard",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.permanentCard"),
                    value: "permanentCard",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.blueCard"),
                    value: "blueCard",
                  },
                ]}
                defaultChecked={
                  appDataValid.residenceDocument || "temporaryCard"
                }
              />
              <DateInput
                control={control}
                name="validFrom"
                labelName={t("LoanCash.ApplicantModal.validFrom")}
                error={!!errors.validFrom}
                helperText={errors?.validFrom?.message}
                defaultDate={appDataValid.validFrom}
              />
              {!(residenceDocument === "permanentCard") && (
                <DateInput
                  control={control}
                  name="validUntil"
                  labelName={t("LoanCash.ApplicantModal.validUntil")}
                  error={!!errors.validUntil}
                  helperText={errors?.validUntil?.message}
                  defaultDate={appDataValid.validUntil}
                  disablePastDates
                />
              )}
            </>
          )}
          <Input
            ref={register}
            name="name"
            labelName={t("LoanCash.ApplicantModal.name")}
            type="text"
            error={!!errors.name}
            helperText={errors?.name?.message}
            placeholder="John"
            autoComplete="given-name"
            defaultValue={appDataValid.name}
          />
          <Input
            ref={register}
            name="surname"
            labelName={t("LoanCash.ApplicantModal.surname")}
            type="text"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            placeholder="Doe"
            autoComplete="family-name"
            defaultValue={appDataValid.surname}
          />
          <DateInput
            control={control}
            name="birthDate"
            labelName={t("LoanCash.ApplicantModal.birthDate")}
            error={!!errors.birthDate}
            helperText={errors?.birthDate?.message}
            defaultDate={appDataValid.birthDate}
          />
          <PhoneInput
            ref={register}
            name="phoneNumber"
            labelName={t("LoanCash.ApplicantModal.phoneNumber")}
            type="tel"
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            placeholder="+XX XXX XXX XXX"
            defaultValue={appDataValid.phoneNumber}
          />
          <Input
            ref={register}
            name="email"
            labelName={t("LoanCash.ApplicantModal.email")}
            type="text"
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder="example@mail.com"
            defaultValue={appDataValid.email}
          />
          <Input
            ref={register}
            name="pesel"
            labelName={t("LoanCash.ApplicantModal.pesel")}
            type="text"
            error={!!errors.pesel}
            helperText={errors?.pesel?.message}
            placeholder="XX XXX XXX XXX"
            defaultValue={appDataValid.pesel}
          />
          <RadioGroup
            name="basicIncome"
            ref={register}
            legend={t("LoanCash.ApplicantModal.basicIncome")}
            options={[
              {
                label: t("LoanCash.ApplicantModal.indefinitePeriod"),
                value: "indefinitePeriod",
              },
              {
                label: t("LoanCash.ApplicantModal.specificTime"),
                value: "specificTime",
              },
              {
                label: t("LoanCash.ApplicantModal.mandate"),
                value: "mandate",
              },
              {
                label: t("LoanCash.ApplicantModal.contract"),
                value: "contract",
              },
              {
                label: t("LoanCash.ApplicantModal.economicActivity"),
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
                legend={t("LoanCash.ApplicantModal.firstContract")}
                options={[
                  {
                    label: t("LoanCash.ApplicantModal.yes"),
                    value: "yes",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.no"),
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
                    legend={t("LoanCash.ApplicantModal.sameEmployer")}
                    options={[
                      {
                        label: t("LoanCash.ApplicantModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanCash.ApplicantModal.no"),
                        value: "no",
                      },
                    ]}
                    defaultChecked={appDataValid.sameEmployer || "yes"}
                  />
                  <RadioGroup
                    name="withoutPause"
                    ref={register}
                    legend={t("LoanCash.ApplicantModal.withoutPause")}
                    options={[
                      {
                        label: t("LoanCash.ApplicantModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanCash.ApplicantModal.no"),
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
                labelName={t("LoanCash.ApplicantModal.contractFrom")}
                error={!!errors.contractFrom}
                helperText={errors?.contractFrom?.message}
                defaultDate={appDataValid.contractFrom}
              />
              <DateInput
                control={control}
                name="contractUntil"
                labelName={t("LoanCash.ApplicantModal.contractUntil")}
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
              labelName={t("LoanCash.ApplicantModal.averageIncome12")}
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
              labelName={t("LoanCash.ApplicantModal.averageIncome6")}
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
                legend={t("LoanCash.ApplicantModal.accountancy")}
                options={[
                  {
                    label: t("LoanCash.ApplicantModal.generalRules"),
                    value: "generalRules",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.lumpSum"),
                    value: "lumpSum",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.taxCard"),
                    value: "taxCard",
                  },
                  {
                    label: t("LoanCash.ApplicantModal.fullAccounting"),
                    value: "fullAccounting",
                  },
                ]}
                defaultChecked={appDataValid.accountancy || "generalRules"}
              />
              <Input
                ref={register}
                name="averageIncome"
                labelName={t("LoanCash.ApplicantModal.averageIncome6")}
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
              labelName={t("LoanCash.ApplicantModal.averageIncome3")}
              type="text"
              error={!!errors.averageIncome}
              helperText={errors?.averageIncome?.message}
              placeholder="value"
              defaultValue={appDataValid.averageIncome}
            />
          )}
          <Input
            ref={register}
            name="currency"
            labelName={t("LoanCash.ApplicantModal.currency")}
            type="text"
            error={!!errors.currency}
            helperText={errors?.currency?.message}
            placeholder="PLN"
            defaultValue={appDataValid.currency}
          />
          <Input
            ref={register}
            name="pit"
            labelName={t("LoanCash.ApplicantModal.pit")}
            type="text"
            error={!!errors.pit}
            helperText={errors?.pit?.message}
            placeholder="value"
            defaultValue={appDataValid.pit}
          />
          <Input
            ref={register}
            name="bank"
            labelName={t("LoanCash.ApplicantModal.bank")}
            type="text"
            error={!!errors.bank}
            helperText={errors?.bank?.message}
            placeholder="Millenium"
            defaultValue={appDataValid.bank}
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenModal(false)}
          />
          <CTA
            color="primary"
            text={t("Basic.buttonAdd")}
            form="applicant-form"
          />
        </ButtonsWrap>
      </Modal>
    )
  );
};

export default AddApplicant;
