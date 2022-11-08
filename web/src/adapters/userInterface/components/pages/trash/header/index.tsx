import React from 'react';

import { Restore } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import { ItemWithURL } from '../../../../../../domains/item';

type Props = { selectedItems: ItemWithURL[] };

export default function TrashHeader({ selectedItems }: Props) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <Button
        disabled={selectedItems.length === 0}
        disableElevation
        startIcon={<Restore />}
        sx={{ borderRadius: 2 }}
        variant="contained"
      >
        選択したメディアを復元する
      </Button>
    </Box>
  );
}
