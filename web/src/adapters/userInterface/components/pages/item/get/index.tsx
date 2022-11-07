import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import { useAlertStore } from '../../../../../stores/alert';
import Dialog from '../../../molecules/dialog/item/delete';
import Loading from '../../loading';

export default function ItemGet() {
  const { get: getItem, softDelete: softDeleteItem } = useItemUseCase(
    itemRepository(),
    mediumRepository()
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemWithURL | null>();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      getItem(id).then(setItem);
    } else {
      navigate('/media');
    }
  }, [id]);

  const onDelete = async () => {
    if (!id) return navigate('/media');

    setLoading(true);
    return softDeleteItem(id)
      .then(() => {
        useAlertStore.setState({
          message: 'メディアを削除しました',
          open: true,
          severity: 'success',
        });
        navigate('/media');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  const toggleDialog = () => setOpenDialog(!openDialog);

  if (typeof item === 'undefined') return <Loading />;
  if (!item) return <Navigate to="/media" />;
  return (
    <Box pb={3}>
      <Box component="img" src={item.url} />
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button color="error" disabled={loading} onClick={toggleDialog} size="small">
          このメディアを削除する
        </Button>
      </Box>
      <Dialog onClose={toggleDialog} onSubmit={onDelete} open={openDialog} />
    </Box>
  );
}
