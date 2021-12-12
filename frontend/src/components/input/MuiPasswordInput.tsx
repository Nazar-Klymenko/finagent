import { FC, useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InputErrorMessage, Label } from "./LocalStyles";

interface Props {
  name: string;
  errorList?: {};
  labelName: string;
  autoComplete?: string;
  defaultValue?: string | undefined;
}

const MuiPasswordInput: FC<Props> = ({
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
            error={!!errors.name}
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
        <span className="invis-star">*</span>
        {t(errors?.name?.message)}
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

export default MuiPasswordInput;

// const Requirements = styled.div`
//   font-size: 14px;
//   color: ${({ theme }) => theme.typography.gray};
//   display: flex;
//   flex-direction: column;
// `;
// const RequirementsRow = styled.div`
//   display: flex;
// `;
