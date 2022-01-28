import React from "react";

import { useTranslation } from "next-i18next";

import { TextField, TextFieldProps, Typography } from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props extends InputProps {
  placeholder?: string;
  type?: string;
  optional?: boolean;
  autoFocus?: boolean;
  defaultValue?: string | undefined;
  width?: "s" | "m" | "l";
}

const Input = ({
  name,
  labelName,
  autoComplete,
  optional,
  defaultValue,
  width = "l",
  ...other
}: Props): JSX.Element => {
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
          <TextField
            inputRef={field.ref}
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
        <Typography variant="caption">
          {t(_.get(errors, `${name}.message`))}
        </Typography>
      </InputErrorMessage>
    </InputContainer>
  );
};

export default Input;
