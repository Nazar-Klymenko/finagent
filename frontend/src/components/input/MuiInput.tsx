import React, { FC, useState } from "react";
// import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label, InputErrorMessage, Optional } from "./LocalStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
  optional?: boolean;
}

const MuiInput: FC<Props> = ({
  name,
  labelName,
  error,
  helperText = "",
  autoComplete,
  control,
  optional,
  ...other
}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>("");

  return (
    <>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>
      <Controller
        as={
          <OutlinedInput
            onChange={(newValue) => {
              setValue(String(newValue));
            }}
            value={value}
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
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
