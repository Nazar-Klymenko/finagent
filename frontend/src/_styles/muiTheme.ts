import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
    secondary: {
      main: "#e9e9e9",
    },
  },
});
muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
