import React, { FC } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "lodash";
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
        style={{ maxWidth: "680px" }}
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
          {t(_.get(errors, `${name}.message`))}
        </InputErrorMessage>
      )}
    </>
  );
};

export default MuiCheckbox;
