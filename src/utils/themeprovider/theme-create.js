import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "Fairplay Display",
    title: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "48px",
    },

    subtitle: {
      fontSize: "36px",
      fontFamily: "Roboto",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "16px",
      fontFamily: "Roboto",
    },
    subtitle3: {
      fontSize: "24px",
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "16px",
      fontFamily: "Roboto",
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
      fontFamily: "Roboto",
      textDecoration: "none",
    },
  },
});

export const ThemeCreate = responsiveFontSizes(theme);
