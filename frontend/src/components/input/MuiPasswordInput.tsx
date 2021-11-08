import { FC, useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  error: boolean;
  helperText: string;
  requirements: [string];
}

const MuiPasswordInput: FC<Props> = ({
  control,
  name,
  error,
  helperText,
  requirements,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Controller
        as={
          <OutlinedInput
            id="outlined-basic"
            type={showPassword ? "text" : "password"}
            value={value}
            error={error}
            onChange={(e: any) => {
              handleChange(e);
            }}
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
        }
        name={name}
        control={control}
        defaultValue={value}
      />

      {requirements.length > 0 &&
        requirements.map((req) => <span key={req}>{req}</span>)}
    </ThemeProvider>
  );
};

export default MuiPasswordInput;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
  },
});
