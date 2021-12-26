import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    themeName?: string;
  }
}

const themeName = "Light";

let muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 400,
      sm: 688,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#1672ec",
    },
    secondary: {
      main: "#e9e9e9",
    },
  },
  themeName,
});
muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
