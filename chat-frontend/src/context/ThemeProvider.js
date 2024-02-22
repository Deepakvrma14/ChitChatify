// ThemeProvider.js
import { useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';
import { createTheme } from '../theme/index'; 

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme(themeMode);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};