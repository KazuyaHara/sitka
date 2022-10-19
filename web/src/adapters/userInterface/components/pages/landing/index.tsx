import React, { useState } from 'react';

import { Box, Container } from '@mui/material';

import Background from '../../../assets/background/landing.jpg';
import Logo from '../../../assets/logo/white.png';
import Form, { Submit } from '../../organisms/form/auth/signin';

export default function Landing() {
  const [loading] = useState(false);

  const onSubmit = (data: Submit) => console.log('data', data);

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
      <Container maxWidth="xs">
        <Box component="img" mx="auto" src={Logo} />
        <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
      </Container>
    </Box>
  );
}
