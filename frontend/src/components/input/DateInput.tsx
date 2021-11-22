import React, { useState, useEffect, FC } from "react";

import { Controller, Control } from "react-hook-form";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { uk, ru, pl, enGB } from "date-fns/esm/locale";
import { useTranslation } from "react-i18next";

import { Label, InputErrorMessage } from "./LocalStyles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

interface Props {
  control: Control<any>;
  helperText: string | undefined;
  error: boolean;
  labelName: string;
  name: string;
  defaultDate?: any;
  placeholder: string;
  view?: ["date"] | ["year", "month"] | ["year", "month", "date"] | ["year"];
  format?: "dd/MM/yyyy" | "yyyy";
  disablePast?: boolean;
  disableFuture?: boolean;
  maxDate?: Date;
  minDate?: Date;
  openTo?: "year";
}

const DateInput: FC<Props> = ({
  control,
  helperText = "",
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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language}>
      <Label htmlFor={name}>{labelName}</Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultDate || null}
        render={({ field }) => (
          <KeyboardDatePicker
            okLabel="OK"
            clearLabel="Clear"
            cancelLabel="Cancel"
            error={!!error}
            inputVariant="outlined"
            helperText={null}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            format={format}
            views={view}
            onChange={field.onChange}
            value={field.value}
            {...other}
          />
        )}
      />
      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
