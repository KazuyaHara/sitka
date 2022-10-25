import React, { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { use100vh } from 'react-div-100vh';
import { Link } from 'react-router-dom';

import useUserUseCase from '../../../../../application/useCases/user';
import userRepository from '../../../../repositories/user';
import { useAlertStore } from '../../../../stores/alert';
import Background from '../../../assets/background/landing.jpg';
import Logo from '../../../assets/logo/white.png';
import Form, { Submit } from '../../organisms/form/auth/signin';

export default function Landing() {
  const height = use100vh();
  const [loading, setLoading] = useState(false);
  const { signIn } = useUserUseCase(userRepository());

  const onSubmit = async ({ email, password }: Submit) => {
    setLoading(true);
    await signIn(email, password).catch(({ message }: Error) => {
      setLoading(false);
      useAlertStore.setState({ message, open: true, severity: 'error' });
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={height || '100vh'}
      justifyContent="center"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box component="img" mx="auto" src={Logo} />
        <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
        <Typography
          color="white"
          component={Link}
          mt={3}
          mx="auto"
          sx={{ textDecoration: 'none' }}
          to="/reset-password"
          variant="body2"
        >
          パスワードを再設定する
        </Typography>
      </Container>
    </Box>
  );
}
