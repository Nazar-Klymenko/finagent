import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  Typography,
} from "@mui/material";
import i18next from "i18next";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { InputContainer, InputErrorMessage } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  defaultValue?: boolean | undefined;
  errorSpacer?: boolean;
  readOnly?: boolean;
  defaultChecked?: boolean;
}

const Checkbox = ({
  name,
  labelName,
  defaultValue,
  errorSpacer,
  readOnly,
}: Props): JSX.Element => {
  const { t } = i18next;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <InputContainer>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormControlLabel
            style={{ maxWidth: "680px" }}
            control={
              <MuiCheckbox
                inputRef={field.ref}
                checked={!!field.value}
                disabled={readOnly}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={labelName}
          />
        )}
      />

      {errorSpacer && (
        <InputErrorMessage>
          <Typography variant="caption">
            {t(_.get(errors, `${name}.message`))}
          </Typography>
        </InputErrorMessage>
      )}
    </InputContainer>
  );
};

export default Checkbox;
