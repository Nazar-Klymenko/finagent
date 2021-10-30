import React from "react";
import Radio from "@mui/material/Radio";
import { Controller } from "react-hook-form";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { Label, InputErrorMessage } from "./LocalStyles";

// const theme = createTheme(adaptV4Theme({
//   palette: {
//     primary: {
//       main: "#0052cc",
//     },
//   },
// }));

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
    <>
      {/* <ThemeProvider theme={theme}> */}
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
      {/* </ThemeProvider> */}
    </>
  );
};

export default MuiRadio;
