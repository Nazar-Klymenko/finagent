import * as React from "react";
import { Controller } from "react-hook-form";

import { Select } from "@material-ui/core/";
import MenuItem from "@material-ui/core/MenuItem";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Label, InputErrorMessage } from "./LocalStyles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
  },
});

const MuiSelect = ({
  name,
  labelName,
  defaultValue = "",
  error,
  helperText,
  optionArray,
  placeholder,
  control,
}) => {
  const [age, setAge] = React.useState("");
  const { t } = useTranslation();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Label>{labelName}</Label>

      <Controller
        as={
          <Select
            error={!!error}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            style={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
            value={age}
            variant="outlined"
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            onChange={handleChange}
          >
            {optionArray.length > 0 &&
              optionArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
          </Select>
        }
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </ThemeProvider>
  );
};

export default MuiSelect;
