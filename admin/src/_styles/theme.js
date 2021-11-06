import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F8AE0",
    },
    secondary: {
      main: "#326eb3",
    },
  },
  //custom Theme
  black: "#1a1b1e",

  typography: {
    black: "#262d3d",
    blue: "#1672ec",
    gray: "#7d7d7d",
  },

  gray: "#7d7d7d",
  lightGray: "#e9e9e9",
  lightestGray: "#f9f9f9",

  buttons: {
    primaryBg: "#1672ec",
    primaryBgLoading: "#4293ff",
    primaryBgHover: "#2980f2",

    secondaryBg: "#e9e9e9",
    secondaryBgLoading: "#ebebeb",
    secondaryBgHover: "#dedede",
    secondaryColor: "#696969",

    blockedBg: "#e9e9e9",
    blockedColor: "#7d7d7d",

    facebook: "#3B5998",
  },

  input: {
    border: "#cccccc",
    focused: "#1672ec",
  },

  blue: "#1672ec",
  lightBlue: "#e1edfc",
  hoverBlue: "#227ef7",
  shadowBlue: "rgba(22, 114, 236, 0.15)",

  red: "#f44336",
  adminBlue: "#242331",

  bg: "#ffffff",
  border: "#dfdfdf",
  inputBorder: "#d1d1d1",

  widthSmallPhone: "400px",
  widthPhone: "688px",
  widthTablet: "992px",
  widthDesktop: "1400px",
});

export default theme;
