import React, { useState, useEffect, FC } from "react";
import styled from "styled-components";

import { Controller } from "react-hook-form";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { uk, ru, pl, enGB } from "date-fns/esm/locale";
import { useTranslation } from "react-i18next";

import { Label, InputErrorMessage } from "./LocalStyles";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

// const theme = createTheme(
//   adaptV4Theme({
//     palette: {
//       primary: {
//         main: "#1672ec",
//       },
//     },
//   })
// );

interface Props {
  control: any;
  helperText: string;
  error: boolean;
  labelName: string;
  name: string;
  defaultDate: any;
  placeholder: string;
  view: ["year", "month", "day"] | ["year"];
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
  view = ["year,month,day"],
  format = "dd/MM/yyyy",
  ...other
}) => {
  const { i18n, t } = useTranslation();
  const [value, setValue] = useState<Date | null>(new Date());
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
    <>
      {/* <ThemeProvider theme={theme}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={language}>
        <Label htmlFor={name}>{labelName}</Label>
        <Controller
          as={
            <DatePicker
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
              // @ts-ignore
              views={view}
              // @ts-ignore
              onChange={(newValue: Date) => {
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
      </LocalizationProvider>
      {/* </ThemeProvider> */}
    </>
  );
};

export default DateInput;
