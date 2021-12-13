import React, { FC, useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import { enGB, pl, ru, uk } from "date-fns/esm/locale";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  labelName: string;
  name: string;
  defaultValue?: any;
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
  labelName,
  name,
  defaultValue,
  placeholder,
  view = ["date"],
  format = "dd/MM/yyyy",
  ...other
}) => {
  const { i18n, t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
        defaultValue={defaultValue || null}
        render={({ field }) => (
          <KeyboardDatePicker
            okLabel="OK"
            clearLabel="Clear"
            cancelLabel="Cancel"
            error={!!_.get(errors, name)}
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
        {t(_.get(errors, `${name}.message`))}
      </InputErrorMessage>
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
