import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import GearList from '../components/pages/gear/list';
import MediaList from '../components/pages/media/list';

export default function Authenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/gears', element: <GearList /> },
          { path: '/media', element: <MediaList /> },
          { path: '*', element: <Navigate to="/media" replace /> },
        ],
      },
    ]) || <MediaList />
  );
}
