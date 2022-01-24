import React from "react";

import { useTranslation } from "next-i18next";

import { OutlinedInput, Typography } from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  placeholder?: string;
  optional?: boolean;
  rows?: number;
  defaultValue?: string | undefined;
}

const Textarea = ({
  name,
  labelName,
  placeholder,
  optional,
  defaultValue,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <InputContainer>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            onChange={field.onChange}
            value={field.value}
            multiline
            inputRef={field.ref}
            maxRows={8}
            fullWidth
            placeholder={placeholder}
            error={!!_.get(errors, name)}
            id={name}
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

export default Textarea;
