import React from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { useForm } from "react-hook-form";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { DateInput, Input, Radio, Select } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/insurance-estate.schema";
import { nameSecurityOptions } from "./helpers/options";

type FormTypes = {
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
  estateType: string;
  floor: string;
  structure: string;
  areaM2: string;
  constructionYear: string;
  underConstruction: string;
  ownershipForm: string;
  creditOwnership: string;
  bankName: string;
  regon: string;
  nip: string;
  security: string;
  damagesNumber: string;
  insurancePeriod: string;
  insuranceStart: Date | null;
  subjectAndSum: string;
  flatAndFixed: string;
  householdGoods: string;
};

const Page1 = () => {
  const { t } = i18next;
  const router = useRouter();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData.insuranceEstate?.insuranceData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      country: appDataValid.country,
      city: appDataValid.city,
      postIndex: appDataValid.postIndex,
      street: appDataValid.street,
      houseNumber: appDataValid.houseNumber,
      estateType: appDataValid.estateType,
      floor: appDataValid.floor,
      structure: appDataValid.structure,
      areaM2: appDataValid.areaM2,
      constructionYear: appDataValid.constructionYear,
      underConstruction: appDataValid.underConstruction,
      ownershipForm: appDataValid.ownershipForm,
      creditOwnership: appDataValid.creditOwnership,
      bankName: appDataValid.bankName,
      regon: appDataValid.regon,
      nip: appDataValid.nip,
      security: appDataValid.security,
      damagesNumber: appDataValid.damagesNumber,
      insurancePeriod: appDataValid.insurancePeriod,
      insuranceStart: appDataValid.insuranceStart,
      subjectAndSum: appDataValid.subjectAndSum,
      flatAndFixed: appDataValid.flatAndFixed,
      householdGoods: appDataValid.householdGoods,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,

    resolver: yupResolver(pageOneSchema),
  });
  const { handleSubmit, watch } = methods;

  const estateType = watch("estateType", appDataValid.estateType);
  const assignedToBank = watch("creditOwnership", appDataValid.creditOwnership);

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceEstate", "insuranceData");
    setCurrentPage(2);
    router.push("./2");
  });

  return (
    <PageContainer xs title={t("insuranceEstate.title")}>
      <Typography variant="h4">{t("insuranceEstate.title")}</Typography>

      <ProgressBar
        maxSteps={2}
        currentStep={1}
        label={t("insuranceEstate.Page1.title")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceEstate.Page1.title")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Input name="country" labelName={t("insuranceEstate.Page1.country")} />
        <Input name="city" labelName={t("insuranceEstate.Page1.city")} />
        <Input
          name="postIndex"
          labelName={t("insuranceEstate.Page1.postIndex")}
        />
        <Input name="street" labelName={t("insuranceEstate.Page1.street")} />
        <Input
          name="houseNumber"
          labelName={t("insuranceEstate.Page1.houseNumber")}
        />

        <Radio
          name="estateType"
          labelName={t("insuranceEstate.Page1.estateType")}
          options={[
            {
              label: t("insuranceEstate.Page1.house"),
              value: "house",
            },
            {
              label: t("insuranceEstate.Page1.apartment"),
              value: "apartment",
            },
          ]}
        />
        {estateType === "apartment" && (
          <Radio
            name="floor"
            labelName={t("insuranceEstate.Page1.floor")}
            options={[
              {
                label: t("insuranceEstate.Page1.last"),
                value: "last",
              },
              {
                label: t("insuranceEstate.Page1.intermediate"),
                value: "intermediate",
              },
              {
                label: t("insuranceEstate.Page1.ground"),
                value: "ground",
              },
            ]}
          />
        )}

        <Radio
          name="structure"
          labelName={t("insuranceEstate.Page1.structure")}
          options={[
            {
              label: t("insuranceEstate.Page1.brick"),
              value: "brick",
            },
            {
              label: t("insuranceEstate.Page1.wood"),
              value: "wood",
            },
          ]}
        />
        <Input name="areaM2" labelName={t("insuranceEstate.Page1.areaM2")} />
        <Input
          name="constructionYear"
          labelName={t("insuranceEstate.Page1.constructionYear")}
        />

        <Radio
          name="underConstruction"
          labelName={t("insuranceEstate.Page1.underConstruction")}
          options={[
            {
              label: t("insuranceEstate.Page1.no"),
              value: "no",
            },
            {
              label: t("insuranceEstate.Page1.yes"),
              value: "yes",
            },
          ]}
        />

        <Radio
          name="ownershipForm"
          labelName={t("insuranceEstate.Page1.ownershipForm")}
          options={[
            {
              label: t("insuranceEstate.Page1.coOwnership"),
              value: "coOwnership",
            },
            {
              label: t("insuranceEstate.Page1.lease"),
              value: "lease",
            },
          ]}
        />

        <Radio
          name="creditOwnership"
          labelName={t("insuranceEstate.Page1.creditOwnership")}
          options={[
            {
              label: t("insuranceEstate.Page1.no"),
              value: "no",
            },
            {
              label: t("insuranceEstate.Page1.yes"),
              value: "yes",
            },
          ]}
        />
        {assignedToBank === "yes" && (
          <>
            <Input
              name="bankName"
              labelName={t("insuranceEstate.Page1.bankName")}
            />
            <Input name="regon" labelName={t("insuranceEstate.Page1.regon")} />
            <Input name="nip" labelName={t("insuranceEstate.Page1.nip")} />
          </>
        )}
        <Select
          name="security"
          labelName={t("insuranceEstate.Page1.security")}
          defaultValue={appDataValid.security}
          options={nameSecurityOptions(t)}
        />

        <Radio
          name="damagesNumber"
          labelName={t("insuranceEstate.Page1.damagesNumber")}
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

        <Radio
          name="insurancePeriod"
          labelName={t("insuranceEstate.Page1.insurancePeriod")}
          options={[
            {
              label: t("insuranceEstate.Page1.annual"),
              value: "annual",
            },
            {
              label: t("insuranceEstate.Page1.year3"),
              value: "year3",
            },
          ]}
        />
        <DateInput
          name="insuranceStart"
          labelName={t("insuranceEstate.Page1.insuranceStart")}
          disablePast
          placeholder={t("Form.Placeholder.dateFull")}
        />
        <Typography variant="body1">
          {t("insuranceEstate.Page1.subjectAndSum")}
        </Typography>
        <Input
          name="flatAndFixed"
          labelName={t("insuranceEstate.Page1.flatAndFixed")}
          placeholder="200 000 zl"
        />
        <Input
          name="householdGoods"
          labelName={t("insuranceEstate.Page1.householdGoods")}
          placeholder="100 000 zl"
        />
      </Form>
      <FormBuilder.ButtonsWrap>
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page1;
