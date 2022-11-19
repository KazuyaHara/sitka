import React from 'react';

import { CheckCircle } from '@mui/icons-material';
import { Grid, GridProps } from '@mui/material';

import { ItemWithURL } from '../../../../../../domains/item';
import AspectRetioMedia from '../../../atoms/aspectRatioMedia';

type Props = Pick<GridProps, 'sx'> & {
  items: ItemWithURL[];
  onSelectItem: (item: ItemWithURL) => void;
  selectedItemIds: string[];
};

export default function ItemList({ items, onSelectItem, selectedItemIds, sx }: Props) {
  return (
    <Grid container spacing={1} sx={sx}>
      {items.map((item) => (
        <Grid
          item
          key={item.id}
          onClick={() => onSelectItem(item)}
          xs={4}
          sm={3}
          md={2}
          sx={{ cursor: 'pointer', position: 'relative' }}
        >
          {selectedItemIds.includes(item.id) && (
            <CheckCircle sx={{ color: 'white', position: 'absolute', top: 16, right: 8 }} />
          )}
          <AspectRetioMedia
            borderRadius={1}
            component="img"
            extension={item.medium.extension}
            src={item.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
