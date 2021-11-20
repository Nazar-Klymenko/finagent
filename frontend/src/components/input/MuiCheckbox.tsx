import React, { FC } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Controller, Control } from "react-hook-form";
import { Label, InputErrorMessage } from "./LocalStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface Props {
  control: Control;
  name: string;
  labelName: string;
  defaultChecked: boolean;
  error: boolean;
  spacer?: boolean;
  readOnly: boolean;
  helperText: string;
}

const MuiCheckbox: FC<Props> = ({
  name,
  labelName,
  defaultChecked,
  readOnly,
  spacer,
  control,
}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ value, onChange, ...other }) => (
              <Checkbox
                {...other}
                color="primary"
                checked={value}
                disabled={readOnly}
                onChange={(e) => onChange(e.target.checked)}
              />
            )}
          />
        }
        label={labelName}
      />

      {spacer && (
        <InputErrorMessage>
          <span className="invis-star">*</span>
        </InputErrorMessage>
      )}
    </>
  );
};

export default MuiCheckbox;
