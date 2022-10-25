import React, { ReactNode, useState } from 'react';

import { Container, Grid } from '@mui/material';

import useUserUseCase from '../../../application/useCases/user';
import userRepository from '../../repositories/user';
import { useAuthStore } from '../../stores/authentication';
import Alert, { AlertProps } from '../components/atoms/alert';
import { DrawerContent } from '../components/organisms/drawer';
import Header from '../components/organisms/header';
import Loading from '../components/pages/loading';

import AuthenticatedRoutes from './authenticated';
import UnauthenticatedRoutes from './unauthenticated';

type LayoutProps = { children: ReactNode; handleSignOut: () => void };

const Layout = ({ children, handleSignOut }: LayoutProps) => (
  <>
    <Header handleSignOut={handleSignOut} />
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <DrawerContent />
        </Grid>
        <Grid item xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </>
);

export default function Routes() {
  const { authid, initializing } = useAuthStore();
  const [alertOptions, setAlertOptions] = useState<AlertProps['options']>();
  const { signOut } = useUserUseCase(userRepository());

  const handleSignOut = async () => {
    await signOut().catch(({ message }: Error) => setAlertOptions({ message, severity: 'error' }));
  };

  if (initializing) return <Loading />;
  return authid ? (
    <Layout handleSignOut={handleSignOut}>
      <Alert onClose={() => setAlertOptions(undefined)} options={alertOptions} />
      <AuthenticatedRoutes />
    </Layout>
  ) : (
    <UnauthenticatedRoutes />
  );
}
