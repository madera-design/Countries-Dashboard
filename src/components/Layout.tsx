import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, CssBaseline } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Countries Dashboard
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default }}>
        <Outlet />
      </Box>
    </Box>
  );
}