import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    themeName?: string;
    custom: {
      palette: {
        facebook: string;
      };
    };
  }
}

const themeName = "Light";

const theme = createTheme({
  components: {
    // MuiButtonBase: {
    //   defaultProps: {
    //     disableRipple: true,
    //   },
    // },
  },
  palette: {
    primary: {
      main: "#1672ec",
    },
    secondary: {
      main: "#e9e9e9",
    },
    error: {
      main: "#f44336",
    },
  },
  custom: {
    palette: {
      facebook: "#3B5998",
    },
  },
  themeName,
});

const muiTheme = responsiveFontSizes(theme);

export default muiTheme;
