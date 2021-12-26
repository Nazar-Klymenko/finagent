import React, { FC } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  defaultValue?: string | undefined;
  legend: string;
  options: { label: string; value: string }[];
}

const MuiRadio: FC<Props> = ({ name, defaultValue, options, legend }) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl component="fieldset">
      <Label htmlFor={name}>{legend}</Label>

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
                  control={<Radio color="primary" />}
                  label={option.label}
                />
              ))}
          </RadioGroup>
        )}
      />

      <InputErrorMessage>
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </FormControl>
  );
};

export default MuiRadio;
