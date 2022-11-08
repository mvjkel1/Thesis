import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    appbar: {
      // AppBar background colors
    },
    primary: {
      main: "#1760a6",
      light: "skyblue",
    },
    secondary: {
      main: "#15c650",
    },
    primaryCtaButton: {
      main: "#2bbafe",
      contrastText: "#ffffff",
    },
    secondaryCtaButton: {
      main: "#000000",
      contrastText: "#000000",
    },
    textField: {
      main: "#f7fafd",
      light: "#f7fafd",
    },
  },
});
