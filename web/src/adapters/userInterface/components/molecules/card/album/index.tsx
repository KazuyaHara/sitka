import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import format from 'date-fns/format';

import { Album } from '../../../../../../domains/album';

type Props = { album: Album };

export default function AlbumCard({ album }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight="bold" gutterBottom variant="body1">
          {album.name}
        </Typography>
        <Typography color="text.secondary" variant="caption">
          {format(album.date, 'yyyy年M月d日')}
        </Typography>
      </CardContent>
    </Card>
  );
}
