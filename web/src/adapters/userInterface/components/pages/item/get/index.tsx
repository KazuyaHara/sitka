import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import Loading from '../../loading';

export default function ItemGet() {
  const { get: getItem } = useItemUseCase(itemRepository(), mediumRepository());
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemWithURL | null>();

  useEffect(() => {
    if (id) {
      getItem(id).then(setItem);
    } else {
      navigate('/');
    }
  }, [id]);

  if (typeof item === 'undefined') return <Loading />;
  if (!item) return <Navigate to="/" />;
  return <Box component="img" src={item.url} />;
}
