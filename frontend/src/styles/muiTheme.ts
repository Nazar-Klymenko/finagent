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
let font = "'Poppins', sans-serif";

let theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
      },
    },
  },
  custom: {
    palette: {
      facebook: "#3B5998",
    },
  },
  palette: {
    primary: {
      main: "#1672ec",
    },
    secondary: {
      main: "#ebf4ff",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    h1: {
      fontSize: "4.25rem",
    },
  },

  themeName,
});

let muiTheme = responsiveFontSizes(theme);

export default muiTheme;
