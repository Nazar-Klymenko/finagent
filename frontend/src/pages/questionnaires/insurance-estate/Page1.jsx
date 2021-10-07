import React from "react";
import useTitle from "@hooks/useTitle";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import {
  Input,
  DateInput,
  MuiRadio,
  SelectInput,
  MuiSelect,
} from "@components/input";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";

import { pageOneSchema } from "./applicationHelpers/insuranceEstateSchema";
import { QuestState } from "@dev/QuestState";

import { nameSecurityOptions } from "./applicationHelpers/insuranceEstateOptions";

const Page1 = () => {
  const { t } = useTranslation();
  useTitle("Real estate insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const appDataValid = validateAppData(appData, "InsuranceData");
  const history = useHistory();

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      country: appDataValid.country,
      city: appDataValid.city,
      postIndex: appDataValid.postIndex,
      street: appDataValid.street,
      houseNumber: appDataValid.houseNumber,
      estateType: appDataValid.estateType || "house",
      floor: appDataValid.floor || "last",
      structure: appDataValid.structure || "brick",
      areaM2: appDataValid.areaM2,
      constructionYear: appDataValid.constructionYear,
      underConstruction: appDataValid.underConstruction || "no",
      ownershipForm: appDataValid.ownershipForm || "coOwnership",
      creditOwnership: appDataValid.creditOwnership || "no",
      bankName: appDataValid.bankName,
      regon: appDataValid.regon,
      nip: appDataValid.nip,
      security: appDataValid.security,
      damagesNumber: appDataValid.damagesNumber || "0",
      insurancePeriod: appDataValid.insurancePeriod || "annual",
      insuranceStart: appDataValid.insuranceStart,
      subjectAndSum: appDataValid.subjectAndSum,
      flatAndFixed: appDataValid.flatAndFixed,
      householdGoods: appDataValid.householdGoods,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });

  const estateType = watch("estateType") || appDataValid.estateType;
  const assignedToBank =
    watch("creditOwnership") || appDataValid.creditOwnership;

  const formSubmit = (data) => {
    setValues(data, "InsuranceData");
    setCurrentPage(2);
    history.push("./2");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceEstate.title")}</Title>
        <ProgressBar maxSteps={2} currentStep={1} label="Insurance Info" />
        <Subtitle>{t("InsuranceEstate.Page1.title")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Input
            name="country"
            labelName={t("InsuranceEstate.Page1.country")}
            ref={register}
            error={!!errors.country}
            helperText={errors?.country?.message}
          />
          <Input
            name="city"
            labelName={t("InsuranceEstate.Page1.city")}
            ref={register}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <Input
            name="postIndex"
            labelName={t("InsuranceEstate.Page1.postIndex")}
            ref={register}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
          />
          <Input
            name="street"
            labelName={t("InsuranceEstate.Page1.street")}
            ref={register}
            error={!!errors.street}
            helperText={errors?.street?.message}
          />
          <Input
            name="houseNumber"
            labelName={t("InsuranceEstate.Page1.houseNumber")}
            ref={register}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
          />

          <MuiRadio
            control={control}
            name="estateType"
            legend={t("InsuranceEstate.Page1.estateType")}
            options={[
              {
                label: t("InsuranceEstate.Page1.house"),
                value: "house",
              },
              {
                label: t("InsuranceEstate.Page1.apartment"),
                value: "apartment",
              },
            ]}
          />
          {estateType === "apartment" && (
            <MuiRadio
              control={control}
              name="floor"
              legend={t("InsuranceEstate.Page1.floor")}
              options={[
                {
                  label: t("InsuranceEstate.Page1.last"),
                  value: "last",
                },
                {
                  label: t("InsuranceEstate.Page1.intermediate"),
                  value: "intermediate",
                },
                {
                  label: t("InsuranceEstate.Page1.ground"),
                  value: "ground",
                },
              ]}
            />
          )}

          <MuiRadio
            control={control}
            name="structure"
            legend={t("InsuranceEstate.Page1.structure")}
            options={[
              {
                label: t("InsuranceEstate.Page1.brick"),
                value: "brick",
              },
              {
                label: t("InsuranceEstate.Page1.wood"),
                value: "wood",
              },
            ]}
          />
          <Input
            name="areaM2"
            labelName={t("InsuranceEstate.Page1.areaM2")}
            ref={register}
            error={!!errors.areaM2}
            helperText={errors?.areaM2?.message}
          />
          <Input
            name="constructionYear"
            labelName={t("InsuranceEstate.Page1.constructionYear")}
            ref={register}
            error={!!errors.constructionYear}
            helperText={errors?.constructionYear?.message}
          />

          <MuiRadio
            control={control}
            name="underConstruction"
            legend={t("InsuranceEstate.Page1.underConstruction")}
            options={[
              {
                label: t("InsuranceEstate.Page1.no"),
                value: "no",
              },
              {
                label: t("InsuranceEstate.Page1.yes"),
                value: "yes",
              },
            ]}
          />

          <MuiRadio
            control={control}
            name="ownershipForm"
            legend={t("InsuranceEstate.Page1.ownershipForm")}
            options={[
              {
                label: t("InsuranceEstate.Page1.coOwnership"),
                value: "coOwnership",
              },
              {
                label: t("InsuranceEstate.Page1.lease"),
                value: "lease",
              },
            ]}
          />

          <MuiRadio
            control={control}
            name="creditOwnership"
            legend={t("InsuranceEstate.Page1.creditOwnership")}
            options={[
              {
                label: t("InsuranceEstate.Page1.no"),
                value: "no",
              },
              {
                label: t("InsuranceEstate.Page1.yes"),
                value: "yes",
              },
            ]}
          />
          {assignedToBank === "yes" && (
            <>
              <Input
                name="bankName"
                labelName={t("InsuranceEstate.Page1.bankName")}
                ref={register}
                error={!!errors.bankName}
                helperText={errors?.bankName?.message}
              />
              <Input
                name="regon"
                labelName={t("InsuranceEstate.Page1.regon")}
                ref={register}
                error={!!errors.regon}
                helperText={errors?.regon?.message}
              />
              <Input
                name="nip"
                labelName={t("InsuranceEstate.Page1.nip")}
                ref={register}
                error={!!errors.nip}
                helperText={errors?.nip?.message}
              />
            </>
          )}
          <MuiSelect
            control={control}
            name="security"
            labelName={t("InsuranceEstate.Page1.security")}
            defaultValue={appDataValid.security}
            optionArray={nameSecurityOptions}
            error={!!errors.security}
            helperText={errors?.security?.message}
          />

          <MuiRadio
            control={control}
            name="damagesNumber"
            legend={t("InsuranceEstate.Page1.damagesNumber")}
            options={[
              {
                label: "0",
                value: "0",
              },
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3+",
                value: "3+",
              },
            ]}
          />

          <MuiRadio
            control={control}
            name="insurancePeriod"
            legend={t("InsuranceEstate.Page1.insurancePeriod")}
            options={[
              {
                label: t("InsuranceEstate.Page1.annual"),
                value: "annual",
              },
              {
                label: t("InsuranceEstate.Page1.year3"),
                value: "year3",
              },
            ]}
          />
          <DateInput
            control={control}
            name="insuranceStart"
            labelName={t("InsuranceEstate.Page1.insuranceStart")}
            error={!!errors.insuranceStart}
            helperText={errors?.insuranceStart?.message}
            defaultDate={appDataValid.insuranceStartDate}
            disablePastDates
          />
          <Subtitle>{t("InsuranceEstate.Page1.subjectAndSum")}</Subtitle>
          <Input
            name="flatAndFixed"
            labelName={t("InsuranceEstate.Page1.flatAndFixed")}
            ref={register}
            error={!!errors.flatAndFixed}
            helperText={errors?.flatAndFixed?.message}
            placeholder="200 000 zl"
          />
          <Input
            name="householdGoods"
            labelName={t("InsuranceEstate.Page1.householdGoods")}
            ref={register}
            error={!!errors.householdGoods}
            helperText={errors?.householdGoods?.message}
            placeholder="100 000 zl"
          />
        </Form>
        <ButtonsWrap>
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page1;
