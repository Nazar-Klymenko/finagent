import React from "react";
import styled from "styled-components";
import { MuiPasswordInput } from "@components/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CTA } from "@components/buttons";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";

const testSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "minimum 8 znaków")
    .test("minOneUppercase", "minimum 1 duża litera", checkUpperCase)
    .test("minOneSymbol", "minimum 1 symbol", checkSymbol)
    .test("minOneNumber", "minimum 1 number", checkForNumber),
});

function checkForNumber(password) {
  let valid = true;
  let format = /\d/;

  if (!format.test(password)) valid = false;
  return valid;
}
function checkUpperCase(password) {
  let valid = true;
  let format = /r"(?=.*[A-Z])\w+"/;

  if (!format.test(password)) valid = false;
  return valid;
}
function checkSymbol(password) {
  let valid = true;
  let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!format.test(password)) valid = false;
  return valid;
}

const Empty = () => {
  const { handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    criteriaMode: "all",
    resolver: yupResolver(testSchema),
  });
  const formSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <ContentWrap authForm blank direction="column">
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiPasswordInput
          control={control}
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
          requirements={["min 8 characters long", "Uppercase letter"]}
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
