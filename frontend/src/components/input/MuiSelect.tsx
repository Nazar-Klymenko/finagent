import React, { FC } from "react";

import { Select } from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputContainer, InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  optionArray: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: string | undefined;
  width?: "s" | "m" | "l";
}

const MuiSelect: FC<Props> = ({
  name,
  labelName,
  optionArray,
  placeholder,
  defaultValue,
  width = "l",
}) => {
  const { t } = useTranslation();
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
          <Select
            onChange={field.onChange}
            value={field.value}
            placeholder={placeholder}
            error={!!_.get(errors, name)}
            labelId="demo-customized-select-label"
            id={name}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            variant="outlined"
            MenuProps={{
              disableScrollLock: true,
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
            {optionArray.length > 0 &&
              optionArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
          </Select>
        )}
      />
      <InputErrorMessage>
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </InputContainer>
  );
};

export default MuiSelect;
