import React, { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';

import useAlbumUseCase from '../../../../../../application/useCases/album';
import { Album } from '../../../../../../domains/album';
import { AlbumSubmit } from '../../../../../../interface/useCase/album';
import albumRepository from '../../../../../repositories/album';
import { useAlertStore } from '../../../../../stores/alert';
import Dialog from '../../../molecules/dialog/album/delete';
import Form from '../../../organisms/form/album';
import Loading from '../../loading';

export default function AlbumEdit() {
  const {
    destroy: deleteAlbum,
    list: listAlbums,
    update: updateAlbum,
  } = useAlbumUseCase(albumRepository());
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>();
  const [albums, setAlbums] = useState<Album[]>();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      listAlbums().then(setAlbums);
    } else {
      navigate('/albums');
    }
  }, []);

  useEffect(() => {
    if (albums) {
      const found = albums.find((item) => item.id === id);
      if (found) {
        setAlbum(found);
      } else {
        navigate('/albums');
      }
    }
  }, [albums]);

  const onDelete = async () => {
    if (!album) return navigate('/albums');

    setLoading(true);
    return deleteAlbum(album)
      .then(() => {
        useAlertStore.setState({
          message: 'アルバムを削除しました',
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

  const onUpdate = async (data: AlbumSubmit) => {
    if (!id) return navigate('/albums');

    setLoading(true);
    return updateAlbum(id, data)
      .then(() => {
        useAlertStore.setState({
          message: 'アルバムを更新しました',
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

  const toggleDialog = () => setOpenDialog(!openDialog);

  if (typeof album === 'undefined' || typeof albums === 'undefined') return <Loading />;
  if (!album) return <Navigate to="/albums" />;
  return (
    <>
      <Box mt={1.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2">{album.name}</Typography>
          <Button component={Link} size="small" to={`/albums/${album.id}/media`} variant="outlined">
            このアルバムを表示
          </Button>
        </Box>
        <Form data={album} loading={loading} onSubmit={onUpdate} options={albums} sx={{ mt: 3 }} />
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button color="error" onClick={toggleDialog} size="small">
            このアルバムを削除する
          </Button>
        </Box>
      </Box>
      <Dialog onClose={toggleDialog} onSubmit={onDelete} open={openDialog} />
    </>
  );
}
