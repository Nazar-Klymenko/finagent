import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
// import { TextField } from "@mui/material";
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
  placeholder?: string;
  type?: string;
  autofocus?: boolean;
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
            variant="outlined"
            size="medium"
            onChange={(newValue) => {
              setValue(String(newValue));
            }}
            value={value}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              height: "56px",
            }}
            id={name}
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
