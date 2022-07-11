import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { MenuItem, Select as MuiSelect, Typography } from "@mui/material";
import i18next from "i18next";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { InputContainer, InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  // options: { label: string; value: string }[];
  options: string[];
  placeholder?: string;
  defaultValue?: string | undefined;
  width?: "s" | "m" | "l";
}

const Select = ({
  name,
  labelName,
  options,
  placeholder,
  defaultValue,
  width = "l",
}: Props): JSX.Element => {
  const { t } = i18next;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <InputContainer width={width}>
      <Label htmlFor={name}>{labelName}</Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <MuiSelect
            onChange={field.onChange}
            value={field.value}
            placeholder={placeholder}
            inputRef={field.ref}
            error={!!_.get(errors, name)}
            labelId="demo-customized-select-label"
            id={name}
            variant="outlined"
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
          >
            {options.length > 0 &&
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            {/* {options.length > 0 &&
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))} */}
          </MuiSelect>
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

export default Select;
