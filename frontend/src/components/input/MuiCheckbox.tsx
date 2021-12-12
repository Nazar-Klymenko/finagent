import React, { FC } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  defaultValue?: boolean | undefined;
  spacer?: boolean;
  readOnly?: boolean;
  defaultChecked?: boolean;
}

const MuiCheckbox: FC<Props> = ({
  name,
  labelName,
  defaultValue,
  readOnly,
  spacer,
  ...other
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
          {t(errors?.name?.message)}
        </InputErrorMessage>
      )}
    </>
  );
};

export default MuiCheckbox;
