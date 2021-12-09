import React, { FC } from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label, Optional } from "./LocalStyles";

interface Props {
  control: Control<any>;
  helperText: string | undefined;
  error: boolean | undefined;
  labelName: string;
  name: string;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  defaultValue?: string | undefined;
}

const MuiInput: FC<Props> = ({
  name,
  labelName,
  error,
  helperText = "",
  autoComplete,
  control,
  optional,
  defaultValue,
  ...other
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            onChange={field.onChange}
            value={field.value}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            id={name}
            autoComplete={autoComplete}
            error={error}
            {...other}
          />
        )}
      />

      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </>
  );
};

export default MuiInput;
