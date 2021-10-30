import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  black: "#1a1b1e",

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
    hover: "#000000DE",
    border: "#cccccc",
    focused: "#1672ec",
  },

  blue: "#1672ec",
  lightBlue: "#ebf4ff",
  hoverBlue: "#227ef7",
  shadowBlue: "rgba(22, 114, 236, 0.15)",

  red: "#f44336",

  bg: "#ffffff",
  border: "#dfdfdf",

  regularWrap: "1080px",
  bigWrap: "1200px",

  widthSmallPhone: "400px",
  widthPhone: "688px",
  widthTablet: "992px",
  widthDesktop: "1400px",
});

export default theme;
