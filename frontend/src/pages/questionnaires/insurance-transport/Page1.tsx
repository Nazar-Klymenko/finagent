import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiCheckbox,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
  MuiSelect,
} from "@components/input";

import {
  ButtonsWrap,
  InputErrorMessage,
  Legend,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import { pageOneValues } from "./applicationHelpers/default-values";
import {
  maritalStatusOptions,
  professionOptions,
} from "./applicationHelpers/options";
import { pageOneSchema } from "./applicationHelpers/validation.schema";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();

  const appDataValid = validateAppData(
    appData,
    "insuranceTransport",
    "personalData"
  );

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: pageOneValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });

  const isAppropLicence = watch("isAppropLicence");
  const documentTypeName = watch("documentAddedType");

  const formSubmit = (data) => {
    setValues(data, "insuranceTransport", "personalData");
    setCurrentPage(2);
    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={1}
          label={t("InsuranceTransport.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceTransport.Page1.subtitle")}</Subtitle>

        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Legend>{t("InsuranceTransport.Page1.insuranceCoverage")}</Legend>

          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page1.oc")}
            name="oc"
          />
          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page1.ac")}
            name="ac"
          />
          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page1.greenCard")}
            name="greenCard"
          />
          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page1.assistance")}
            name="assistance"
          />

          <InputErrorMessage>
            <span className="invis-star">*</span>
            {errors?.atleastOneCheckbox &&
              t(errors?.atleastOneCheckbox?.message)}
          </InputErrorMessage>

          <MuiInput
            control={control}
            name="name"
            labelName={t("InsuranceTransport.Page1.name")}
            type="text"
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
          />
          <MuiInput
            control={control}
            name="surname"
            labelName={t("InsuranceTransport.Page1.surname")}
            type="text"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            autoComplete="family-name"
          />
          <MuiPhoneInput
            control={control}
            name="phoneNumber"
            labelName={t("InsuranceTransport.Page1.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <MuiInput
            control={control}
            name="postIndex"
            labelName={t("InsuranceTransport.Page1.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            autoComplete="postal-code"
          />
          <MuiInput
            control={control}
            name="city"
            labelName={t("InsuranceTransport.Page1.city")}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <MuiInput
            control={control}
            name="voivodeship"
            labelName={t("InsuranceTransport.Page1.voivodeship")}
            error={!!errors.voivodeship}
            helperText={errors?.voivodeship?.message}
          />
          <MuiInput
            control={control}
            name="street"
            labelName={t("InsuranceTransport.Page1.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <MuiInput
            control={control}
            name="houseNumber"
            labelName={t("InsuranceTransport.Page1.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
          />

          <MuiRadio
            control={control}
            name="documentAddedType"
            legend={t("InsuranceTransport.Page1.documentAddedType")}
            options={[
              {
                label: t("InsuranceTransport.Page1.pesel"),
                value: "pesel",
              },
              {
                label: t("InsuranceTransport.Page1.regon"),
                value: "regon",
              },
              {
                label: t("InsuranceTransport.Page1.passport"),
                value: "passport",
              },
            ]}
          />
          <MuiInput
            control={control}
            name="documentAdded"
            labelName={t(`InsuranceTransport.Page1.${documentTypeName}`)}
            error={!!errors.documentAdded}
            helperText={errors?.documentAdded?.message}
          />

          <MuiSelect
            control={control}
            name="profession"
            labelName={t("InsuranceTransport.Page1.profession")}
            optionArray={professionOptions}
            error={!!errors.profession}
            helperText={errors?.profession?.message}
          />
          <MuiSelect
            control={control}
            name="maritalStatus"
            labelName={t("InsuranceTransport.Page1.maritalStatus")}
            optionArray={maritalStatusOptions}
            error={!!errors.maritalStatus}
            helperText={errors?.maritalStatus?.message}
          />

          <MuiCheckbox
            control={control}
            name="isAppropLicence"
            labelName={t("InsuranceTransport.Page1.isAppropLicence")}
          />

          {isAppropLicence && (
            <DateInput
              control={control}
              name="drivingLicenceDate"
              labelName={t("InsuranceTransport.Page1.drivingLicenceDate")}
              error={!!errors.drivingLicenceDate}
              helperText={errors?.drivingLicenceDate?.message}
              placeholder={t("Form.Placeholder.dateFull")}
              disableFuture
              view={["year", "month", "date"]}
            />
          )}
        </Form>
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
