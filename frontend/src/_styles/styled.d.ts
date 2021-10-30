import "styled-components";
import { Theme } from "@mui/material/styles";

interface CustomTheme {
  black: string;

  gray: string;
  lightGray: string;
  lightestGray: string;

  buttons: {
    primaryBg: string;
    primaryBgLoading: string;
    primaryBgHover: string;

    secondaryBg: string;
    secondaryBgLoading: string;
    secondaryBgHover: string;
    secondaryColor: string;

    blockedBg: string;
    blockedColor: string;

    facebook: string;
  };

  input: {
    hover: string;
    border: string;
    focused: string;
  };

  blue: string;
  lightBlue: string;
  hoverBlue: string;
  shadowBlue: string;

  red: string;

  bg: string;
  border: string;

  regularWrap: string;
  bigWrap: string;

  widthSmallPhone: string;
  widthPhone: string;
  widthTablet: string;
  widthDesktop: string;
}

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
