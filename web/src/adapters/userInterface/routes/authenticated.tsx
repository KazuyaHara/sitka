import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import AlbumAdd from '../components/pages/album/add';
import AlbumEdit from '../components/pages/album/edit';
import AlbumList from '../components/pages/album/list';
import GearAdd from '../components/pages/gear/add';
import GearEdit from '../components/pages/gear/edit';
import GearList from '../components/pages/gear/list';
import ItemAdd from '../components/pages/item/add';
import ItemGet from '../components/pages/item/get';
import ItemList from '../components/pages/item/list';
import TrashMedia from '../components/pages/trash/media';

export default function Authenticated() {
  return (
    useRoutes([
      { path: '/albums', element: <AlbumList /> },
      { path: '/albums/add', element: <AlbumAdd /> },
      { path: '/albums/:id', element: <AlbumEdit /> },
      { path: '/gears', element: <GearList /> },
      { path: '/gears/add', element: <GearAdd /> },
      { path: '/gears/:id', element: <GearEdit /> },
      { path: '/media', element: <ItemList /> },
      { path: '/media/add', element: <ItemAdd /> },
      { path: '/media/:id', element: <ItemGet /> },
      { path: '/trash', element: <TrashMedia /> },
      { path: '*', element: <Navigate to="/media" replace /> },
    ]) || <ItemList />
  );
}
