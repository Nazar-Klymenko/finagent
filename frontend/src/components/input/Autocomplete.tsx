import React from "react";

import { useTranslation } from "next-i18next";

import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

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
  options: { label: string }[];
}

const Autocomplete = ({
  name,
  labelName,
  optional,
  defaultValue,
  options,
  width = "l",
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
        render={({ field }) => (
          <MuiAutocomplete
            id={name}
            disablePortal
            options={options}
            defaultValue={defaultValue}
            onChange={(e, data) => field.onChange(data)}
            freeSolo
            autoSelect
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!!_.get(errors, name)}
                  inputRef={field.ref}
                />
              );
            }}
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

export default Autocomplete;
