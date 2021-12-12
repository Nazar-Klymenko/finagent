import React, { FC } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  control: Control<any>;
  name: string;
  labelName: string;
  defaultValue?: boolean | undefined;
  spacer?: boolean;
  readOnly?: boolean;
  defaultChecked?: boolean;
  helperText?: string | undefined;
}

const MuiCheckbox: FC<Props> = ({
  name,
  labelName,
  defaultValue,
  readOnly,
  spacer,
  control,
  helperText = "",
  ...other
}) => {
  const { t } = useTranslation();

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
          {t(helperText)}
        </InputErrorMessage>
      )}
    </>
  );
};

export default MuiCheckbox;
