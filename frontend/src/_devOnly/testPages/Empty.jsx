import React from "react";
import { MuiSelect } from "@components/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CTA } from "@components/buttons";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";

const testSchema = yup.object().shape({
  testSelect: yup.string().required("Form.Error.blank"),
});

export const maritalStatusOptions = [
  {
    value: "married",
    label: "InsuranceTransport.SelectMarital.married",
  },
  {
    value: "single",
    label: "InsuranceTransport.SelectMarital.single",
  },
  {
    value: "divorced",
    label: "InsuranceTransport.SelectMarital.divorced",
  },
  {
    value: "widow",
    label: "InsuranceTransport.SelectMarital.widow",
  },
  {
    value: "separation",
    label: "InsuranceTransport.SelectMarital.separation",
  },
];

const Empty = () => {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(testSchema),
  });
  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <ContentWrap fullWidth blank>
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiSelect
          control={control}
          name="testSelect"
          error={!!errors.testSelect}
          helperText={errors?.testSelect?.message}
          optionArray={maritalStatusOptions}
        />
      </Form>
      <CTA text="Next" form="form" color="primary" />
    </ContentWrap>
  );
};

export default Empty;
