import React, { useEffect } from 'react';

import useUserUseCase from '../../application/useCases/user';
import { TUser } from '../../domains/user';
import userRepository from '../repositories/user';
import { useAuthStore } from '../stores/authentication';

import Loading from './components/pages/loading';
import Routes from './routes';
import ThemeProvider from './theme';

export default function UserInterface() {
  const { initializing } = useAuthStore();
  const { subscribe } = useUserUseCase(userRepository());

  useEffect(() => {
    const nextOrObserver = (authid: TUser['authid']) =>
      useAuthStore.setState({ authid, initializing: false });
    const unsubscribe = subscribe(nextOrObserver);
    return () => unsubscribe();
  }, []);

  return <ThemeProvider>{initializing ? <Loading /> : <Routes />}</ThemeProvider>;
}
