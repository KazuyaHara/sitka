import React from 'react';

import { useAuthStore } from '../../stores/authentication';
import Loading from '../components/pages/loading';

import AuthenticatedRoutes from './authenticated';
import UnauthenticatedRoutes from './unauthenticated';

export default function Routes() {
  const { authid, initializing } = useAuthStore();

  if (initializing) return <Loading />;
  return authid ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}
