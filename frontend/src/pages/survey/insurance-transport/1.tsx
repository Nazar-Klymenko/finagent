import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import withAuthForm from "@helpers/withAuthForm";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormBuilder from "@components/FormBuilder";
import ProgressBar from "@components/ProgressBar";
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

type FormTypes = {
  oc: boolean;
  ac: boolean;
  greenCard: boolean;
  assistance: boolean;
  coverage: any;
  fullName: string;
  phoneNumber: string;
  postIndex: string;
  city: string;
  voivodeship: string;
  street: string;
  houseNumber: string;
  documentAddedType: string;
  documentAdded: string;
  isAppropLicence: boolean;
  drivingLicenceDate: Date | null;
  profession: string;
  maritalStatus: string;
  atleastOneCheckbox: any;
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
        fullName: appDataValid.fullName,
        phoneNumber: appDataValid.phoneNumber,
        postIndex: appDataValid.postIndex,
        city: appDataValid.city,
        voivodeship: appDataValid.voivodeship,
        street: appDataValid.street,
        houseNumber: appDataValid.houseNumber,
        documentAddedType: appDataValid.documentAddedType,
        documentAdded: appDataValid.documentAdded,
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

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={1}
        label={t("InsuranceTransport.Page1.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceTransport.Page1.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Typography variant="body1">
          {t("InsuranceTransport.Page1.insuranceCoverage")}
        </Typography>

        <Checkbox labelName={t("InsuranceTransport.Page1.oc")} name="oc" />
        <Checkbox labelName={t("InsuranceTransport.Page1.ac")} name="ac" />
        <Checkbox
          labelName={t("InsuranceTransport.Page1.greenCard")}
          name="greenCard"
        />
        <Checkbox
          errorSpacer
          labelName={t("InsuranceTransport.Page1.assistance")}
          name="assistance"
        />

        <Input
          name="fullName"
          labelName={t("InsuranceTransport.Page1.name")}
          type="text"
          autoComplete="name"
        />
        <MuiPhoneInput
          name="phoneNumber"
          labelName={t("InsuranceTransport.Page1.phoneNumber")}
        />
        <Input
          name="voivodeship"
          labelName={t("InsuranceTransport.Page1.voivodeship")}
        />
        <Input name="city" labelName={t("InsuranceTransport.Page1.city")} />

        <FormBuilder.InputsWrap>
          <Input
            name="street"
            labelName={t("InsuranceTransport.Page1.street")}
          />
          <Input
            name="houseNumber"
            labelName={t("InsuranceTransport.Page1.houseNumber")}
            width="s"
          />
          <Input
            name="postIndex"
            labelName={t("InsuranceTransport.Page1.postIndex")}
            autoComplete="postal-code"
            width="s"
          />
        </FormBuilder.InputsWrap>

        <Radio
          name="documentAddedType"
          labelName={t("InsuranceTransport.Page1.documentAddedType")}
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
          name="documentAdded"
          labelName={t(`InsuranceTransport.Page1.${documentTypeName}`)}
        />

        <Autocomplete
          name="profession"
          defaultValue={appDataValid.profession}
          labelName={t("InsuranceTransport.Page1.profession")}
          options={[
            t("InsuranceTransport.SelectProfession.unemployed"),
            t("InsuranceTransport.SelectProfession.retired"),
            t("InsuranceTransport.SelectProfession.housewife"),
            t("InsuranceTransport.SelectProfession.engineer"),
            t("InsuranceTransport.SelectProfession.management"),
            t("InsuranceTransport.SelectProfession.driver"),
            t("InsuranceTransport.SelectProfession.doctor"),
            t("InsuranceTransport.SelectProfession.teacher"),
            t("InsuranceTransport.SelectProfession.operator"),
            t("InsuranceTransport.SelectProfession.administration"),
            t("InsuranceTransport.SelectProfession.office"),
            t("InsuranceTransport.SelectProfession.it"),
            t("InsuranceTransport.SelectProfession.customer"),
            t("InsuranceTransport.SelectProfession.sales"),
            t("InsuranceTransport.SelectProfession.physical"),
            t("InsuranceTransport.SelectProfession.poczta"),
            t("InsuranceTransport.SelectProfession.education"),
            t("InsuranceTransport.SelectProfession.technical"),
            t("InsuranceTransport.SelectProfession.lawyer"),
            t("InsuranceTransport.SelectProfession.entrepreneur"),
            t("InsuranceTransport.SelectProfession.comercial"),
            t("InsuranceTransport.SelectProfession.farmer"),
            t("InsuranceTransport.SelectProfession.uniformed"),
            t("InsuranceTransport.SelectProfession.athlete"),
            t("InsuranceTransport.SelectProfession.student"),
            t("InsuranceTransport.SelectProfession.soldier"),
            t("InsuranceTransport.SelectProfession.other"),
          ]}
        />
        <Select
          name="maritalStatus"
          labelName={t("InsuranceTransport.Page1.maritalStatus")}
          options={[
            t("InsuranceTransport.SelectMarital.married"),
            t("InsuranceTransport.SelectMarital.single"),
            t("InsuranceTransport.SelectMarital.divorced"),
            t("InsuranceTransport.SelectMarital.widow"),
            t("InsuranceTransport.SelectMarital.separation"),
          ]}
        />

        <Checkbox
          name="isAppropLicence"
          labelName={t("InsuranceTransport.Page1.isAppropLicence")}
        />

        {isAppropLicence && (
          <DateInput
            name="drivingLicenceDate"
            labelName={t("InsuranceTransport.Page1.drivingLicenceDate")}
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

export default withAuthForm(Page1);

const pageOneSchema = yup
  .object()
  .shape({
    oc: yup.boolean(),
    ac: yup.boolean(),
    greenCard: yup.boolean(),
    assistance: yup.boolean(),
    fullName: yup
      .string()
      .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
      .required("Form.Error.blank"),
    phoneNumber: yup.string().required("Form.Error.blank"),
    postIndex: yup.string().required("Form.Error.blank"),
    city: yup.string().required("Form.Error.blank"),
    voivodeship: yup.string().required("Form.Error.blank"),
    street: yup.string().required("Form.Error.blank"),
    houseNumber: yup.string().required("Form.Error.blank"),
    documentAddedType: yup.string(),
    documentAdded: yup.string().required("Form.Error.blank"),
    isAppropLicence: yup.boolean(),
    drivingLicenceDate: yup
      .date()
      .nullable()
      .when("isAppropLicence", {
        is: true,
        then: yup
          .date()
          .required("Form.Error.missingDate")
          .nullable()
          .typeError("Form.Error.invalidDate"),
      }),
    profession: yup.string().nullable().required("Form.Error.blank"),
    maritalStatus: yup.string().required("Form.Error.blank"),
  })
  .test("atleastOneCheckbox", "", checkCheckboxes);

function checkCheckboxes(obj: any) {
  if (obj.ac || obj.oc || obj.greenCard || obj.assistance) {
    return true;
  }

  return new yup.ValidationError("Form.Error.minimumOne", null, "assistance");
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
