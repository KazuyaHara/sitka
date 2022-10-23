import React from 'react';

import { Box, Typography } from '@mui/material';

import { useAuthStore } from '../../stores/authentication';
import Landing from '../components/pages/landing';

export default function Routes() {
  const { authid } = useAuthStore();

  return authid ? (
    <Box>
      <Typography>Signed in.</Typography>
    </Box>
  ) : (
    <Landing />
  );
}
