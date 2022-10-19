import React, { ReactNode } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import GlobalStyles from './globalStyles';
import typography from './typography';

type Props = { children: ReactNode };

export default function Theme({ children }: Props) {
  const theme = createTheme({ typography });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
