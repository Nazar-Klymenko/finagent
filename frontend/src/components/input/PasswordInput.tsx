import { FC, useState } from "react";

import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import _ from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  errorList?: {};
  labelName: string;
  autoComplete?: string;
  defaultValue?: string | undefined;
}

const PasswordInput: FC<Props> = ({
  name,
  errorList,
  defaultValue,
  labelName,
  autoComplete,
  ...other
}) => {
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
    <>
      <Label htmlFor={name}>{labelName}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? "text" : "password"}
            error={!!_.get(errors, name)}
            autoComplete={autoComplete}
            onChange={field.onChange}
            value={field.value}
            {...other}
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
        {t(_.get(errors, `${name}.message`))}
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
    </>
  );
};

export default PasswordInput;

// const Requirements = styled("div")`
//   font-size: 14px;
//   color: ${({ theme }) => theme.typography.gray};
//   display: flex;
//   flex-direction: column;
// `;
// const RequirementsRow = styled("div")`
//   display: flex;
// `;
