import { FC, useState } from "react";
import styled from "styled-components";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Controller, Control } from "react-hook-form";
import { Label, InputErrorMessage } from "./LocalStyles";

interface Props {
  control: Control;
  name: string;
  error: boolean;
  helperText: string;
  errorList?: {};
  labelName: string;
}

const MuiPasswordInput: FC<Props> = ({
  control,
  name,
  error,
  helperText,
  errorList,
  labelName,
}) => {
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
        render={({ field }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? "text" : "password"}
            error={error}
            {...field}
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
        {helperText}
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

const Requirements = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.typography.gray};
  display: flex;
  flex-direction: column;
`;
const RequirementsRow = styled.div`
  display: flex;
`;
