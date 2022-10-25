import React, { ReactNode } from 'react';

import { Container, Grid } from '@mui/material';

import useUserUseCase from '../../../application/useCases/user';
import userRepository from '../../repositories/user';
import { useAlertStore } from '../../stores/alert';
import { useAuthStore } from '../../stores/authentication';
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
  const { signOut } = useUserUseCase(userRepository());

  const handleSignOut = async () => {
    await signOut().catch(({ message }: Error) =>
      useAlertStore.setState({ message, open: true, severity: 'error' })
    );
  };

  if (initializing) return <Loading />;
  return authid ? (
    <Layout handleSignOut={handleSignOut}>
      <AuthenticatedRoutes />
    </Layout>
  ) : (
    <UnauthenticatedRoutes />
  );
}
