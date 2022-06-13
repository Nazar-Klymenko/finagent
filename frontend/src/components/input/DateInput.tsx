import React from "react";

import { useTranslation } from "next-i18next";

import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { InputContainer, InputErrorMessage, Label } from "./LocalStyles";

interface Props extends InputProps {
  defaultValue?: any;
  placeholder?: string;
  view?: ["day"] | ["year", "month"] | ["year", "month", "day"] | ["year"];
  format?: "dd/MM/yyyy" | "yyyy";
  disablePast?: boolean;
  disableFuture?: boolean;
  maxDate?: Date;
  minDate?: Date;
  openTo?: "year";
}

const DateInput = ({
  labelName,
  name,
  defaultValue,
  placeholder,
  view = ["year", "month", "day"],
  format = "dd/MM/yyyy",
  autoComplete,
  ...other
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <InputContainer>
      <Label htmlFor={name}>{labelName}</Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || null}
        render={({ field }) => (
          <DatePicker
            {...other}
            leftArrowButtonText={t("Form.Inputs.DateInput.leftArrowButtonText")}
            rightArrowButtonText={t(
              "Form.Inputs.DateInput.rightArrowButtonText"
            )}
            okText={t("Form.Inputs.DateInput.okText")}
            todayText={t("Form.Inputs.DateInput.todayText")}
            clearText={t("Form.Inputs.DateInput.clearText")}
            cancelText={t("Form.Inputs.DateInput.cancelText")}
            toolbarTitle={t("Form.Inputs.DateInput.toolbarTitle")}
            inputFormat={format}
            onChange={field.onChange}
            value={field.value}
            mask="__/__/____"
            views={view}
            inputRef={field.ref}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder,
                  }}
                  autoComplete={autoComplete}
                  error={!!_.get(errors, name)}
                  helperText={null}
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

export default DateInput;
