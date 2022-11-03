import React from 'react';

import { Edit } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { Album } from '../../../../../../domains/album';

type Props = { album: Album };

export default function AlbumCard({ album }: Props) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold" gutterBottom variant="body1">
            {album.name}
          </Typography>
          <IconButton component={Link} size="small" to={`/albums/${album.id}`}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <Typography color="text.secondary" variant="caption">
          {format(album.date, 'yyyy年M月d日')}
        </Typography>
      </CardContent>
    </Card>
  );
}
