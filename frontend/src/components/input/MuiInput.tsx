import React, { FC, useEffect, useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props {
  labelName: string;
  name: string;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  defaultValue?: string | undefined;
  width?: "s" | "m" | "l";
}

const MuiInput: FC<Props> = ({
  name,
  labelName,
  autoComplete,
  optional,
  defaultValue,
  width = "l",
  ...other
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <InputContainer width={width}>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        key={name}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <StyledInput
            key={name}
            onChange={field.onChange}
            value={field.value}
            id={name}
            autoComplete={autoComplete}
            error={!!_.get(errors, name)}
            {...other}
          />
        )}
      />

      <InputErrorMessage>
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </InputContainer>
  );
};

export default MuiInput;

const StyledInput = styled(OutlinedInput)`
  font-family: "Poppins", "sans-serif";
`;
