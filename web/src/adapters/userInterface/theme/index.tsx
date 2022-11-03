import React, { ReactNode } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import GlobalStyles from './globalStyles';
import palette from './palette';
import typography from './typography';

type Props = { children: ReactNode };

export default function Theme({ children }: Props) {
  // TODO: dark mode
  const theme = createTheme({ palette: { ...palette.light }, typography });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
}
