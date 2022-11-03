import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import useAlbumUseCase from '../../../../../../application/useCases/album';
import { Album } from '../../../../../../domains/album';
import albumRepository from '../../../../../repositories/album';
import AlbumCard from '../../../molecules/card/album';
import Loading from '../../loading';
import Header from '../header';

export default function AlbumList() {
  const { list: listAlbums } = useAlbumUseCase(albumRepository());
  const [albums, setAlbums] = useState<Album[]>();

  useEffect(() => {
    listAlbums().then(setAlbums);
  }, []);

  if (typeof albums === 'undefined') return <Loading />;
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid
            item
            key={album.id}
            component={Link}
            xs={12}
            sm={4}
            sx={{ textDecoration: 'none' }}
            to={`/albums/${album.id}/media`}
          >
            <AlbumCard album={album} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
