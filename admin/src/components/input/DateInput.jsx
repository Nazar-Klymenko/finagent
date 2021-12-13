import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import { enGB, pl, ru, uk } from "date-fns/esm/locale";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { InputErrorMessage, Label } from "./LocalStyles";

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
              size="small"
              error={!!error}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              helperText={null}
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
  .MuiOutlinedInput-root {
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
  }
`;

export default DateInput;
