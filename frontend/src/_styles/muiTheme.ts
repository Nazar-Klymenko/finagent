import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createTheme" {
  interface ThemeOptions {
    custom: {
      palette: {
        facebook: string;
      };
    };
  }
}

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#1672ec",
    },
    secondary: {
      main: "#e9e9e9",
    },
  },
  custom: {
    palette: {
      facebook: "#3B5998",
    },
  },
});
muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
