import React, { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label, InputErrorMessage, Optional } from "./LocalStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

interface Props {
  control: Control;
  helperText: string;
  error: boolean;
  labelName: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  autoFocus?: boolean;
}

const MuiInput: FC<Props> = ({
  name,
  labelName,
  error,
  helperText = "",
  autoComplete,
  control,
  optional,
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
        render={({ field }) => (
          <OutlinedInput
            {...field}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            id={name}
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
