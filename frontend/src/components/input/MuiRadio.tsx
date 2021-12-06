import React, { FC } from "react";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Control, Controller } from "react-hook-form";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  control: Control<any>;
  name: string;
  defaultValue?: string | undefined;
  legend: string;
  options: { label: string; value: string }[];
}

const MuiRadio: FC<Props> = ({
  name,
  defaultValue,
  options,
  legend,
  control,
}) => {
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
        <span className="invis-star">*</span>
      </InputErrorMessage>
    </FormControl>
  );
};

export default MuiRadio;
