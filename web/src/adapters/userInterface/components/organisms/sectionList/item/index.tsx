import React from 'react';

import { Grid, GridProps } from '@mui/material';

import { ItemWithURL } from '../../../../../../domains/item';
import AspectRetioImage from '../../../atoms/aspectRatioImage';

type Props = Pick<GridProps, 'sx'> & { items: ItemWithURL[] };

export default function ItemSectionList({ items, sx }: Props) {
  return (
    <Grid container spacing={1} sx={sx}>
      {items.map((item) => (
        <Grid item key={item.id} xs={4} sm={3} md={2}>
          <AspectRetioImage borderRadius={1} src={item.url} />
        </Grid>
      ))}
    </Grid>
  );
}
