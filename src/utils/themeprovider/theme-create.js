import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "Fairplay Display",
    title: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "48px",
    },

    subtitle2: {
      fontSize: "32",
    },

    h1: {
      fontSize: "32px",
      lineHeight: 1.5,
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 700,
    },
    desc: {
      fontSize: "36px",
      lineHeight: 1.7,
    },
    button: {
      fontStyle: "italic",
    },
  },
});

export const ThemeCreate = responsiveFontSizes(theme);
