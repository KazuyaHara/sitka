import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useAlbumUseCase from '../../../../../../application/useCases/album';
import { Album } from '../../../../../../domains/album';
import { AlbumSubmit } from '../../../../../../interface/useCase/album';
import albumRepository from '../../../../../repositories/album';
import { useAlertStore } from '../../../../../stores/alert';
import Form from '../../../organisms/form/album';
import Loading from '../../loading';

export default function AlbumAdd() {
  const { create: createAlbum, list: listAlbum } = useAlbumUseCase(albumRepository());
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listAlbum().then(setAlbums);
  }, []);

  const onSubmit = async (data: AlbumSubmit) => {
    setLoading(true);
    await createAlbum(data)
      .then(() => {
        useAlertStore.setState({
          message: 'アルバムを作成しました',
          open: true,
          severity: 'success',
        });
        navigate('/albums');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  if (typeof albums === 'undefined') return <Loading />;
  return (
    <Box mt={1.5}>
      <Typography variant="h2">アルバムを作成する</Typography>
      <Form loading={loading} onSubmit={onSubmit} options={albums} sx={{ mt: 3 }} />
    </Box>
  );
}
