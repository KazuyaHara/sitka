import React, { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';

import useGearUseCase from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import gearRepository from '../../../../../repositories/gear';
import Loading from '../../loading';

export default function GearEdit() {
  const { get: getGear } = useGearUseCase(gearRepository());
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gear, setGear] = useState<Gear | null>();

  useEffect(() => {
    if (id) {
      getGear(id).then(setGear);
    } else {
      navigate('/gears');
    }
  }, []);

  if (typeof gear === 'undefined') return <Loading />;
  if (!gear) return <Navigate to="/gears" />;
  return (
    <Box mt={1.5}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2">{gear.name}</Typography>
        <Button
          component={Link}
          size="small"
          to={`/media?gear=${gear.id}`}
          variant="outlined"
        >{`この機材で取られた${gear.typeJP}を表示`}</Button>
      </Box>
    </Box>
  );
}
