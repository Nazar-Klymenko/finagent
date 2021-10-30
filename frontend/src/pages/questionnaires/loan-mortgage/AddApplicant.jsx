import React from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { addApplicantSchema } from "./applicationHelpers/loanMortgageSchema";

import { ButtonsWrap } from "../LocalStyles";
import { Input, MuiRadio, DateInput, PhoneInput } from "@components/input";
import { Modal } from "@components/modals";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

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
    mode: "onChange",
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
        header={t("LoanMortgage.ApplicantModal.title")}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Form id="applicant-form" onSubmit={handleSubmit(addApplicantSubmit)}>
          <MuiRadio
            control={control}
            name="nationality"
            legend={t("LoanMortgage.ApplicantModal.citizenship")}
            options={[
              {
                label: t("LoanMortgage.ApplicantModal.polish"),
                value: "polish",
              },
              {
                label: t("LoanMortgage.ApplicantModal.other"),
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
                labelName={t("LoanMortgage.ApplicantModal.otherCitizenship")}
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
                placeholder="Nation"
                defaultValue={appDataValid.otherNation}
              />

              <MuiRadio
                control={control}
                name="residenceDocument"
                legend={t("LoanMortgage.ApplicantModal.residenceDocument")}
                options={[
                  {
                    label: t("LoanMortgage.ApplicantModal.temporaryCard"),
                    value: "temporaryCard",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.permanentCard"),
                    value: "permanentCard",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.blueCard"),
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
                labelName={t("LoanMortgage.ApplicantModal.validFrom")}
                error={!!errors.validFrom}
                helperText={errors?.validFrom?.message}
                defaultDate={appDataValid.validFrom}
              />
              {!(residenceDocument === "permanentCard") && (
                <DateInput
                  control={control}
                  name="validUntil"
                  labelName={t("LoanMortgage.ApplicantModal.validUntil")}
                  error={!!errors.validUntil}
                  helperText={errors?.validUntil?.message}
                  defaultDate={appDataValid.validUntil}
                  disablePast
                />
              )}
            </>
          )}
          <Input
            ref={register}
            name="name"
            labelName={t("LoanMortgage.ApplicantModal.name")}
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
            labelName={t("LoanMortgage.ApplicantModal.surname")}
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
            labelName={t("LoanMortgage.ApplicantModal.birthDate")}
            error={!!errors.birthDate}
            helperText={errors?.birthDate?.message}
            defaultDate={appDataValid.birthDate}
          />
          <PhoneInput
            ref={register}
            name="phoneNumber"
            labelName={t("LoanMortgage.ApplicantModal.phoneNumber")}
            type="tel"
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            placeholder="+XX XXX XXX XXX"
            defaultValue={appDataValid.phoneNumber}
          />
          <Input
            ref={register}
            name="email"
            labelName={t("LoanMortgage.ApplicantModal.email")}
            type="text"
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder="example@mail.com"
            defaultValue={appDataValid.email}
          />
          <Input
            ref={register}
            name="pesel"
            labelName={t("LoanMortgage.ApplicantModal.pesel")}
            type="text"
            error={!!errors.pesel}
            helperText={errors?.pesel?.message}
            placeholder="XX XXX XXX XXX"
            defaultValue={appDataValid.pesel}
          />

          <MuiRadio
            control={control}
            name="basicIncome"
            legend={t("LoanMortgage.ApplicantModal.basicIncome")}
            options={[
              {
                label: t("LoanMortgage.ApplicantModal.indefinitePeriod"),
                value: "indefinitePeriod",
              },
              {
                label: t("LoanMortgage.ApplicantModal.specificTime"),
                value: "specificTime",
              },
              {
                label: t("LoanMortgage.ApplicantModal.mandate"),
                value: "mandate",
              },
              {
                label: t("LoanMortgage.ApplicantModal.contract"),
                value: "contract",
              },
              {
                label: t("LoanMortgage.ApplicantModal.economicActivity"),
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
                legend={t("LoanMortgage.ApplicantModal.firstContract")}
                options={[
                  {
                    label: t("LoanMortgage.ApplicantModal.yes"),
                    value: "yes",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.no"),
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
                    legend={t("LoanMortgage.ApplicantModal.sameEmployer")}
                    options={[
                      {
                        label: t("LoanMortgage.ApplicantModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanMortgage.ApplicantModal.no"),
                        value: "no",
                      },
                    ]}
                    defaultChecked={appDataValid.sameEmployer || "yes"}
                  />

                  <MuiRadio
                    control={control}
                    name="withoutPause"
                    legend={t("LoanMortgage.ApplicantModal.withoutPause")}
                    options={[
                      {
                        label: t("LoanMortgage.ApplicantModal.yes"),
                        value: "yes",
                      },
                      {
                        label: t("LoanMortgage.ApplicantModal.no"),
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
                labelName={t("LoanMortgage.ApplicantModal.contractFrom")}
                error={!!errors.contractFrom}
                helperText={errors?.contractFrom?.message}
                defaultDate={appDataValid.contractFrom}
              />
              <DateInput
                control={control}
                name="contractUntil"
                labelName={t("LoanMortgage.ApplicantModal.contractUntil")}
                error={!!errors.contractUntil}
                helperText={errors?.contractUntil?.message}
                defaultDate={appDataValid.contractUntil}
                disablePast
              />
            </>
          )}
          {basicIncome === "mandate" && (
            <Input
              ref={register}
              name="averageIncome"
              labelName={t("LoanMortgage.ApplicantModal.averageIncome12")}
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
              labelName={t("LoanMortgage.ApplicantModal.averageIncome6")}
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
                legend={t("LoanMortgage.ApplicantModal.accountancy")}
                options={[
                  {
                    label: t("LoanMortgage.ApplicantModal.generalRules"),
                    value: "generalRules",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.lumpSum"),
                    value: "lumpSum",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.taxCard"),
                    value: "taxCard",
                  },
                  {
                    label: t("LoanMortgage.ApplicantModal.fullAccounting"),
                    value: "fullAccounting",
                  },
                ]}
                defaultChecked={appDataValid.accountancy || "generalRules"}
              />
              <Input
                ref={register}
                name="averageIncome"
                labelName={t("LoanMortgage.ApplicantModal.averageIncome6")}
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
              labelName={t("LoanMortgage.ApplicantModal.averageIncome3")}
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
            labelName={t("LoanMortgage.ApplicantModal.currency")}
            type="text"
            error={!!errors.currency}
            helperText={errors?.currency?.message}
            placeholder="PLN"
            defaultValue={appDataValid.currency}
          />
          <Input
            ref={register}
            name="pit"
            labelName={t("LoanMortgage.ApplicantModal.pit")}
            type="text"
            error={!!errors.pit}
            helperText={errors?.pit?.message}
            placeholder="value"
            defaultValue={appDataValid.pit}
          />
          <Input
            ref={register}
            name="bank"
            labelName={t("LoanMortgage.ApplicantModal.bank")}
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
