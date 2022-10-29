import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useGearUseCase from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import { GearSubmit } from '../../../../../../interface/useCase/gear';
import gearRepository from '../../../../../repositories/gear';
import { useAlertStore } from '../../../../../stores/alert';
import Form from '../../../organisms/form/gear';
import Loading from '../../loading';

export default function GearAdd() {
  const { create: createGear, list: listGear } = useGearUseCase(gearRepository());
  const navigate = useNavigate();
  const [gears, setGears] = useState<Gear[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listGear().then(setGears);
  }, []);

  const onSubmit = async (data: GearSubmit) => {
    setLoading(true);
    await createGear(data)
      .then(() => {
        useAlertStore.setState({ message: '機材を登録しました', open: true, severity: 'success' });
        navigate('/gears');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  if (typeof gears === 'undefined') return <Loading />;
  return (
    <Box mt={1.5}>
      <Typography variant="h2">機材を登録する</Typography>
      <Form loading={loading} onSubmit={onSubmit} options={gears} sx={{ mt: 3 }} />
    </Box>
  );
}
