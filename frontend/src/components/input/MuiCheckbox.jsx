import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { Label, InputErrorMessage } from "./LocalStyles";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormGroup, adaptV4Theme } from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";

// const theme = createTheme(adaptV4Theme({
//   palette: {
//     primary: {
//       main: "#0052cc",
//     },
//   },
// }));

const MuiCheckbox = ({
  name,
  labelName,
  defaultChecked,
  readOnly,
  spacer,
  control,
}) => {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
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
      {/* </ThemeProvider> */}
    </>
  );
};

export default MuiCheckbox;
<FormControlLabel control={<Checkbox defaultChecked />} label="Label" />;
