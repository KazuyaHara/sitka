import React, { useEffect, useState } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import useGearUseCase from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import gearRepository from '../../../../../repositories/gear';
import Loading from '../../loading';
import Header from '../header';

export default function GearList() {
  const { list: listGear } = useGearUseCase(gearRepository());
  const [gears, setGears] = useState<Gear[]>();

  useEffect(() => {
    listGear().then(setGears);
  }, []);

  if (typeof gears === 'undefined') return <Loading />;
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        {gears.map((gear) => (
          <Grid
            item
            component={Link}
            xs={12}
            sm={4}
            sx={{ textDecoration: 'none' }}
            to={`/media?gear=${gear.id}`}
          >
            <Card key={gear.id}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  {gear.maker}
                </Typography>
                <Typography fontWeight="bold" gutterBottom variant="body1">
                  {gear.name}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  {gear.typeJP}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
