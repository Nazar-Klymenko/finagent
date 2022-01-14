import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const themeName = "Light";
let font = "'Poppins', sans-serif";

let muiTheme = createTheme({
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
});
muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;

// typography: {
//   h1: { fontFamily: font },
//   h2: { fontFamily: font },
//   h3: { fontFamily: font, fontSize: "4rem" },
//   h4: { fontFamily: font },
//   h5: { fontFamily: font },
//   h6: { fontFamily: font },
// },

// components: {
//   MuiTypography: {
//     defaultProps: {
//       fontFamily: font,
//     },
//   },
// },

// custom: {
//   palette: {
//     facebook: "#3B5998",
//   },
// },

// themeName,
