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

let muiTheme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
      },
    },
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

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
