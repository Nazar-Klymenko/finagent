import React from "react";
import { MuiSelect, DateInput } from "@components/input";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CTA } from "@components/buttons";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { OutlinedInput } from "@mui/material";

const testSchema = yup.object().shape({
  testSelect: yup.string().required("Form.Error.blank"),
});

const Empty = () => {
  const { t } = useTranslation();

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
        <OutlinedInput size="medium" />
      </Form>
      <CTA text="Next" form="form" color="primary" />
    </ContentWrap>
  );
};

export default Empty;
