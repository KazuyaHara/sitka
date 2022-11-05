import React from 'react';

import { Edit } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Gear, getTypeJP } from '../../../../../../domains/gear';

type Props = { gear: Gear };

export default function GearCard({ gear }: Props) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" gutterBottom variant="body2">
            {gear.maker}
          </Typography>
          <IconButton component={Link} size="small" to={`/gears/${gear.id}`}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <Typography fontWeight="bold" gutterBottom variant="body1">
          {gear.name}
        </Typography>
        <Typography color="text.secondary" variant="caption">
          {getTypeJP(gear.type)}
        </Typography>
      </CardContent>
    </Card>
  );
}
