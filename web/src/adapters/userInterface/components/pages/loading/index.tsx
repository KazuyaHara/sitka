import React, { ReactNode } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { use100vh } from 'react-div-100vh';

type Props = { children?: ReactNode };

export default function Loading({ children }: Props) {
  const height = use100vh();

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight={height || '100vh'}
    >
      <CircularProgress color="primary" thickness={5} />
      {children}
    </Box>
  );
}
