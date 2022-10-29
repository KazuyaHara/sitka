import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import useGearUseCase from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import gearRepository from '../../../../../repositories/gear';
import GearCard from '../../../molecules/card/gear';
import Loading from '../../loading';
import Header from '../header';

export default function GearList() {
  const { list: listGears } = useGearUseCase(gearRepository());
  const [gears, setGears] = useState<Gear[]>();

  useEffect(() => {
    listGears().then(setGears);
  }, []);

  if (typeof gears === 'undefined') return <Loading />;
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        {gears.map((gear) => (
          <Grid
            item
            key={gear.id}
            component={Link}
            xs={12}
            sm={4}
            sx={{ textDecoration: 'none' }}
            to={`/media?gear=${gear.id}`}
          >
            <GearCard gear={gear} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
