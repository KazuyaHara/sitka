import React, { useEffect } from 'react';

import { AuthenticationAdapter } from '../infrastructure/authentication';

import Landing from './components/pages/landing';
import ThemeProvider from './theme';

export default function UserInterface() {
  useEffect(() => {
    const unsubscribe = AuthenticationAdapter.subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  );
}
