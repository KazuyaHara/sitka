import React from 'react';

import { CheckCircle } from '@mui/icons-material';
import { Grid, GridProps } from '@mui/material';

import { ItemWithURL } from '../../../../../../domains/item';
import AspectRetioImage from '../../../atoms/aspectRatioImage';

type Props = Pick<GridProps, 'sx'> & {
  items: ItemWithURL[];
  onSelectItem: (item: ItemWithURL) => void;
  selectedItems: ItemWithURL[];
};

export default function ItemList({ items, onSelectItem, selectedItems, sx }: Props) {
  const selectedItemIds = selectedItems.map((item) => item.id);

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
          <AspectRetioImage borderRadius={1} src={item.url} />
        </Grid>
      ))}
    </Grid>
  );
}
