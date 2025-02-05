import { createTheme } from '@mui/material';

export const getTheme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });