import React from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import {
  Autocomplete,
  Checkbox,
  DateInput,
  Input,
  MuiPhoneInput,
  Radio,
  Select,
} from "@components/input";
import { PageContainer } from "@components/layout";

import { pageOneSchema } from "./helpers/schema";

type FormTypes = {
  oc: boolean;
  ac: boolean;
  greenCard: boolean;
  assistance: boolean;
  policyholderIs: string;
  name: string;
  companyName: string;
  documentAddedType: string;
  documentAdded: string;
  nip: string;
  phoneNumber: string;
  postIndex: string;
  city: string;
  voivodeship: string;
  houseNumber: string;
  street: string;
  isAppropLicence: boolean;
  birthDate: Date | null;
  drivingLicenceDate: Date | null;
  profession: string;
  maritalStatus: string;
};

const Page1 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.personalData;

  const methods = useForm<FormTypes>({
      defaultValues: {
        oc: appDataValid.oc,
        ac: appDataValid.ac,
        greenCard: appDataValid.greenCard,
        assistance: appDataValid.assistance,
        policyholderIs: appDataValid.policyholderIs,
        name: appDataValid.name,
        companyName: appDataValid.companyName,
        phoneNumber: appDataValid.phoneNumber,
        postIndex: appDataValid.postIndex,
        city: appDataValid.city,
        voivodeship: appDataValid.voivodeship,
        street: appDataValid.street,
        houseNumber: appDataValid.houseNumber,
        documentAddedType: appDataValid.documentAddedType,
        documentAdded: appDataValid.documentAdded,
        nip: appDataValid.nip,
        birthDate: appDataValid.birthDate,
        isAppropLicence: appDataValid.isAppropLicence,
        drivingLicenceDate: appDataValid.drivingLicenceDate,
        profession: appDataValid.profession,
        maritalStatus: appDataValid.maritalStatus,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,
      resolver: yupResolver(pageOneSchema),
    }),
    { handleSubmit, watch } = methods;

  const isAppropLicence = watch("isAppropLicence");
  const documentTypeName = watch("documentAddedType");

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTransport", "personalData");
    setCurrentPage(2);
    router.push("./2");
  });

  const policyholderIs = watch("policyholderIs", appDataValid.policyholderIs);

  return (
    <PageContainer xs title="insuranceTransport.title">
      <Typography variant="h4">{t("insuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={1}
        label={t("insuranceTransport.Page1.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTransport.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Typography variant="body1">
          {t("insuranceTransport.Page1.insuranceCoverage")}
        </Typography>

        <Checkbox labelName={t("insuranceTransport.Page1.oc")} name="oc" />
        <Checkbox labelName={t("insuranceTransport.Page1.ac")} name="ac" />
        <Checkbox
          labelName={t("insuranceTransport.Page1.greenCard")}
          name="greenCard"
        />
        <Checkbox
          errorSpacer
          labelName={t("insuranceTransport.Page1.assistance")}
          name="assistance"
        />

        <Radio
          name="policyholderIs"
          labelName={t("insuranceSpecialist.Page1.policyholderIs")}
          options={[
            {
              label: t("insuranceSpecialist.Page1.individual"),
              value: "individual",
            },
            {
              label: t("insuranceSpecialist.Page1.firm"),
              value: "firm",
            },
            {
              label: t("insuranceSpecialist.Page1.legal"),
              value: "legal",
            },
          ]}
        />

        {policyholderIs === "individual" ? (
          <Input
            name="name"
            labelName={t("insuranceSpecialist.Page1.name")}
            autoComplete="name"
          />
        ) : (
          <Input
            name="companyName"
            labelName={t("insuranceSpecialist.Page1.companyName")}
          />
        )}

        {policyholderIs === "individual" ? (
          <>
            <Radio
              name="documentAddedType"
              labelName={t("insuranceTransport.Page1.documentAddedType")}
              options={[
                {
                  label: t("insuranceTransport.Page1.pesel"),
                  value: "pesel",
                },
                {
                  label: t("insuranceTransport.Page1.regon"),
                  value: "regon",
                },
                {
                  label: t("insuranceTransport.Page1.passport"),
                  value: "passport",
                },
              ]}
            />

            <Input
              name="documentAdded"
              labelName={t(`insuranceTransport.Page1.${documentTypeName}`)}
            />
          </>
        ) : (
          <Input
            name="nip"
            labelName={t("insuranceSpecialist.Page1.nip")}
            type="text"
          />
        )}

        {policyholderIs === "individual" && (
          <DateInput
            name="birthDate"
            labelName={t("insuranceSpecialist.Page1.birthDate")}
            disableFuture
            placeholder={t("Form.Placeholder.dateFull")}
            view={["year", "month", "day"]}
            openTo="year"
          />
        )}

        <MuiPhoneInput
          name="phoneNumber"
          labelName={t("insuranceTransport.Page1.phoneNumber")}
        />
        <Input
          name="voivodeship"
          labelName={t("insuranceTransport.Page1.voivodeship")}
        />
        <Input name="city" labelName={t("insuranceTransport.Page1.city")} />

        <FormBuilder.InputsWrap>
          <Input
            name="street"
            labelName={t("insuranceTransport.Page1.street")}
          />
          <Input
            name="houseNumber"
            labelName={t("insuranceTransport.Page1.houseNumber")}
            width="s"
          />
          <Input
            name="postIndex"
            labelName={t("insuranceTransport.Page1.postIndex")}
            autoComplete="postal-code"
            width="s"
          />
        </FormBuilder.InputsWrap>

        {policyholderIs === "individual" && (
          <>
            <Autocomplete
              name="profession"
              defaultValue={appDataValid.profession}
              labelName={t("insuranceTransport.Page1.profession")}
              options={[
                t("insuranceTransport.SelectProfession.unemployed"),
                t("insuranceTransport.SelectProfession.retired"),
                t("insuranceTransport.SelectProfession.housewife"),
                t("insuranceTransport.SelectProfession.engineer"),
                t("insuranceTransport.SelectProfession.management"),
                t("insuranceTransport.SelectProfession.driver"),
                t("insuranceTransport.SelectProfession.doctor"),
                t("insuranceTransport.SelectProfession.teacher"),
                t("insuranceTransport.SelectProfession.operator"),
                t("insuranceTransport.SelectProfession.administration"),
                t("insuranceTransport.SelectProfession.office"),
                t("insuranceTransport.SelectProfession.it"),
                t("insuranceTransport.SelectProfession.customer"),
                t("insuranceTransport.SelectProfession.sales"),
                t("insuranceTransport.SelectProfession.physical"),
                t("insuranceTransport.SelectProfession.poczta"),
                t("insuranceTransport.SelectProfession.education"),
                t("insuranceTransport.SelectProfession.technical"),
                t("insuranceTransport.SelectProfession.lawyer"),
                t("insuranceTransport.SelectProfession.entrepreneur"),
                t("insuranceTransport.SelectProfession.comercial"),
                t("insuranceTransport.SelectProfession.farmer"),
                t("insuranceTransport.SelectProfession.uniformed"),
                t("insuranceTransport.SelectProfession.athlete"),
                t("insuranceTransport.SelectProfession.student"),
                t("insuranceTransport.SelectProfession.soldier"),
                t("insuranceTransport.SelectProfession.other"),
              ]}
            />
            <Select
              name="maritalStatus"
              labelName={t("insuranceTransport.Page1.maritalStatus")}
              options={[
                t("insuranceTransport.SelectMarital.married"),
                t("insuranceTransport.SelectMarital.single"),
                t("insuranceTransport.SelectMarital.divorced"),
                t("insuranceTransport.SelectMarital.widow"),
                t("insuranceTransport.SelectMarital.separation"),
              ]}
            />
          </>
        )}

        <Checkbox
          name="isAppropLicence"
          labelName={t("insuranceTransport.Page1.isAppropLicence")}
        />

        {isAppropLicence && (
          <DateInput
            name="drivingLicenceDate"
            labelName={t("insuranceTransport.Page1.drivingLicenceDate")}
            placeholder={t("Form.Placeholder.dateFull")}
            disableFuture
            view={["year", "month", "day"]}
            autoComplete="off"
          />
        )}
      </Form>
      <FormBuilder.ButtonsWrap>
        <Button form="form-transport" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page1;
