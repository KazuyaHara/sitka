import React from 'react';

import { Box, Container } from '@mui/material';

import Background from '../../../assets/background/landing.jpg';
import Logo from '../../../assets/logo/white.png';

export default function Landing() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
      >
        <Box component="img" src={Logo} />
      </Container>
    </Box>
  );
}
