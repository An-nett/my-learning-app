import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {}
}

let theme = createTheme({
  typography: {
    h1: {
      fontSize: 36,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 30,
    },
    body1: {
      fontSize: 24,
    },
    body2: {
      fontSize: 20,
    },
    button: {
      fontSize: 20,
      lineHeight: 1,
    },
    overline: {
      fontSize: 30,
      lineHeight: 1,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1200,
      xl: 1400,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
