import React, { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import useUserUseCase from '../../../application/useCases/user';
import userRepository from '../../repositories/user';
import Alert, { AlertProps } from '../components/atoms/alert';

export default function Authenticated() {
  const [alertOptions, setAlertOptions] = useState<AlertProps['options']>();
  const { signOut } = useUserUseCase(userRepository());

  const handleSignOut = async () => {
    await signOut().catch(({ message }: Error) => setAlertOptions({ message, severity: 'error' }));
  };

  return (
    <>
      <Alert onClose={() => setAlertOptions(undefined)} options={alertOptions} />
      <Box>
        <Typography>signed in.</Typography>
        <Button onClick={handleSignOut} variant="outlined">
          sign out
        </Button>
      </Box>
    </>
  );
}
