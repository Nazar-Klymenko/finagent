import React, { FC } from "react";

import { Controller } from "react-hook-form";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Label, InputErrorMessage, Optional } from "./LocalStyles";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";

interface Props {
  control: any;
  name: string;
  error: boolean;
  helperText: string;
  labelName: string;
  optional?: boolean;
}

const MuiPhoneInput: FC<Props> = ({
  control,
  name,
  error,
  helperText,
  labelName,
  optional,
}) => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            country="pl"
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
    </ThemeProvider>
  );
};

export default MuiPhoneInput;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
  },
  transitions: {
    easing: {
      easeOut: "cubic-bezier(0, 1.5, .8, 1)",
      sharp: "linear",
    },
  },
});
