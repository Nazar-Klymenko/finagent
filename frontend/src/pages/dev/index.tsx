import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Form from "@components/Form";
import { Button } from "@components/buttons";
import {
  Autocomplete,
  Checkbox,
  DateInput,
  FileInput,
  Input,
  MuiPhoneInput,
  PasswordInput,
  Radio,
  Select,
  Slider,
  Textarea,
} from "@components/input";
import { PageContainer } from "@components/layout";

type FormTypes = {
  text: string;
  checkbox: boolean;
  drivingLicenceDate: Date | null;
  phone: string;
  password: string;
  textarea: string;
  choices: string;
  select: string;
  autocomplete: string;
  slider: number;
  files: File[] | null;
};

const Dev = () => {
  const { t } = useTranslation();

  const methods = useForm<FormTypes>({
      defaultValues: {
        text: "",
        checkbox: false,
        drivingLicenceDate: null,
        phone: "",
        password: "",
        textarea: "",
        choices: "1",
        select: "",
        autocomplete: "",
        slider: 1,
        files: null,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      resolver: yupResolver(schema),
    }),
    { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <MuiPhoneInput name="phone" labelName="phone" />
        <FileInput name="files" labelName="file input" />

        <Autocomplete
          name="autocomplete"
          labelName="autocomplete"
          options={[
            t("InsuranceTransport.SelectVehicle.motorcycle"),
            t("InsuranceTransport.SelectVehicle.personal"),
            t("InsuranceTransport.SelectVehicle.truck"),
            t("InsuranceTransport.SelectVehicle.bus"),
          ]}
        />

        <Input name="text" labelName="input" />
        <Checkbox name="checkbox" labelName="checkbox" errorSpacer />
        <DateInput
          name="drivingLicenceDate"
          labelName="Date input"
          placeholder={t("Form.Placeholder.dateFull")}
          disableFuture
          view={["year", "month", "day"]}
        />
        <PasswordInput name="password" labelName="password" />
        <Textarea name="textarea" labelName="Textarea" />
        <Radio
          name="choices"
          labelName="Radio"
          options={[
            { label: "one", value: "1" },
            { label: "two", value: "2" },
          ]}
        />
        <Select
          name="select"
          labelName="Select"
          options={[
            {
              value: "individual",
              label: t("InsuranceTransport.SelectParking.individual"),
            },
            {
              value: "shared",
              label: t("InsuranceTransport.SelectParking.shared"),
            },
            {
              value: "guarded",
              label: t("InsuranceTransport.SelectParking.guarded"),
            },
            {
              value: "fenced",
              label: t("InsuranceTransport.SelectParking.fenced"),
            },
            {
              value: "unsecured",
              label: t("InsuranceTransport.SelectParking.unsecured"),
            },
          ]}
        />
        <Slider
          name="slider"
          labelName="slider"
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6+" },
          ]}
        />
      </Form>
      <Button form="form-transport" color="primary">
        {t("Basic.buttonNext")}
      </Button>
    </PageContainer>
  );
};

export default Dev;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const schema = yup.object().shape({
  autocomplete: yup.string().required("Form.Error.blank"),
  text: yup.string().required("Form.Error.blank"),
  checkbox: yup.boolean().isTrue("checkThis"),
  drivingLicenceDate: yup.date(),
  phone: yup.string().required("Form.Error.blank"),
  password: yup.string().required("Form.Error.blank"),
  textarea: yup.string().required("Form.Error.blank"),
  choices: yup.string().required("Form.Error.blank"),
  select: yup.string().required("Form.Error.blank"),
  slider: yup.number(),
  files: yup.array(),
});
