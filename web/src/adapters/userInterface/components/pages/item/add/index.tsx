import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemSubmit } from '../../../../../../interface/useCase/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import { useAlertStore } from '../../../../../stores/alert';
import Form from '../../../organisms/form/item';

export default function ItemAdd() {
  const { queueUpload } = useItemUseCase(itemRepository(), mediumRepository());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ItemSubmit) => {
    setLoading(true);
    await queueUpload(data.files)
      .then(() => {
        useAlertStore.setState({
          message: 'メディアをアップロードしました',
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

  return (
    <Box mt={1.5}>
      <Typography variant="h2">メディアをアップロードする</Typography>
      <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
    </Box>
  );
}
