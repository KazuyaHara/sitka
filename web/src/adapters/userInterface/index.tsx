import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import useUserUseCase from '../../application/useCases/user';
import { TUser } from '../../domains/user';
import userRepository from '../repositories/user';
import { useAuthStore } from '../stores/authentication';

import Routes from './routes';
import ThemeProvider from './theme';

export default function UserInterface() {
  const { subscribe } = useUserUseCase(userRepository());

  useEffect(() => {
    const nextOrObserver = (authid: TUser['authid']) =>
      useAuthStore.setState({ authid, initializing: false });
    const unsubscribe = subscribe(nextOrObserver);
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
