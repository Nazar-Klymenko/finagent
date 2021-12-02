import React, { FC } from "react";

import { Select } from "@material-ui/core/";
import MenuItem from "@material-ui/core/MenuItem";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  control: Control<any>;
  name: string;
  labelName: string;
  error: boolean;
  optionArray: { label: string; value: string }[];
  helperText: string | undefined;
  placeholder?: string;
  defaultValue?: string | undefined;
}

const MuiSelect: FC<Props> = ({
  control,
  name,
  labelName,
  error,
  helperText = "",
  optionArray,
  placeholder,
  defaultValue,
}) => {
  const { t } = useTranslation();
  return (
    <>
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
            error={!!error}
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
              getContentAnchorEl: null,
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
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </>
  );
};

export default MuiSelect;