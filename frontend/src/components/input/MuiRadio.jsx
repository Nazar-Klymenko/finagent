import React from "react";
import Radio from "@material-ui/core/Radio";
import { Controller } from "react-hook-form";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Label, InputErrorMessage } from "./LocalStyles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
  },
});

const MuiRadio = ({ name, defaultChecked, options, legend, control }) => {
  const [value, setValue] = React.useState(defaultChecked);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const radios = options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio color="primary" />}
      label={option.label}
    />
  ));

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <Label>{legend}</Label>

        <Controller
          as={
            <RadioGroup name={name} value={value} onChange={handleChange}>
              {radios}
            </RadioGroup>
          }
          control={control}
          name={name}
          defaultValue={defaultChecked}
        />
        <InputErrorMessage>
          <span className="invis-star">*</span>
        </InputErrorMessage>
      </FormControl>
    </ThemeProvider>
  );
};

export default MuiRadio;
