import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const DateInput = ({
  control,
  helperText,
  error,
  labelName,
  name,
  defaultDate,
  disablePastDates,
  placeholder,
  view = ["date"],
  format = "dd/MM/yyyy",
}) => {
  const { i18n, t } = useTranslation();

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
            <StyledInput
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
              shouldDisableDate={(day) => {
                if (disablePastDates) {
                  let date = new Date();
                  date.setDate(date.getDate() - 1);
                  if (day < date) {
                    return true;
                  }
                }
              }}
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

const StyledInput = styled(KeyboardDatePicker)`
  /* .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: ${({ theme }) => theme.input.border};
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.input.focused};
    }
  }
  .Mui-error {
    &:hover fieldset {
      border-color: ${({ theme }) => theme.red} !important;
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.red} !important;
    }
  } */
`;

export default DateInput;
