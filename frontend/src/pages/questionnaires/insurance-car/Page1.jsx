import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  professionOptions,
  maritalStatusOptions,
} from "./applicationHelpers/insuranceCarOptions";

import {
  Input,
  RadioGroup,
  PhoneInput,
  DateInput,
  SelectInput,
  Checkbox,
} from "@components/input";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  InputErrorMessage,
  Legend,
} from "../LocalStyles";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageOneValues } from "./applicationHelpers/defaultValues";
import { pageOneSchema } from "./applicationHelpers/validationSchema";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();

  const appDataValid = validateAppData(appData, "PersonalData");

  const { register, handleSubmit, errors, watch, control } = useForm({
    defaultValues: pageOneValues(appDataValid),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });

  const isAppropLicence = watch("isAppropLicence");
  const documentTypeName = watch("documentAddedType");

  const formSubmit = (data) => {
    setValues(data, "PersonalData");
    setCurrentPage(2);

    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={1} label="Personal Info" />
        <Subtitle>{t("InsuranceTransport.Page1.subtitle")}</Subtitle>

        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Legend>{t("InsuranceTransport.Page1.insuranceCoverage")}</Legend>

          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page1.oc")}
            value={false}
            name="oc"
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page1.ac")}
            value={false}
            name="ac"
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page1.greenCard")}
            value={false}
            name="greenCard"
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page1.assistance")}
            value={false}
            name="assistance"
          />

          <InputErrorMessage>
            <span className="invis-star">*</span>
            {errors?.atleastOneCheckbox &&
              t(errors?.atleastOneCheckbox?.message)}
          </InputErrorMessage>

          <Input
            ref={register}
            name="name"
            labelName={t("InsuranceTransport.Page1.name")}
            type="text"
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
          />
          <Input
            ref={register}
            name="surname"
            labelName={t("InsuranceTransport.Page1.surname")}
            type="text"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            autoComplete="family-name"
          />
          <PhoneInput
            ref={register}
            name="phoneNumber"
            labelName={t("InsuranceTransport.Page1.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <Input
            ref={register}
            name="postIndex"
            labelName={t("InsuranceTransport.Page1.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            autoComplete="postal-code"
          />
          <Input
            ref={register}
            name="city"
            labelName={t("InsuranceTransport.Page1.city")}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <Input
            ref={register}
            name="voivodeship"
            labelName={t("InsuranceTransport.Page1.voivodeship")}
            error={!!errors.voivodeship}
            helperText={errors?.voivodeship?.message}
          />
          <Input
            ref={register}
            name="street"
            labelName={t("InsuranceTransport.Page1.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <Input
            ref={register}
            name="houseNumber"
            labelName={t("InsuranceTransport.Page1.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
          />
          <RadioGroup
            name="documentAddedType"
            ref={register}
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
          <Input
            ref={register}
            name="documentAdded"
            labelName={t(`InsuranceTransport.Page1.${documentTypeName}`)}
            error={!!errors.documentAdded}
            helperText={errors?.documentAdded?.message}
          />
          <SelectInput
            ref={register}
            name="profession"
            labelName={t("InsuranceTransport.Page1.profession")}
            optionArray={professionOptions}
            error={!!errors.profession}
            helperText={errors?.profession?.message}
          />
          <SelectInput
            ref={register}
            name="maritalStatus"
            labelName={t("InsuranceTransport.Page1.maritalStatus")}
            optionArray={maritalStatusOptions}
            error={!!errors.maritalStatus}
            helperText={errors?.maritalStatus?.message}
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page1.isAppropLicence")}
            value={false}
            name="isAppropLicence"
          />

          {isAppropLicence && (
            <DateInput
              control={control}
              name="drivingLicenceDate"
              labelName={t("InsuranceTransport.Page1.drivingLicenceDate")}
              error={!!errors.drivingLicenceDate}
              helperText={errors?.drivingLicenceDate?.message}
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
