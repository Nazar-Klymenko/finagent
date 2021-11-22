import React, { FC } from "react";

import { Controller, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Label, InputErrorMessage, Optional } from "./LocalStyles";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";

interface Props {
  control: Control<any>;
  name: string;
  error: boolean;
  helperText: string | undefined;
  labelName: string;
  optional?: boolean;
  defaultValue?: string | undefined;
}

const MuiPhoneInput: FC<Props> = ({
  control,
  name,
  error,
  defaultValue,
  helperText = "",
  labelName,
  optional,
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
          <PhoneInput
            onChange={field.onChange}
            value={field.value}
            country="pl"
            // error={error}
            onlyCountries={["pl", "ua", "by", "ru"]}
            specialLabel=""
            priority={{ pl: 0 }}
            inputStyle={{
              width: "100%",
              transition: "none",
            }}
          />
        )}
      />
      <InputErrorMessage>
        <span className="invis-star">*</span>
        {helperText}
      </InputErrorMessage>
    </>
  );
};

export default MuiPhoneInput;
