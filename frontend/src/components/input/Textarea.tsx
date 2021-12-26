import React from "react";

import { OutlinedInput } from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label, Optional } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  placeholder?: string;
  optional?: boolean;
  rows?: number;
  defaultValue?: string | undefined;
}

const Textarea: React.FC<Props> = ({
  name,
  labelName,
  rows,
  placeholder,
  optional,
  defaultValue,
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
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
            rows={rows}
            maxRows={8}
            fullWidth
            placeholder={placeholder}
            error={!!_.get(errors, name)}
            id={name}
          />
        )}
      />

      <InputErrorMessage>
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </>
  );
};

export default Textarea;
