import React, { FC } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Control, Controller } from "react-hook-form";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  control: Control<any>;
  name: string;
  labelName: string;
  defaultValue: boolean | undefined;
  error: boolean;
  spacer?: boolean;
  readOnly: boolean;
  helperText: string | undefined;
}

const MuiCheckbox: FC<Props> = ({
  name,
  labelName,
  defaultValue,
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
            defaultValue={defaultValue}
            render={({ field }) => (
              <Checkbox
                {...field}
                color="primary"
                checked={field.value}
                disabled={readOnly}
                onChange={(e) => field.onChange(e.target.checked)}
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
