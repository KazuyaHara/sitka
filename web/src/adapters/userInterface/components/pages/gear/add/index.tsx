import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useGearUseCase, { CreateSubmit } from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import gearRepository from '../../../../../repositories/gear';
import { useAlertStore } from '../../../../../stores/alert';
import Form from '../../../organisms/form/gear';

export default function GearAdd() {
  const { create: createGear } = useGearUseCase(gearRepository());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CreateSubmit) => {
    setLoading(true);
    const gear = new Gear(data);
    await createGear(gear)
      .then(() => {
        useAlertStore.setState({ message: '機材を登録しました', open: true, severity: 'success' });
        navigate('/gears');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  return (
    <Box mt={1.5}>
      <Typography variant="h2">機材を登録する</Typography>
      <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
    </Box>
  );
}
