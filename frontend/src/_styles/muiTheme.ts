import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
  },
});
muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
