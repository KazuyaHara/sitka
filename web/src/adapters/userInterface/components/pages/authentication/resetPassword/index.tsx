import React, { useState } from 'react';

import { Box, Container } from '@mui/material';
import { use100vh } from 'react-div-100vh';

import useUserUseCase from '../../../../../../application/useCases/user';
import userRepository from '../../../../../repositories/user';
import Background from '../../../../assets/background/landing.jpg';
import Logo from '../../../../assets/logo/white.png';
import Alert, { AlertProps } from '../../../atoms/alert';
import Form, { Submit } from '../../../organisms/form/auth/resetPassword';

export default function ResetPassword() {
  const height = use100vh();
  const [loading, setLoading] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertProps['options']>();
  const { sendPasswordResetEmail } = useUserUseCase(userRepository());

  const onSubmit = async ({ email }: Submit) => {
    setLoading(true);
    await sendPasswordResetEmail(email)
      .then(() =>
        setAlertOptions({ message: 'パスワード再設定メールを送信しました', severity: 'success' })
      )
      .catch(({ message }: Error) => setAlertOptions({ message, severity: 'error' }))
      .finally(() => setLoading(false));
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
