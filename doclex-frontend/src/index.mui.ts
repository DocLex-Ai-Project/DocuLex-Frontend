import { createTheme, type ThemeOptions } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary : {
        main : "#0fb1d6"
    }
  },
});


const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#31a6c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fff',
      paper: '#fafafa',
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#31a6c0',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#424242',
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);