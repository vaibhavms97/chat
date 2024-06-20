import { Theme, createTheme } from "@mui/material/styles";

export const theme:Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fffafa',
    },
    secondary: {
      main: '#f8f8ff',
    },
    text: {
      primary: '#fffff0',
      secondary: '#faf9f6',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  }
});