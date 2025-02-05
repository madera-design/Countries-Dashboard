import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Layout } from './components/Layout';
import { CountriesList } from './pages/CountriesList';
import { CountryDetail } from './pages/CountryDetail';
import { useThemeStore } from './store/useThemeStore';
import { getTheme } from './theme';

function App() {
  const { isDarkMode } = useThemeStore();
  const theme = React.useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CountriesList />} />
            <Route path="country/:countryName" element={<CountryDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;