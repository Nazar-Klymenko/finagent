import React from "react";

import { useTranslation } from "next-i18next";

import {
  FormControl,
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  defaultValue?: string | undefined;
  labelName: string;
  options: { label: string; value: string }[];
}

const Radio = ({
  name,
  defaultValue,
  options,
  labelName,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl component="fieldset">
      <Label htmlFor={name}>{labelName}</Label>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            name={name}
            onChange={field.onChange}
            value={field.value}
            id={name}
          >
            {options.length > 0 &&
              options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<MuiRadio color="primary" />}
                  label={option.label}
                  id={option.value}
                />
              ))}
          </RadioGroup>
        )}
      />

      <InputErrorMessage>
        <Typography variant="caption">
          {t(_.get(errors, `${name}.message`))}
        </Typography>
      </InputErrorMessage>
    </FormControl>
  );
};

export default Radio;
