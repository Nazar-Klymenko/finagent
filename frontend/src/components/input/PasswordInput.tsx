import React, { useState } from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { InputContainer, InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  errorList?: {};
  labelName: string;
  autoComplete?: string;
  defaultValue?: string | undefined;
}

const PasswordInput = ({
  name,
  errorList,
  defaultValue,
  labelName,
  autoComplete,
  ...other
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <InputContainer>
      <Label htmlFor={name}>
        {labelName}
        <Box sx={{ display: "flex", flex: "1", justifyContent: "flex-end" }}>
          <Link href="/auth/forgot-password" passHref>
            <Typography
              component="a"
              sx={{ color: "text.secondary", textDecoration: "underline" }}
            >
              {t("LogIn.addActions.forgot")}
            </Typography>
          </Link>
        </Box>
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            {...other}
            id={name}
            type={showPassword ? "text" : "password"}
            error={!!_.get(errors, name)}
            autoComplete={autoComplete}
            onChange={field.onChange}
            value={field.value}
            inputRef={field.ref}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />

      <InputErrorMessage>
        <Typography variant="caption">
          {t(_.get(errors, `${name}.message`))}
        </Typography>
      </InputErrorMessage>
      {/* <Requirements>
        {errorList &&
          Object.entries(errorList).map((error: any) => (
            <RequirementsRow>
              <CheckRoundedIcon />
              <span key={error[0]}>{error[1]}</span>
            </RequirementsRow>
          ))}
      </Requirements> */}
    </InputContainer>
  );
};

export default PasswordInput;
