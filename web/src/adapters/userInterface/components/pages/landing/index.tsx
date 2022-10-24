import React, { useState } from 'react';

import { Box, Container } from '@mui/material';
import { use100vh } from 'react-div-100vh';

import useUserUseCase from '../../../../../application/useCases/user';
import userRepository from '../../../../repositories/user';
import Background from '../../../assets/background/landing.jpg';
import Logo from '../../../assets/logo/white.png';
import Alert, { AlertProps } from '../../atoms/alert';
import Form, { Submit } from '../../organisms/form/auth/signin';

export default function Landing() {
  const height = use100vh();
  const [loading] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertProps['options']>();
  const { signIn } = useUserUseCase(userRepository());

  const onSubmit = async ({ email, password }: Submit) => {
    await signIn(email, password).catch(({ message }: Error) =>
      setAlertOptions({ message, severity: 'error' })
    );
  };

  return (
    <>
      <Alert onClose={() => setAlertOptions(undefined)} options={alertOptions} />
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
        <Container maxWidth="xs">
          <Box component="img" mx="auto" src={Logo} />
          <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
        </Container>
      </Box>
    </>
  );
}
