import * as React from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Select } from "@material-ui/core/";
import MenuItem from "@material-ui/core/MenuItem";
import { InputStyled } from "./LocalStyles";
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

  const options = optionArray.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {t(option.label)}
    </MenuItem>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Label>{labelName}</Label>

      <Controller
        as={
          <StyledSelect
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
            {options}
          </StyledSelect>
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

const StyledSelect = styled(Select)`
  /* .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: ${({ theme }) => theme.input.border};
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.input.focused};
    }
  }
  .Mui-error {
    &:hover fieldset {
      border-color: ${({ theme }) => theme.red} !important;
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.red} !important;
    }
  } */
`;
