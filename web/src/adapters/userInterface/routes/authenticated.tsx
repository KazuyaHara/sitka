import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import GearAdd from '../components/pages/gear/add';
import GearEdit from '../components/pages/gear/edit';
import GearList from '../components/pages/gear/list';
import MediaList from '../components/pages/media/list';

export default function Authenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/gears', element: <GearList /> },
          { path: '/gears/add', element: <GearAdd /> },
          { path: '/gears/:id', element: <GearEdit /> },
          { path: '/media', element: <MediaList /> },
          { path: '*', element: <Navigate to="/media" replace /> },
        ],
      },
    ]) || <MediaList />
  );
}
