import React, { useState, useEffect, FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Controller } from "react-hook-form";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { uk, ru, pl, enGB } from "date-fns/esm/locale";
import { useTranslation } from "react-i18next";

import { Label, InputErrorMessage } from "./LocalStyles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
  },
});

interface Props {
  control: any;
  helperText: string;
  error: boolean;
  labelName: string;
  name: string;
  defaultDate: any;
  placeholder: string;
  view: ["date"] | ["year", "month", "date"] | ["year"];
  format: "dd/MM/yyyy" | "yyyy";
  disablePast: boolean;
  disableFuture: boolean;
  maxDate: Date;
  minDate: Date;
}

const DateInput: FC<Props> = ({
  control,
  helperText,
  error,
  labelName,
  name,
  defaultDate,
  placeholder,
  view = ["date"],
  format = "dd/MM/yyyy",
  ...other
}) => {
  const { i18n, t } = useTranslation();
  const [value, setValue] = React.useState<Date | null>(null);

  const [language, setLanguage] = useState(pl);

  useEffect(() => {
    switch (i18n.language) {
      case "en":
        setLanguage(enGB);
        break;
      case "pl":
        setLanguage(pl);
        break;
      case "ru":
        setLanguage(ru);
        break;
      case "ua":
        setLanguage(uk);
        break;
      default:
        setLanguage(pl);
    }
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language}>
        <Label htmlFor={name}>{labelName}</Label>
        <Controller
          as={
            <KeyboardDatePicker
              okLabel="OK"
              clearLabel="Clear"
              cancelLabel="Cancel"
              error={!!error}
              inputVariant="outlined"
              format={format}
              placeholder={placeholder}
              helperText={null}
              style={{
                fontFamily: ["Poppins", "sans-serif"].join(","),
              }}
              views={view}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              value={value}
              {...other}
            />
          }
          control={control}
          name={name}
          defaultValue={defaultDate || null}
        />
        <InputErrorMessage>
          <span className="invis-star">*</span>
          {t(helperText)}
        </InputErrorMessage>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default DateInput;
