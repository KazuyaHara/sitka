import React from 'react';

import Landing from './components/pages/landing';
import ThemeProvider from './theme';

export default function UserInterface() {
  return (
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  );
}
