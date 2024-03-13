import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
// hooks
import useSettings from "../hooks/useSettings.js";
//
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";

import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode } = useSettings();

  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '*': {
              'scrollbar-width': 'thin',
              'scrollbar-color': 'transparent transparent',
            },
            '*::-webkit-scrollbar': {
              width: '0px',
            },
            '*::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '*::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              background: 'transparent',
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            input: {
              "&[type=number]": {
                "-moz-appearance": "textfield",
              },
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            },
          },
        },
      },
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}