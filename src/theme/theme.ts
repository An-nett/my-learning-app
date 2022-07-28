import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {}
}

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    h1: {
      fontSize: "3.6rem",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "3.2rem",
    },
    h3: {
      fontSize: "3rem",
    },
    body1: {
      fontSize: "2.4rem",
    },
    body2: {
      fontSize: "2rem",
    },
    button: {
      fontSize: "2.4rem",
      lineHeight: 1,
    },
    overline: {
      fontSize: "4rem",
    },
  },
});

export default theme;
