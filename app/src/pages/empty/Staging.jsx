import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CTA } from "@components/buttons";

import { FileInput } from "@components/input";

import { setSnackbar } from "@redux/alert/actions";
import { useDispatch } from "react-redux";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";

const Staging = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(testSchema),
  });

  const formSubmit = (data) => {};

  return (
    <ContentWrap fullHeight xl>
      <CustomWrap>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <FileInput
            control={control}
            name="files"
            showFiles
            error={!!errors.files}
            helperText={errors?.files?.message}
          />
          {errors.files && <p>error</p>}
        </Form>
        <CTA text="Next" form="form" color="primary" />
      </CustomWrap>
    </ContentWrap>
  );
};

export default Staging;

const CustomWrap = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const testSchema = yup.object().shape({
  files: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1)
    .max(5)
    .test("is-big-file", "zdjęcie jest zbyt duże", checkIfFilesAreTooBig)
    .test(
      "is-correct-file",
      "nieodpowiedni typ zdjęcia",
      checkIfFilesAreCorrectType
    ),
});

export function checkIfFilesAreTooBig(files) {
  let valid = true;
  if (files) {
    files.forEach((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesAreCorrectType(files) {
  let valid = true;
  if (files) {
    files.forEach((file) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}
