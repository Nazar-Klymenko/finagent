import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { DateInput, Input, MuiPhoneInput, Radio } from "@components/input";
import { Modal } from "@components/modals";

import { ButtonsWrap } from "../LocalStyles";
import { addApplicantSchema } from "./applicationHelpers/loan-mortgage.schema";

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
          <Radio
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
            defaultValue={appDataValid.nationality || "polish"}
          />
          {nationality === "other" && (
            <>
              <Input
                control={control}
                name="otherNation"
                labelName={t("LoanMortgage.ApplicantModal.otherCitizenship")}
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
                placeholder="Nation"
                defaultValue={appDataValid.otherNation}
              />

              <Radio
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
                defaultValue={appDataValid.residenceDocument || "temporaryCard"}
              />
              <DateInput
                control={control}
                name="validFrom"
                labelName={t("LoanMortgage.ApplicantModal.validFrom")}
                error={!!errors.validFrom}
                helperText={errors?.validFrom?.message}
                defaultValue={appDataValid.validFrom}
              />
              {!(residenceDocument === "permanentCard") && (
                <DateInput
                  control={control}
                  name="validUntil"
                  labelName={t("LoanMortgage.ApplicantModal.validUntil")}
                  error={!!errors.validUntil}
                  helperText={errors?.validUntil?.message}
                  defaultValue={appDataValid.validUntil}
                  disablePast
                />
              )}
            </>
          )}
          <Input
            control={control}
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
            control={control}
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
            defaultValue={appDataValid.birthDate}
          />
          <MuiPhoneInput
            control={control}
            name="phoneNumber"
            labelName={t("LoanMortgage.ApplicantModal.phoneNumber")}
            type="tel"
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            placeholder="+XX XXX XXX XXX"
            defaultValue={appDataValid.phoneNumber}
          />
          <Input
            control={control}
            name="email"
            labelName={t("LoanMortgage.ApplicantModal.email")}
            type="text"
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder="example@mail.com"
            defaultValue={appDataValid.email}
          />
          <Input
            control={control}
            name="pesel"
            labelName={t("LoanMortgage.ApplicantModal.pesel")}
            type="text"
            error={!!errors.pesel}
            helperText={errors?.pesel?.message}
            placeholder="XX XXX XXX XXX"
            defaultValue={appDataValid.pesel}
          />

          <Radio
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
            defaultValue={appDataValid.basicIncome || "indefinitePeriod"}
          />
          {(basicIncome === "specificTime" ||
            basicIncome === "mandate" ||
            basicIncome === "contract") && (
            <>
              <Radio
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
                defaultValue={appDataValid.firstContract || "yes"}
              />
              {firstContract === "no" && (
                <>
                  <Radio
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
                    defaultValue={appDataValid.sameEmployer || "yes"}
                  />

                  <Radio
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
                    defaultValue={appDataValid.withoutPause || "yes"}
                  />
                </>
              )}
              <DateInput
                control={control}
                name="contractFrom"
                labelName={t("LoanMortgage.ApplicantModal.contractFrom")}
                error={!!errors.contractFrom}
                helperText={errors?.contractFrom?.message}
                defaultValue={appDataValid.contractFrom}
              />
              <DateInput
                control={control}
                name="contractUntil"
                labelName={t("LoanMortgage.ApplicantModal.contractUntil")}
                error={!!errors.contractUntil}
                helperText={errors?.contractUntil?.message}
                defaultValue={appDataValid.contractUntil}
                disablePast
              />
            </>
          )}
          {basicIncome === "mandate" && (
            <Input
              control={control}
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
              control={control}
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
              <Radio
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
                defaultValue={appDataValid.accountancy || "generalRules"}
              />
              <Input
                control={control}
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
              control={control}
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
            control={control}
            name="currency"
            labelName={t("LoanMortgage.ApplicantModal.currency")}
            type="text"
            error={!!errors.currency}
            helperText={errors?.currency?.message}
            placeholder="PLN"
            defaultValue={appDataValid.currency}
          />
          <Input
            control={control}
            name="pit"
            labelName={t("LoanMortgage.ApplicantModal.pit")}
            type="text"
            error={!!errors.pit}
            helperText={errors?.pit?.message}
            placeholder="value"
            defaultValue={appDataValid.pit}
          />
          <Input
            control={control}
            name="bank"
            labelName={t("LoanMortgage.ApplicantModal.bank")}
            type="text"
            error={!!errors.bank}
            helperText={errors?.bank?.message}
            placeholder="Millenium"
            defaultValue={appDataValid.bank}
          />
        </Form>
        <FormBuilder.ButtonsWrap multiple>
          <Button
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => setOpenModal(false)}
          />
          <Button
            color="primary"
            text={t("Basic.buttonAdd")}
            form="applicant-form"
          />
        </FormBuilder.ButtonsWrap>
      </Modal>
    )
  );
};

export default AddApplicant;
