import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Controller } from "react-hook-form";
import { Label, InputErrorMessage } from "./LocalStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormGroup } from "@material-ui/core";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
  },
});

const MuiCheckbox = ({
  name,
  labelName,
  defaultChecked,
  readOnly,
  spacer,
  control,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={(props) => (
              <Checkbox
                {...props}
                color="primary"
                checked={props.value}
                disabled={readOnly}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
          />
        }
        label={labelName}
      />

      {spacer && (
        <InputErrorMessage>
          <span className="invis-star">*</span>
        </InputErrorMessage>
      )}
    </ThemeProvider>
  );
};

export default MuiCheckbox;
<FormControlLabel control={<Checkbox defaultChecked />} label="Label" />;
