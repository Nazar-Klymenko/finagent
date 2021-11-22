import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import Form from "@components/Form";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiPasswordInput } from "@components/input";

const testSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "minimum 8 znaków")
    .test("minOneNumber", "minimum 1 number", checkForNumber),
});

function checkForNumber(password) {
  let valid = true;
  let format = /\d/;

  if (!format.test(password)) valid = false;
  return valid;
}

const Empty = () => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    criteriaMode: "all",
    resolver: yupResolver(testSchema),
  });
  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <ContentWrap authForm blank direction="column">
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiPasswordInput
          control={control}
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
          errorList={errors?.password?.types}
        />
      </Form>
      <ButtonsWrap>
        <CTA text="Next" form="form" color="primary" />
      </ButtonsWrap>
    </ContentWrap>
  );
};

export default Empty;
const ButtonsWrap = styled.div`
  padding: 16px 0px 16px;
  display: flex;
  justify-content: "flex-end";
`;
