import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import ResetPassword from '../components/pages/authentication/resetPassword';
import Landing from '../components/pages/landing';

export default function Unauthenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Landing /> },
          { path: '/reset-password', element: <ResetPassword /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Landing />
  );
}
