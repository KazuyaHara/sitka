import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import useUserUseCase from '../../application/useCases/user';
import { User } from '../../domains/user';
import userRepository from '../repositories/user';
import { useAlertStore } from '../stores/alert';
import { useAuthStore } from '../stores/authentication';

import Alert from './components/atoms/alert';
import Routes from './routes';
import ThemeProvider from './theme';

export default function UserInterface() {
  const { message, open, severity } = useAlertStore();
  const { subscribe } = useUserUseCase(userRepository());

  useEffect(() => {
    const nextOrObserver = (authid: User['authid']) =>
      useAuthStore.setState({ authid, initializing: false });
    const unsubscribe = subscribe(nextOrObserver);
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Alert
          onClose={() => useAlertStore.setState({ open: false })}
          message={message}
          open={open}
          severity={severity}
        />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
