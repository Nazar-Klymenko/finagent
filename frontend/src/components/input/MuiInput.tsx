import React, { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { Label, InputErrorMessage } from "./LocalStyles";
import { useTranslation } from "react-i18next";

interface Props {
  control: any;
  helperText: string;
  error: boolean;
  labelName: string;
  name: string;
  autoFocus?: boolean;
  autoComplete?: string;
}

const MuiInput: FC<Props> = ({
  name,
  labelName,
  error,
  helperText = "",
  autoComplete,
  control,
  ...other
}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>("");

  return (
    <>
      <Label htmlFor={name}>{labelName}</Label>
      <Controller
        as={
          <TextField
            error={error}
            autoComplete={autoComplete}
            onChange={(newValue) => {
              setValue(String(newValue));
            }}
            value={value}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            {...other}
          />
        }
        control={control}
        name={name}
      />
      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </>
  );
};

export default MuiInput;
