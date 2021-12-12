import React, { FC } from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label, Optional } from "./LocalStyles";

interface Props {
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
  autoComplete,
  optional,
  defaultValue,
  ...other
}) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  // console.log(errors);
  // console.log(errors?.name?.message);
  // console.log(control);
  return (
    <>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        key={name}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            key={name}
            onChange={field.onChange}
            value={field.value}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            id={name}
            autoComplete={autoComplete}
            error={!!errors[name]}
            {...other}
          />
        )}
      />

      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(errors?.[name]?.message)}
      </InputErrorMessage>
    </>
  );
};

export default MuiInput;
